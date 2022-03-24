import { Migration } from '@mikro-orm/migrations';

export class Migration20220323100534 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "migrations_lock" cascade;');
  }

}
