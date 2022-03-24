import { Migration } from '@mikro-orm/migrations';

export class Migration20220324085916 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "movie" ("id" uuid not null, "title" text not null, "poster_path" text not null, "backdrop_path" text null, "rating" text not null, "description" text not null, "release_date" text not null, "adult" text null, "media_type" text not null);');
    this.addSql('alter table "movie" add constraint "movie_pkey" primary key ("id");');

    this.addSql('create table "genre" ("api_id" varchar(255) not null, "title" text not null);');
    this.addSql('alter table "genre" add constraint "genre_pkey" primary key ("api_id");');

    this.addSql('create table "genre_movies" ("genre_api_id" varchar(255) not null, "movie_id" uuid not null);');
    this.addSql('alter table "genre_movies" add constraint "genre_movies_pkey" primary key ("genre_api_id", "movie_id");');

    this.addSql('alter table "genre_movies" add constraint "genre_movies_genre_api_id_foreign" foreign key ("genre_api_id") references "genre" ("api_id") on update cascade on delete cascade;');
    this.addSql('alter table "genre_movies" add constraint "genre_movies_movie_id_foreign" foreign key ("movie_id") references "movie" ("id") on update cascade on delete cascade;');
  }

}
