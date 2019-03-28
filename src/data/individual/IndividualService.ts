import { DbService } from '../../infrastructure/db';
import squel from 'squel';
import { Config } from '../../config';
import { MutationBuilder } from './mutation';
import { float } from 'aws-sdk/clients/lightsail';
interface Individual {
  id: number;
  firstName: string;
  lastName: string;
  img: string;
  description: string;
  email: string;
  total_amount: float;
  remaining_amount: float;
  is_active: number;
}

export class IndividualService {
  constructor(public db: DbService) {}

  async getIndividual(email: string): Promise<Individual> {
    const squelPostgres = squel.useFlavour('postgres');
    const sql = squelPostgres.select(Config.pgSqlOptions).from('individuals')
      .field('individuals.id', 'id')
      .field('individuals.first_name', 'firstName')
      .field('individuals.last_name', 'lastName')
      .field('individuals.email', 'email')
      .field('individuals.description', 'description')
      .field('individuals.img', 'img')
      .field('individuals.total_amount', 'total_amount')
      .field('individuals.remaining_amount', 'remaining_amount')
      .field('individuals.is_active', 'is_active')
      .where('individuals.email=?', email)
      .limit(1);
    const result = await this.db.query(sql.toString());
    const individual = result['rows'][0];
    return {
      ...individual,
    };
  }

  async setIndividual(mutationType, setParams, whereParams) {
    return new MutationBuilder(mutationType, setParams, whereParams).toParam();
  }
}
