import { Migration } from '@mikro-orm/migrations';

export class Migration20220322124047 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "poll" add column "hash" varchar(255) null;');

    this.addSql('drop table if exists "migrations_lock" cascade;');
  }

}
