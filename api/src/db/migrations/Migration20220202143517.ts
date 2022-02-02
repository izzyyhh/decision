import { Migration } from '@mikro-orm/migrations';

export class Migration20220202143517 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "decision" add column "poll_id" uuid not null;');
    this.addSql('create index "decision_poll_id_index" on "decision" ("poll_id");');

    this.addSql('alter table "decision" add constraint "decision_poll_id_foreign" foreign key ("poll_id") references "poll" ("id") on update cascade;');
  }

}
