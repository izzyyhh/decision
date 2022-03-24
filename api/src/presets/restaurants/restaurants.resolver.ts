import { HttpService } from "@nestjs/axios";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { Option } from "@src/options/entities/option.entity";

import { LocationDto } from "./dto/location.dto";
import { OptionDto } from "./dto/restaurant.get";
import sample from "./sample";

@Resolver(() => Option)
export class RestaurantsResolver {
    constructor(private httpService: HttpService) {}
    @Query(() => [Option])
    async getRestaurantsPreset(@Args("data", { type: () => LocationDto }) location: LocationDto): Promise<OptionDto[]> {
        console.log(location);
        return sample;
        // return new Promise((mainresolve) => {
        //     this.httpService
        //         .get("https://api.foursquare.com/v3/places/search", {
        //             params: {
        //                 query: "restaurant",
        //                 ll: "47.8095,13.0550",
        //             },
        //             headers: {
        //                 // eslint-disable-next-line @typescript-eslint/naming-convention
        //                 Accept: "application/json",
        //                 // eslint-disable-next-line @typescript-eslint/naming-convention
        //                 Authorization: "fsq3BD/nBQxS+cXMcNWyndE2/KmDnjpMkFz6yVTdeotjbVw=",
        //             },
        //         })
        //         .subscribe(
        //             (value) => {
        //                 console.log("halo");
        //                 console.log(value.data.results.slice(0, 5));
        //                 const restaurants = value.data.results.slice(0, 5);

        //                 const proms = restaurants.map((restaurant: any) => {
        //                     return new Promise<OptionDto>(async (resolve, reject) => {
        //                         let url = "";
        //                         await this.httpService
        //                             .get(`https://api.foursquare.com/v3/places/${restaurant.fsq_id}/photos`, {
        //                                 headers: {
        //                                     // eslint-disable-next-line @typescript-eslint/naming-convention
        //                                     Accept: "application/json",
        //                                     // eslint-disable-next-line @typescript-eslint/naming-convention
        //                                     Authorization: "fsq3BD/nBQxS+cXMcNWyndE2/KmDnjpMkFz6yVTdeotjbVw=",
        //                                 },
        //                             })
        //                             .subscribe(
        //                                 (value) => {
        //                                     const imgData = value.data[0];
        //                                     url = `${imgData.prefix}original${imgData.suffix}`;
        //                                     resolve({ thumbnailUrl: url, title: restaurant.name });
        //                                 },
        //                                 (error) => {
        //                                     return null;
        //                                 },
        //                             );
        //                     });
        //                 });

        //                 Promise.all(proms).then((values) => {
        //                     mainresolve(values);
        //                 });
        //             },
        //             (error) => {
        //                 return null;
        //             },
        //         );
        // });

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
