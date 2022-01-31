import { Migration } from '@mikro-orm/migrations';

export class Migration20220131164924 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_token_check";');
    this.addSql('alter table "user" alter column "token" type text using ("token"::text);');
    this.addSql('alter table "user" alter column "token" drop not null;');
  }

}
