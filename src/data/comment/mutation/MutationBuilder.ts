import squel from 'squel';
import { Config } from '../../../config';

export class MutationBuilder {
  private sql;
  private mutationMapParam = {
    id: this.mutateId,
    user_id: this.mutateUserId,
    user_type: this.mutateUserType,
    description: this.mutateDescription,
    post_id: this.mutatePostId,
    comment_type: this.mutateCommentType,
    sentiment: this.mutateSentiment,
    is_active: this.mutateIsActive,
  };
  constructor(mutationType:string, setParams, whereParams) {
    const squelPostgres = squel.useFlavour('postgres');
    const mutationMap = {
      update: squelPostgres.update(Config.pgSqlOptions).table('comments'),
      insert: squelPostgres.insert(Config.pgSqlOptions).into('comments'),
      delete: squelPostgres.delete(Config.pgSqlOptions).from('comments'),
    };
    this.sql = mutationMap[mutationType];
    if (mutationType !== 'insert') {
      for (const param in whereParams) {
        if (param in this.mutationMapParam) {
          this.mutationMapParam[param].bind(this)('where', whereParams[param]);
        }
      }
    }
    if (mutationType !== 'delete') {
      for (const param in setParams) {
        if (param in this.mutationMapParam) {
          this.mutationMapParam[param].bind(this)('set', setParams[param]);
        }
      }
    }
    this.sql.returning('*');
    this.mutateDate(mutationType);
  }

  private mutateDate(mutationType:string) {
    switch (mutationType){
      case 'insert':
        this.sql.set('created', new Date().toISOString());
        break;
    }
    return this;
  }

  private mutateId(field, value) {
    switch (field){
      case 'where':
        this.sql.where('id=?', value);
        break;
    }
    return this;
  }

  private mutateUserId(field, value) {
    switch (field){
      case 'set':
        this.sql.set('user_id', value);
        break;
      case 'where':
        this.sql.where('user_id=?', value);
        break;
    }
    return this;
  }

  private mutateUserType(field, value) {
    switch (field){
      case 'set':
        this.sql.set('user_type', value);
        break;
      case 'where':
        this.sql.where('user_type=?', value);
        break;
    }
    return this;
  }

  private mutateDescription(field, value) {
    switch (field){
      case 'set':
        this.sql.set('description', value);
        break;
      case 'where':
        this.sql.where('description=?', value);
        break;
    }
    return this;
  }

  private mutatePostId(field, value) {
    switch (field){
      case 'set':
        this.sql.set('post_id', value);
        break;
      case 'where':
        this.sql.where('post_id=?', value);
        break;
    }
    return this;
  }

  private mutateCommentType(field, value) {
    switch (field){
      case 'set':
        this.sql.set('comment_type', value);
        break;
      case 'where':
        this.sql.where('comment_type=?', value);
        break;
    }
    return this;
  }

  private mutateSentiment(field, value) {
    switch (field){
      case 'set':
        this.sql.set('sentiment', value);
        break;
      case 'where':
        this.sql.where('sentiment=?', value);
        break;
    }
    return this;
  }

  private mutateIsActive(field, value) {
    switch (field){
      case 'set':
        this.sql.set('is_active', value);
        break;
      case 'where':
        this.sql.where('is_active=?', value);
        break;
    }
    return this;
  }

  toString() {
    return this.sql.toString();
  }

  toParam() {
    return this.sql.toParam();
  }
}
