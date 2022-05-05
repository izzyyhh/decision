import { Migration } from '@mikro-orm/migrations';

export class Migration20220505142326 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "movie" add column "genres" text not null;');

    this.addSql('drop table if exists "migrations_lock" cascade;');

    this.addSql('drop table if exists "movie_genres" cascade;');
  }

}
