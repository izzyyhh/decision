import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { RestaurantsResolver } from "./restaurants.resolver";

@Module({
    imports: [HttpModule],
    providers: [RestaurantsResolver],
    exports: [RestaurantsResolver],
})
export class RestaurantsModule {}
