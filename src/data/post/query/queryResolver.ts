import { CommentService } from '../../comment';

function createPostTypeResolver(commentService: CommentService) {
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
  };
}

export {
  createPostTypeResolver,
};
