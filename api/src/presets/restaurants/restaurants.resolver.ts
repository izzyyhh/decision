import { HttpService } from "@nestjs/axios";
import { Query, Resolver } from "@nestjs/graphql";
import { Option } from "@src/options/entities/option.entity";

import { OptionDto } from "./dto/restaurant.get";

@Resolver(() => Option)
export class RestaurantsResolver {
    client: any;
    constructor(private httpService: HttpService) {
        // this.client = axios.create({
        //     baseUrl: "https://api.foursquare.com/v3",
        //     timeout: 1000,
        //     headers: {
        //         // eslint-disable-next-line @typescript-eslint/naming-convention
        //         Accept: "application/json",
        //         // eslint-disable-next-line @typescript-eslint/naming-convention
        //         Authorization: "fsq3BD/nBQxS+cXMcNWyndE2/KmDnjpMkFz6yVTdeotjbVw=",
        //     },
        // });
    }
    @Query(() => [Option])
    async getRestaurantsPreset(): Promise<OptionDto[]> {
        let restaurants: any[] = [];
        await this.httpService
            .get("https://api.foursquare.com/v3/places/search", {
                params: {
                    query: "restaurant",
                    ll: "47.8095,13.0550",
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
                    console.log("halo");
                    console.log(value.data.results.slice(0, 5));
                    restaurants = value.data.results.slice(0, 5);
                },
                (error) => {
                    return null;
                },
            );

        console.log(restaurants, "restaurants");
        if (restaurants) {
            const proms = restaurants.map((restaurant: any) => {
                return new Promise<OptionDto>(async (resolve, reject) => {
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
                                const imgData = value.data.results[0];
                                url = `${imgData.prefix}original${imgData.suffix}`;
                            },
                            (error) => {
                                return null;
                            },
                        );

                    resolve({ thumbnailUrl: url, title: restaurant.name });
                });
            });

            const result = await Promise.all(proms);
            return result;
        } else {
            return [];
        }
        // sample.map((s: any, index: number): Option => {
        //     let url = "";
        //     if(s.categories[0].icon){
        //         let icon = s.categories[0].icon
        //         url = ``
        //     }
        //     return {
        //         title: s.name ?? `Place ${index}`,
        //         thumbnailUrl: s.
        //     }
        // })
    }
}
