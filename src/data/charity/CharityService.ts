import { DbService } from '../../infrastructure/db';
import squel from 'squel';
import { Config } from '../../config';
import { MutationBuilder } from './mutation';
import { float } from 'aws-sdk/clients/lightsail';

interface Charity {
  id: number;
  name: string;
  img: string;
  description: string;
  email: string;
  total_amount: float;
  is_active: number;
}

export class CharityService {
  constructor(public db: DbService) {}

  async getCharity(email: string): Promise<Charity> {
    const squelPostgres = squel.useFlavour('postgres');
    const sql = squelPostgres.select(Config.pgSqlOptions).from('charities')
      .field('charities.id', 'id')
      .field('charities.name', 'name')
      .field('charities.email', 'email')
      .field('charities.description', 'description')
      .field('charities.img', 'img')
      .field('charities.total_amount', 'total_amount')
      .field('charities.is_active', 'is_active')
      .where('charities.email=?', email)
      .limit(1);
    const result = await this.db.query(sql.toString());
    const charity = result['rows'][0];
    return {
      ...charity,
    };
  }

  async setCharity(mutationType, setParams, whereParams) {
    return new MutationBuilder(mutationType, setParams, whereParams).toParam();
  }
}
