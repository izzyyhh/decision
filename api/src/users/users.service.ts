import { EntityRepository, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firebaseApp } from "@src/app.module";

import { UserInput } from "./dto/user.input";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(private httpService: HttpService, @InjectRepository(User) private readonly repository: EntityRepository<User>) {}

    getFindCondition(query: string | undefined): FilterQuery<User> {
        if (query) {
            return {
                $or: [
                    {
                        name: {
                            $ilike: `%${query}%`,
                        },
                        description: {
                            $ilike: `%${query}%`,
                        },
                    },
                ],
            };
        }

        return {};
    }

    findAll() {
        return this.repository.findAll();
    }

    async create(data: UserInput) {
        const entity = this.repository.create(data);
        await this.repository.persistAndFlush(entity);
        const tokenResponse = await this.getIdTokenAndRefreshToken(entity);

        entity.assign({ token: tokenResponse.data.idToken, refreshToken: tokenResponse.data.refreshToken });
        this.repository.persistAndFlush(entity);
        return entity;
    }

    getRefreshTokenUrl() {
        return `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_API_KEY}`;
    }

    async getIdTokenAndRefreshToken(entity: User): Promise<TokenObjectType> {
        const customToken: string = await firebaseApp.auth().createCustomToken(entity.id);
        return (await this.httpService.axiosRef.post(this.getRefreshTokenUrl(), {
            token: customToken,
            returnSecureToken: true,
        })) as TokenObjectType;
    }
}

type TokenObjectType = { data: { idToken: string; refreshToken: string } };
