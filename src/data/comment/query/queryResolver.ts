import { LikeService } from '../../like/LikeService';

function createCommentTypeResolver(likeService: LikeService) {
  return {
    likes: (comment) => {
      return likeService.getAllRelatedLikes(comment.id, 'comments');
    },
  };
}

export {
  createCommentTypeResolver,
};
