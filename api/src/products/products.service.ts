import { FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { Product } from "@src/products/entities/product.entity";

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private readonly repository: EntityRepository<Product>) {}

    getFindCondition(query: string | undefined): FilterQuery<Product> {
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
}
