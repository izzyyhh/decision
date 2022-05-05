import { Migration } from '@mikro-orm/migrations';

export class Migration20220505133938 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "movie_genres" ("movie_id" uuid not null, "genre_api_id" varchar(255) not null);');
    this.addSql('alter table "movie_genres" add constraint "movie_genres_pkey" primary key ("movie_id", "genre_api_id");');

    this.addSql('alter table "movie_genres" add constraint "movie_genres_movie_id_foreign" foreign key ("movie_id") references "movie" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "movie_genres" add constraint "movie_genres_genre_api_id_foreign" foreign key ("genre_api_id") references "genre" ("api_id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "genre_movies" cascade;');
  }

}
