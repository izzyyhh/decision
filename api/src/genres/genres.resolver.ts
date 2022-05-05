import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Query, Resolver } from "@nestjs/graphql";
import { Movie } from "@src/presets/movies/entities/movies.entity";
import * as https from "https";

import { Genre } from "./entities/genre.entity";
import { GenresService } from "./genres.service";
@Resolver(() => Genre)
export class GenresResolver {
    constructor(
        private readonly genresService: GenresService,
        @InjectRepository(Genre) private readonly repository: EntityRepository<Genre>,
        @InjectRepository(Movie) private readonly movieRepository: EntityRepository<Movie>,
    ) {}

    @Query(() => [Genre])
    async genresAll(): Promise<Genre[]> {
        return this.repository.findAll();
    }

    async getGenre(id: string): Promise<Genre> {
        const entitie = await this.repository.findOneOrFail({ apiId: id });
        return entitie;
        /*const entities = genres.map((g: string) => this.repository.create({ title: g }));
        await this.repository.persistAndFlush(entities);
        return entities;*/
    }

    @Query(() => Boolean)
    async addGenres() {
        const options = {
            hostname: "api.themoviedb.org",
            port: 443,
            path: `/3/genre/movie/list?api_key=${process.env.MOVIE_API_KEY}&language=en-US`,
            method: "GET",
        };

        const req = https.request(options, async (res) => {
            const data: Buffer[] = [];
            await res
                .on("data", (d: Buffer) => {
                    data.push(d);
                })
                .on("end", async () => {
                    const buffer = Buffer.concat(data);
                    const d = JSON.parse(buffer.toString("utf8"));
                    try {
                        for (const genre of d.genres) {
                            const entityExists = await this.repository.findOne({ apiId: genre.id.toString() });
                            if (!entityExists) {
                                const genreEntity = this.repository.create({
                                    title: genre.name,
                                    apiId: genre.id.toString(),
                                });
                                await this.repository.persistAndFlush(genreEntity);
                            }
                        }
                    } catch (e) {
                        console.log(e);
                    }
                });
        });

        req.on("error", (error: Error) => {
            console.error(error);
            return false;
        });

        req.end();
        return true;
    }
}
