import { HttpService } from "@nestjs/axios";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { Option } from "@src/options/entities/option.entity";

import { CityDto } from "./dto/location.dto";
import { OptionDto } from "./dto/restaurant.get";

@Resolver(() => Option)
export class RestaurantsResolver {
    constructor(private httpService: HttpService) {}

    @Query(() => [Option])
    async getRestaurantsPreset(@Args("data", { type: () => CityDto }) city: CityDto): Promise<OptionDto[]> {
        // return sample;
        return new Promise((mainresolve) => {
            this.httpService
                .get("https://api.foursquare.com/v3/places/search", {
                    params: {
                        query: "restaurant",
                        limit: city.amount,
                        // ll: this.lls[this.c % 2],
                        near: city.name,
                    },
                    headers: {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        Accept: "application/json",
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        Authorization: "fsq3BD/nBQxS+cXMcNWyndE2/KmDnjpMkFz6yVTdeotjbVw=",
                    },
                })
                .subscribe(
                    (value) => {
                        const restaurants = value.data.results.slice(0, 50);
                        // eslint-disable-next-line
                        const proms = restaurants.map((restaurant: any) => {
                            return new Promise<OptionDto>(async (resolve) => {
                                let url = "";
                                await this.httpService
                                    .get(`https://api.foursquare.com/v3/places/${restaurant.fsq_id}/photos`, {
                                        headers: {
                                            // eslint-disable-next-line @typescript-eslint/naming-convention
                                            Accept: "application/json",
                                            // eslint-disable-next-line @typescript-eslint/naming-convention
                                            Authorization: "fsq3BD/nBQxS+cXMcNWyndE2/KmDnjpMkFz6yVTdeotjbVw=",
                                        },
                                    })
                                    .subscribe(
                                        (value) => {
                                            console.log(value);
                                            if (value.data.length > 0) {
                                                const imgData = value.data[0];
                                                url = `${imgData.prefix}original${imgData.suffix}`;
                                                resolve({ thumbnailUrl: url, title: restaurant.name });
                                            } else {
                                                resolve({ thumbnailUrl: "", title: restaurant.name });
                                            }
                                        },
                                        () => {
                                            return null;
                                        },
                                    );
                            });
                        });

                        Promise.all(proms).then((values) => {
                            mainresolve(values);
                        });
                    },
                    (error) => {
                        mainresolve(error);
                    },
                );
        });
    }
}
