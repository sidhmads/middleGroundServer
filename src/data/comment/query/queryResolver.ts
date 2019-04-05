import { CommentService } from '../../comment';

function createCommentTypeResolver(commentService: CommentService) {
  return {
    comment: (comment, commentType) => {
      return commentService.getAllRelatedComments(comment.id, commentType);
    },
  };
}

export {
  createCommentTypeResolver,
};
