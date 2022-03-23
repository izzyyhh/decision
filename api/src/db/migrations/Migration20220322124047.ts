import { Migration } from '@mikro-orm/migrations';

export class Migration20220322124047 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "movie" ("id" uuid not null, "title" text not null, "poster_path" text not null, "backdrop_path" text null, "rating" text not null, "description" text not null, "release_date" text not null, "adult" text null, "media_type" text not null, "genres" text not null);');
    this.addSql('alter table "movie" add constraint "movie_pkey" primary key ("id");');

    this.addSql('alter table "poll" add column "hash" varchar(255) null;');

    this.addSql('drop table if exists "migrations_lock" cascade;');
  }

}
