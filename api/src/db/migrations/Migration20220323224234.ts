import { Migration } from '@mikro-orm/migrations';

export class Migration20220323224234 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "genre" add column "api_id" text not null;');

    this.addSql('drop table if exists "migrations_lock" cascade;');
  }

}
