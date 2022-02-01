import { Migration } from '@mikro-orm/migrations';

export class Migration20220201092734 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "poll" ("id" uuid not null, "title" text not null, "sharelink" text not null, "owner_id" uuid not null, "type" int2 not null, "predefined" bool not null);');
    this.addSql('alter table "poll" add constraint "poll_pkey" primary key ("id");');
    this.addSql('create index "poll_owner_id_index" on "poll" ("owner_id");');

    this.addSql('create table "thumbnail" ("id" uuid not null, "link" text not null);');
    this.addSql('alter table "thumbnail" add constraint "thumbnail_pkey" primary key ("id");');

    this.addSql('create table "decision" ("id" uuid not null, "user_id" uuid not null, "poll_id" uuid not null, "answer" int4 null);');
    this.addSql('alter table "decision" add constraint "decision_pkey" primary key ("id");');
    this.addSql('create index "decision_user_id_index" on "decision" ("user_id");');
    this.addSql('create index "decision_poll_id_index" on "decision" ("poll_id");');

    this.addSql('create table "option" ("id" uuid not null, "title" text not null, "poll_id" uuid not null, "thumbnail_id" uuid not null, "decision_id" uuid not null);');
    this.addSql('alter table "option" add constraint "option_pkey" primary key ("id");');
    this.addSql('create index "option_poll_id_index" on "option" ("poll_id");');
    this.addSql('create index "option_thumbnail_id_index" on "option" ("thumbnail_id");');
    this.addSql('alter table "option" add constraint "option_thumbnail_id_unique" unique ("thumbnail_id");');
    this.addSql('create index "option_decision_id_index" on "option" ("decision_id");');

    this.addSql('alter table "poll" add constraint "poll_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "decision" add constraint "decision_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "decision" add constraint "decision_poll_id_foreign" foreign key ("poll_id") references "poll" ("id") on update cascade;');

    this.addSql('alter table "option" add constraint "option_poll_id_foreign" foreign key ("poll_id") references "poll" ("id") on update cascade;');
    this.addSql('alter table "option" add constraint "option_thumbnail_id_foreign" foreign key ("thumbnail_id") references "thumbnail" ("id") on update cascade;');
    this.addSql('alter table "option" add constraint "option_decision_id_foreign" foreign key ("decision_id") references "decision" ("id") on update cascade;');
  }

}
