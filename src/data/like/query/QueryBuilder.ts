import squel from 'squel';
import { Config } from '../../../config';
export class QueryBuilder {
  private sql: squel.Select;
  constructor() {
    const squelPostgres = squel.useFlavour('postgres');
    this.sql = squelPostgres
      .select(Config.pgSqlOptions)
      .from('likes', 'likes');
  }

  selectId(alias) {
    this.sql.field('likes.id', alias);
    return this;
  }

  selectUserId(alias) {
    this.sql.field('likes.user_id', alias);
    return this;
  }

  selectUserType(alias) {
    this.sql.field('likes.user_type', alias);
    return this;
  }

  selectParentId(alias) {
    this.sql.field('likes.post_comment_id', alias);
    return this;
  }

  selectParentType(alias) {
    this.sql.field('likes.post_comment_type', alias);
    return this;
  }

  selectIsActive(alias) {
    this.sql.field('likes.is_active', alias);
    return this;
  }

  selectCreated(alias) {
    this.sql.field('likes.created', alias);
    return this;
  }

  selectUpdated(alias) {
    this.sql.field('likes.updated', alias);
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

  whereUser(id: number, userType: string) {
    if (id) {
      this.sql
        .where(`user_id IN (${id})`)
        .where(`user_type = '${userType}'`);
    } else {
      this.sql.where('false');
    }
    return this;
  }

  whereParent(id: number, parentType: string) {
    if (id) {
      this.sql
        .where(`post_comment_id IN (${id})`)
        .where(`post_comment_type = '${parentType}'`);
    } else {
      this.sql.where('false');
    }
    return this;
  }

  toString() {
    return this.sql.toString();
  }
}
