import squel from 'squel';
import { Config } from '../../../config';

export class MutationBuilder {
  private sql;
  private mutationMapParam = {
    id: this.mutateId,
    user_id: this.mutateUserId,
    user_type: this.mutateUserType,
    post_comment_id: this.mutateParentId,
    post_comment_type: this.mutateParentType,
    is_active: this.mutateIsActive,
  };
  constructor(mutationType:string, setParams, whereParams) {
    const squelPostgres = squel.useFlavour('postgres');
    const mutationMap = {
      update: squelPostgres.update(Config.pgSqlOptions).table('likes'),
      insert: squelPostgres.insert(Config.pgSqlOptions).into('likes'),
      delete: squelPostgres.delete(Config.pgSqlOptions).from('likes'),
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

  private mutateParentId(field, value) {
    switch (field){
      case 'set':
        this.sql.set('post_comment_id', value);
        break;
      case 'where':
        this.sql.where('post_comment_id=?', value);
        break;
    }
    return this;
  }

  private mutateParentType(field, value) {
    switch (field){
      case 'set':
        this.sql.set('post_comment_type', value);
        break;
      case 'where':
        this.sql.where('post_comment_type=?', value);
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
