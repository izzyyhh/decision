import { FindOptions } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Args, ID, Int, Mutation, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { SortDirection } from "@src/common/enums";
import { getSortAndPaginationOptions } from "@src/common/pagination/getPaginatedOptions";
import { ProductInput } from "@src/products/dto/product.input";
import { Product } from "@src/products/entities/product.entity";
import { ProductsService } from "@src/products/products.service";

import { PaginatedProducts } from "./dto/paginated-product";
import { ProductsArgs, ProductsOffsetBasedArgs } from "./dto/products.args";

@Resolver(() => Product)
export class ProductsResolver {
    constructor(
        private readonly productsService: ProductsService,
        @InjectRepository(Product) private readonly repository: EntityRepository<Product>,
    ) {}

    @Mutation(() => Product)
    async addProduct(@Args("data", { type: () => ProductInput }) data: ProductInput): Promise<Product> {
        const entity = this.repository.create(data);
        await this.repository.persistAndFlush(entity);
        return entity;
    }

    @Query(() => Product)
    async product(@Args("id", { type: () => ID }) id: string): Promise<Product> {
        return this.repository.findOneOrFail({ id });
    }

    @Query(() => [Product])
    async productsAll(): Promise<Product[]> {
        return this.repository.findAll();
    }

    @Query(() => PaginatedProducts)
    async products(@Args() { query, ...args }: ProductsArgs): Promise<PaginatedProducts> {
        const { skip: offset, take: limit, order: orderBy } = getSortAndPaginationOptions(args);
        const where = this.productsService.getFindCondition(query);

        const [products, totalCount] = await this.repository.findAndCount(where, { offset, limit, orderBy });

        return new PaginatedProducts(products, totalCount, args);
    }

    @Query(() => [Product])
    async productsOffsetBased(
        @Args() { query, offset, limit, sortColumnName, sortDirection = SortDirection.DESC }: ProductsOffsetBasedArgs,
    ): Promise<Product[]> {
        const where = this.productsService.getFindCondition(query);
        const options: FindOptions<Product> = { offset, limit };

        if (sortColumnName) {
            options.orderBy = { [sortColumnName]: sortDirection };
        }

        return this.repository.find(where, options);
    }

    @Mutation(() => Product)
    async updateProduct(
        @Args("id", { type: () => ID }) id: string,
        @Args("data", { type: () => ProductInput }) data: ProductInput,
    ): Promise<Product> {
        const entity = await this.repository.findOneOrFail(id);
        entity.assign(data);
        await this.repository.persistAndFlush(entity);
        return entity;
    }

    @Mutation(() => Boolean)
    async deleteProduct(@Args("id", { type: () => ID }) id: string): Promise<boolean> {
        const product = await this.repository.findOneOrFail(id);
        await this.repository.removeAndFlush(product);
        return true;
    }

    @ResolveField(() => Int)
    sales(): number {
        return 0;
    }
}
