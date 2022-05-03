import { Migration } from '@mikro-orm/migrations';

export class Migration20220502142934 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "refresh_token" text null;');

    this.addSql('drop table if exists "migrations_lock" cascade;');
  }

}
