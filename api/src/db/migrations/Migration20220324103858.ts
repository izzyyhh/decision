import { Migration } from '@mikro-orm/migrations';

export class Migration20220324103858 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "poll" add column "created_at" bigint null;');

    this.addSql('alter table "decision" add column "created_at" bigint null;');

    this.addSql('drop table if exists "migrations_lock" cascade;');
  }

}
