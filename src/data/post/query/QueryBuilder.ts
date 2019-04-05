import squel from 'squel';
import { Config } from '../../../config';
export class QueryBuilder {
  private sql: squel.Select;
  constructor() {
    const squelPostgres = squel.useFlavour('postgres');
    this.sql = squelPostgres.select(Config.pgSqlOptions).from('posts', 'post');
  }

  selectId(alias) {
    this.sql.field('post.id', alias);
    return this;
  }

  selectUserId(alias) {
    this.sql.field('post.user_id', alias);
    return this;
  }

  selectUserType(alias) {
    this.sql.field('post.user_type', alias);
    return this;
  }

  selectDescription(alias) {
    this.sql.field('post.description', alias);
    return this;
  }

  selectSponsorId(alias) {
    this.sql.field('post.sponsor_id', alias);
    return this;
  }

  selectSponsorType(alias) {
    this.sql.field('post.sponsor_type', alias);
    return this;
  }

  selectSponsorAmount(alias) {
    this.sql.field('post.sponsor_amount', alias);
    return this;
  }

  selectIsActive(alias) {
    this.sql.field('post.is_active', alias);
    return this;
  }

  selectEndDate(alias) {
    this.sql.field('post.end_date', alias);
    return this;
  }

  selectCreated(alias) {
    this.sql.field('post.created', alias);
    return this;
  }

  selectUpdated(alias) {
    this.sql.field('post.updated', alias);
    return this;
  }

  whereIds(ids: number[]) {
    if (ids.length) {
      this.sql.where(`user_id IN (${ids.join(', ')})`);
    } else {
      this.sql.where('false');
    }
    return this;
  }

  whereUser(id: number, type: string) {
    if (id) {
      this.sql.where(`user_id IN (${id})`).where(`user_type = '${type}'`);
    } else {
      this.sql.where('false');
    }
    return this;
  }

  toString() {
    return this.sql.toString();
  }
}
