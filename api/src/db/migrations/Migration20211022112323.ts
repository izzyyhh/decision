import { Migration } from '@mikro-orm/migrations';

export class Migration20211022112323 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("id" uuid not null, "name" text not null, "description" text not null, "created_at" timestamp with time zone not null, "updated_at" timestamp with time zone not null);');
    this.addSql('alter table "product" add constraint "product_pkey" primary key ("id");');
  }

}
