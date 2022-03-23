import { Migration } from '@mikro-orm/migrations';

export class Migration20220323225625 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "genre" rename column "apiid" to "api_id";');


    this.addSql('drop table if exists "migrations_lock" cascade;');
  }

}
