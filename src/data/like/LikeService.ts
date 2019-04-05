import { DbService } from '../../infrastructure/db';
import { MutationBuilder } from './mutation';
import { QueryBuilder } from './query';

export class LikeService {
  constructor(public db: DbService) {}

  async getLikes(ids: number[]) {
    const likes = await this.db.query(this.getBaseQuery().whereIds(ids).toString(), []);
    return likes['rows'];
  }

  async getAllRelatedLikes(id: number, parentType: string) {
    const likes = await this.db.query(this.getBaseQuery().whereParent(id, parentType).toString(), []);
    return likes['rows'];
  }

  async getAllUserLikes(id: number, userType: string) {
    const likes = await this.db.query(this.getBaseQuery().whereUser(id, userType).toString(), []);
    return likes['rows'];
  }

  async setLike(mutationType, setParams, whereParams) {
    return new MutationBuilder(mutationType, setParams, whereParams).toParam();
  }

  private getBaseQuery() {
    return new QueryBuilder()
        .selectId('id')
        .selectUserId('user_id')
        .selectUserType('user_type')
        .selectParentId('post_comment_id')
        .selectParentType('post_comment_type')
        .selectIsActive('isActive')
        .selectCreated('created')
        .selectUpdated('updated');
  }
}