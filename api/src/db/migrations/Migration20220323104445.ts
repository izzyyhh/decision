import { Migration } from '@mikro-orm/migrations';

export class Migration20220323104445 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "migrations_lock" cascade;');
  }

}
