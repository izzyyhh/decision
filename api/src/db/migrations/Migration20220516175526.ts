import { Migration } from '@mikro-orm/migrations';

export class Migration20220516175526 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "movie" ("id" uuid not null, "title" text not null, "poster_path" text not null, "backdrop_path" text null, "rating" text not null, "description" text not null, "release_date" text not null, "adult" text null, "media_type" text not null, "genres" text not null);');
    this.addSql('alter table "movie" add constraint "movie_pkey" primary key ("id");');

    this.addSql('create table "user" ("id" uuid not null, "name" text not null, "token" text null, "refresh_token" text null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');

    this.addSql('create table "thumbnail" ("id" uuid not null, "link" text not null);');
    this.addSql('alter table "thumbnail" add constraint "thumbnail_pkey" primary key ("id");');

    this.addSql('create table "product" ("id" uuid not null, "name" text not null, "description" text not null, "created_at" timestamp with time zone not null, "updated_at" timestamp with time zone not null);');
    this.addSql('alter table "product" add constraint "product_pkey" primary key ("id");');

    this.addSql('create table "poll" ("id" uuid not null, "title" text not null, "sharelink" text null, "owner_id" uuid not null, "type" int2 not null, "predefined" bool not null default false, "hash" varchar(255) null, "created_at" bigint null);');
    this.addSql('alter table "poll" add constraint "poll_pkey" primary key ("id");');
    this.addSql('create index "poll_owner_id_index" on "poll" ("owner_id");');

    this.addSql('create table "option" ("id" uuid not null, "title" text not null, "poll_id" uuid not null, "thumbnail_url" varchar(255) null);');
    this.addSql('alter table "option" add constraint "option_pkey" primary key ("id");');

    this.addSql('create table "genre" ("api_id" varchar(255) not null, "title" text not null);');
    this.addSql('alter table "genre" add constraint "genre_pkey" primary key ("api_id");');

    this.addSql('create table "decision" ("id" uuid not null, "user_id" uuid not null, "option_id" uuid not null, "poll_id" uuid not null, "answer" int4 null, "created_at" bigint null);');
    this.addSql('alter table "decision" add constraint "decision_pkey" primary key ("id");');
    this.addSql('create index "decision_user_id_index" on "decision" ("user_id");');
    this.addSql('create index "decision_option_id_index" on "decision" ("option_id");');
    this.addSql('create index "decision_poll_id_index" on "decision" ("poll_id");');

    this.addSql('alter table "poll" add constraint "poll_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "option" add constraint "option_poll_id_foreign" foreign key ("poll_id") references "poll" ("id") on update cascade;');

    this.addSql('alter table "decision" add constraint "decision_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "decision" add constraint "decision_option_id_foreign" foreign key ("option_id") references "option" ("id") on update cascade;');
    this.addSql('alter table "decision" add constraint "decision_poll_id_foreign" foreign key ("poll_id") references "poll" ("id") on update cascade;');

    this.addSql('drop table if exists "genre_movies" cascade;');

    this.addSql('drop table if exists "migrations_lock" cascade;');
  }

}
