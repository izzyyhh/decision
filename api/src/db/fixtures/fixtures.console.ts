import { MikroORM } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { generateProducts } from "@src/db/fixtures/generators/product.fixture";
import { Product } from "@src/products/entities/product.entity";
import { MultiBar, Options, Presets } from "cli-progress";
import { Command, Console } from "nestjs-console";

@Injectable()
@Console()
export class FixturesConsole {
    constructor(private readonly orm: MikroORM, @InjectRepository(Product) private readonly productsRepository: EntityRepository<Product>) {}

    barOptions: Options = {
        format: `{bar} {percentage}% | {value}/{total} {title} | ETA: {eta_formatted} | Duration: {duration_formatted}`,
        noTTYOutput: true,
    };

    @Command({
        command: "fixtures [total]",
        description: "Create fixtures with faker.js",
    })
    async execute(total?: string | number): Promise<void> {
        total = total === undefined ? 10 : Number(total);

        const generator = this.orm.getSchemaGenerator();
        console.log(`Drop and recreate schema...`);
        // the second param is to delete the migrations table
        await generator.dropSchema(true, true);

        console.log(`Run migrations...`);
        const migrator = this.orm.getMigrator();
        await migrator.up();

        const multiBar = new MultiBar(this.barOptions, Presets.shades_classic);
        await Promise.all([generateProducts({ repository: this.productsRepository, bar: multiBar.create(total, 0), total })]);
        multiBar.stop();

        await this.orm.em.flush();
    }
}
