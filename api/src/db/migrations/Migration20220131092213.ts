import { Migration } from '@mikro-orm/migrations';

export class Migration20220131092213 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null, "name" text not null, "token" text not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
  }

}
