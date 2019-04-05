import { DbService } from '../../infrastructure/db';
import { MutationBuilder } from './mutation';
import { QueryBuilder } from './query';

export class CommentService {
  constructor(public db: DbService) {}

  async getComments(ids: number[], commentType: string) {
    const posts = await this.db.query(this.getBaseQuery().whereIds(ids, commentType).toString(), []);
    return posts['rows'];
  }

  async getAllRelatedComments(id: number, commentType: string) {
    const posts = await this.db.query(this.getBaseQuery().whereParentId(id, commentType).toString(), []);
    return posts['rows'];
  }

  async getAllUserComments(id: number, userType: string, commentType: string) {
    const posts = await this.db.query(this.getBaseQuery().whereUserId(id, userType, commentType).toString(), []);
    return posts['rows'];
  }

  async setComment(mutationType, setParams, whereParams) {
    return new MutationBuilder(mutationType, setParams, whereParams).toParam();
  }

  private getBaseQuery() {
    return new QueryBuilder()
        .selectId('id')
        .selectUserId('user_id')
        .selectUserType('user_type')
        .selectCommentType('comment_type')
        .selectDescription('description')
        .selectPostId('post_id')
        .selectSentiment('sentiment')
        .selectIsActive('isActive')
        .selectCreated('created')
        .selectUpdated('updated');
  }
}