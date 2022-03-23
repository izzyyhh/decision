import { Migration } from '@mikro-orm/migrations';

export class Migration20220323225339 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "genre" rename column "api_id" to "apiid";');
  }

}
