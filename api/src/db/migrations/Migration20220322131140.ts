import { Migration } from '@mikro-orm/migrations';

export class Migration20220322131140 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "movie" drop column "genres";');

    this.addSql('create table "genre" ("id" uuid not null, "title" text not null);');
    this.addSql('alter table "genre" add constraint "genre_pkey" primary key ("id");');

    this.addSql('create table "genre_movies" ("genre_id" uuid not null, "movie_id" uuid not null);');
    this.addSql('alter table "genre_movies" add constraint "genre_movies_pkey" primary key ("genre_id", "movie_id");');

    this.addSql('create table "movie_genres" ("movie_id" uuid not null, "genre_id" uuid not null);');
    this.addSql('alter table "movie_genres" add constraint "movie_genres_pkey" primary key ("movie_id", "genre_id");');

    this.addSql('alter table "genre_movies" add constraint "genre_movies_genre_id_foreign" foreign key ("genre_id") references "genre" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "genre_movies" add constraint "genre_movies_movie_id_foreign" foreign key ("movie_id") references "movie" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "movie_genres" add constraint "movie_genres_movie_id_foreign" foreign key ("movie_id") references "movie" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "movie_genres" add constraint "movie_genres_genre_id_foreign" foreign key ("genre_id") references "genre" ("id") on update cascade on delete cascade;');
  }

}
