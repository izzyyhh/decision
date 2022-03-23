import { Migration } from '@mikro-orm/migrations';

export class Migration20220323104751 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "movie_genres" cascade;');
  }

}
