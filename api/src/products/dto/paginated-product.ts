import { ObjectType } from "@nestjs/graphql";
import { PaginatedResponseFactory } from "@src/common/pagination/paginated-response.factory";

import { Product } from "../entities/product.entity";

@ObjectType()
export class PaginatedProducts extends PaginatedResponseFactory.create(Product) {}
