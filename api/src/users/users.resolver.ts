import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { HttpService } from "@nestjs/axios";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { firebaseApp } from "@src/app.module";
import { AuthGuard } from "@src/common/guards/auth.guard";

import { UserInput } from "./dto/user.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
    private signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    private signUpWithTokenUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=";
    private refreshTokenUrl = "https://securetoken.googleapis.com/v1/token?key=";

    constructor(
        private httpService: HttpService,
        private readonly usersService: UsersService,
        @InjectRepository(User) private readonly repository: EntityRepository<User>,
    ) {}

    @Query(() => [User])
    async usersAll(): Promise<User[]> {
        return this.repository.findAll();
    }

    @Mutation(() => User)
    async addUser(@Args("data", { type: () => UserInput }) data: UserInput): Promise<User> {
        const entity = this.repository.create(data);
        await this.repository.persistAndFlush(entity);
        const getRefreshTokenUrl = this.signUpWithTokenUrl + process.env.FIREBASE_API_KEY;
        //const url = this.signUpUrl + process.env.FIREBASE_API_KEY;

        // return new Promise((resolve, reject) => {
        //     this.httpService.post(url, { returnSecureToken: true }).subscribe(async (value) => {
        //         console.log(value);
        //         const { kind, idToken, refreshToken, expiresIn, localId } = value.data;
        //         const entityUpdate = await this.repository.findOneOrFail(entity.id);
        //         entityUpdate.assign({ token: idToken, refreshToken });
        //         this.repository.persistAndFlush(entityUpdate);
        //         resolve(entityUpdate);
        //     });
        // });
        // Todo add catch
        const entityWithToken = await firebaseApp
            .auth()
            .createCustomToken(entity.id)
            .then(async (customToken: string) => {
                console.log(customToken);
                const entityUpdate = await this.repository.findOneOrFail(entity.id);

                const { idToken, refreshToken } = await this.httpService
                    .post(getRefreshTokenUrl, { token: customToken, returnSecureToken: true })
                    .toPromise()
                    .then((value) => {
                        // eslint-disable-next-line
                        return value?.data ?? {};
                    });
                entityUpdate.assign({ token: idToken, refreshToken });
                // entityUpdate.assign({ token: customToken });
                this.repository.persistAndFlush(entityUpdate);
                return entityUpdate;
            });

        return entityWithToken;
    }

    @Query(() => Boolean)
    @UseGuards(AuthGuard)
    async checkToken(): Promise<boolean> {
        return true;
    }
}
