import { CommentService } from '../../comment';
import { LikeService } from '../../like/LikeService';

function createPostTypeResolver(commentService: CommentService, likeService: LikeService) {
  return {
    all_comments: (post) => {
      return commentService.getAllRelatedComments(post.id, '');
    },
    pro_comments: (post) => {
      return commentService.getAllRelatedComments(post.id, 'pro');
    },
    con_comments: (post) => {
      return commentService.getAllRelatedComments(post.id, 'con');
    },
    likes: (post) => {
      return likeService.getAllRelatedLikes(post.id, 'posts');
    },
  };
}

export {
  createPostTypeResolver,
};
