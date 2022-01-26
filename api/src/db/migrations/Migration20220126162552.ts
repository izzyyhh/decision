import { Migration } from '@mikro-orm/migrations';

export class Migration20220126162552 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "migrations_lock" cascade;');
  }

}
