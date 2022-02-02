import { Migration } from '@mikro-orm/migrations';

export class Migration20220202142935 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "thumbnail" ("id" uuid not null, "link" text not null);');
    this.addSql('alter table "thumbnail" add constraint "thumbnail_pkey" primary key ("id");');

    this.addSql('create table "poll" ("id" uuid not null, "title" text not null, "sharelink" text null, "owner_id" uuid not null, "type" int2 not null, "predefined" bool not null default false);');
    this.addSql('alter table "poll" add constraint "poll_pkey" primary key ("id");');
    this.addSql('create index "poll_owner_id_index" on "poll" ("owner_id");');

    this.addSql('create table "option" ("id" uuid not null, "title" text not null, "poll_id" uuid not null, "thumbnail_url" varchar(255) null);');
    this.addSql('alter table "option" add constraint "option_pkey" primary key ("id");');
    this.addSql('create index "option_poll_id_index" on "option" ("poll_id");');

    this.addSql('create table "decision" ("id" uuid not null, "user_id" uuid not null, "poll_id" uuid not null, "option_id" uuid not null, "answer" int4 null);');
    this.addSql('alter table "decision" add constraint "decision_pkey" primary key ("id");');
    this.addSql('create index "decision_user_id_index" on "decision" ("user_id");');
    this.addSql('create index "decision_poll_id_index" on "decision" ("poll_id");');
    this.addSql('create index "decision_option_id_index" on "decision" ("option_id");');

    this.addSql('alter table "poll" add constraint "poll_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "option" add constraint "option_poll_id_foreign" foreign key ("poll_id") references "poll" ("id") on update cascade;');

    this.addSql('alter table "decision" add constraint "decision_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "decision" add constraint "decision_poll_id_foreign" foreign key ("poll_id") references "poll" ("id") on update cascade;');
    this.addSql('alter table "decision" add constraint "decision_option_id_foreign" foreign key ("option_id") references "option" ("id") on update cascade;');

    this.addSql('drop table if exists "migrations_lock" cascade;');
  }

}
