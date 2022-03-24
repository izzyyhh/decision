import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "@src/common/guards/auth.guard";

import { Preset } from "./dto/presets.get";

@Resolver(() => Preset)
export class PresetsResolver {
    @UseGuards(AuthGuard)
    @Query(() => [Preset])
    async presetsAll(): Promise<Preset[]> {
        const presets = [
            {
                title: "Movies",
                thumbnailUrl: "https://cdn.pixabay.com/photo/2015/12/09/17/12/popcorn-1085072_960_720.jpg",
            },
            {
                title: "Restaurants",
                thumbnailUrl: "https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_960_720.jpg",
            },
        ];
        return presets;
    }
}
