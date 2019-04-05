import { DbService } from '../../infrastructure/db';
import { MutationBuilder } from './mutation';
import { QueryBuilder } from './query';

export class PostService {
  constructor(public db: DbService) {}

  async getPosts(ids: number[]) {
    const posts = await this.db.query(this.getBaseQuery().whereIds(ids).toString(), []);
    return posts['rows'];
  }

  async getAllPosts(id: number, type: string) {
    const posts = await this.db.query(this.getBaseQuery().whereUserId(id, type).toString(), []);
    return posts['rows'];
  }

  async setPost(mutationType, setParams, whereParams) {
    return new MutationBuilder(mutationType, setParams, whereParams).toParam();
  }

  private getBaseQuery() {
    return new QueryBuilder()
        .selectId('id')
        .selectUserId('user_id')
        .selectUserType('user_type')
        .selectSponsorId('sponsor_id')
        .selectSponsorType('sponsor_type')
        .selectSponsorAmount('sponsor_amount')
        .selectDescription('description')
        .selectIsActive('isActive')
        .selectCreated('created')
        .selectUpdated('updated')
        .selectEndDate('end_date');
  }
}