import squel from 'squel';
import { Config } from '../../../config';
import { encode } from '../../../infrastructure/auth/Hasher';

export class MutationBuilder {
  private sql;
  private mutationMapParam = {
    id: this.mutateId,
    email: this.mutateEmail,
    password: this.mutatePassword,
    first_name: this.mutateFirstName,
    last_name: this.mutateLastName,
    description: this.mutateDescription,
    img: this.mutateImg,
    amount_left: this.mutateRemainingAmount,
    amount_earned: this.mutateTotalAmount,
    is_active: this.mutateIsActive,
  };
  constructor(mutationType:string, setParams, whereParams) {
    const squelPostgres = squel.useFlavour('postgres');
    const mutationMap = {
      update: squelPostgres.update(Config.pgSqlOptions).table('individuals'),
      insert: squelPostgres.insert(Config.pgSqlOptions).into('individuals'),
      delete: squelPostgres.delete(Config.pgSqlOptions).from('individuals'),
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

  private mutateFirstName(field, value) {
    switch (field){
      case 'set':
        this.sql.set('first_name', value);
        break;
      case 'where':
        this.sql.where('first_name=?', value);
        break;
    }
    return this;
  }

  private mutateLastName(field, value) {
    switch (field){
      case 'set':
        this.sql.set('last_name', value);
        break;
      case 'where':
        this.sql.where('last_name=?', value);
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

  private mutateImg(field, value) {
    switch (field){
      case 'set':
        this.sql.set('img', value);
        break;
      case 'where':
        this.sql.where('img=?', value);
        break;
    }
    return this;
  }

  private mutateRemainingAmount(field, value) {
    switch (field){
      case 'set':
        this.sql.set('remaining_amount', value);
        break;
      case 'where':
        this.sql.where('remaining_amount=?', value);
        break;
    }
    return this;
  }

  private mutateTotalAmount(field, value) {
    switch (field){
      case 'set':
        this.sql.set('total_amount', value);
        break;
      case 'where':
        this.sql.where('total_amount=?', value);
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

  private mutatePassword(field, value) {
    const hashedPasword = encode(value);
    switch (field){
      case 'set':
        this.sql.set('password', hashedPasword);
        break;
      case 'where':
        this.sql.where('password=?', value);
        break;
    }
    return this;
  }

  private mutateEmail(field, value) {
    switch (field){
      case 'set':
        this.sql.set('email', value);
        break;
      case 'where':
        this.sql.where('email=?', value);
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
