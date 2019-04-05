import squel from 'squel';
import { Config } from '../../../config';
export class QueryBuilder {
  private sql: squel.Select;
  constructor() {
    const squelPostgres = squel.useFlavour('postgres');
    this.sql = squelPostgres
      .select(Config.pgSqlOptions)
      .from('comments', 'comment');
  }

  selectId(alias) {
    this.sql.field('comment.id', alias);
    return this;
  }

  selectUserId(alias) {
    this.sql.field('comment.user_id', alias);
    return this;
  }

  selectUserType(alias) {
    this.sql.field('comment.user_type', alias);
    return this;
  }

  selectCommentType(alias) {
    this.sql.field('comment.comment_type', alias);
    return this;
  }

  selectDescription(alias) {
    this.sql.field('comment.description', alias);
    return this;
  }

  selectPostId(alias) {
    this.sql.field('comment.post_id', alias);
    return this;
  }

  selectSentiment(alias) {
    this.sql.field('comment.sentiment', alias);
    return this;
  }

  selectIsActive(alias) {
    this.sql.field('comment.is_active', alias);
    return this;
  }

  selectCreated(alias) {
    this.sql.field('comment.created', alias);
    return this;
  }

  selectUpdated(alias) {
    this.sql.field('comment.updated', alias);
    return this;
  }

  whereCommentType(commentType: string) {
    if (['pro', 'con'].includes(commentType)) {
      this.sql.where(`comment_type = '${commentType}'`);
    }
  }

  whereIds(ids: number[], commentType: string) {
    if (ids.length) {
      this.sql.where(`user_id IN (${ids.join(', ')})`);
      this.whereCommentType(commentType);
    } else {
      this.sql.where('false');
    }
    return this;
  }

  whereUser(id: number, userType: string, commentType: string) {
    if (id) {
      this.sql
        .where(`user_id IN (${id})`)
        .where(`user_type = '${userType}'`);
      this.whereCommentType(commentType);
    } else {
      this.sql.where('false');
    }
    return this;
  }

  whereParent(id: number, commentType: string) {
    if (id) {
      this.sql
        .where(`post_id IN (${id})`);
      this.whereCommentType(commentType);
    } else {
      this.sql.where('false');
    }
    return this;
  }

  toString() {
    return this.sql.toString();
  }
}
