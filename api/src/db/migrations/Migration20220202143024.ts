import { Migration } from '@mikro-orm/migrations';

export class Migration20220202143024 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "decision" drop constraint "decision_poll_id_foreign";');
    this.addSql('drop index "decision_poll_id_index";');
    this.addSql('alter table "decision" drop column "poll_id";');
  }

}
