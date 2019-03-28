import { DbService } from '../../infrastructure/db';
import squel from 'squel';
import { Config } from '../../config';
import { MutationBuilder } from './mutation';
import { float } from 'aws-sdk/clients/lightsail';
interface Company {
  id: number;
  name: string;
  email: string;
  description: string;
  img: string;
  total_amount: float;
  current_amount: float;
  is_active: number;
}

export class CompanyService {
  constructor(public db: DbService) {}

  async getCompany(email: string): Promise<Company> {
    const squelPostgres = squel.useFlavour('postgres');
    const sql = squelPostgres.select(Config.pgSqlOptions).from('companies')
      .field('companies.id', 'id')
      .field('companies.name', 'name')
      .field('companies.email', 'email')
      .field('companies.description', 'description')
      .field('companies.img', 'img')
      .field('companies.total_amount', 'total_amount')
      .field('companies.current_amount', 'current_amount')
      .field('companies.is_active', 'is_active')
      .where('companies.email=?', email)
      .limit(1);
    const result = await this.db.query(sql.toString());
    const company = result['rows'][0];
    return {
      ...company,
    };
  }

  async setIndividual(mutationType, setParams, whereParams) {
    return new MutationBuilder(mutationType, setParams, whereParams).toParam();
  }
}
