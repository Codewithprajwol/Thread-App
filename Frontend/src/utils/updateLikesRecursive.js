export function updateLikesRecursive(replies, replyId, userId, liked) {
    return replies.map((reply) => {
      if (reply._id === replyId) {
        return {
          ...reply,
          likes: liked
            ? reply.likes.filter((id) => id !== userId)
            : [...reply.likes, userId],
        };
      }
      if (reply.children && reply.children.length > 0) {
        return {
          ...reply,
          children: updateLikesRecursive(reply.children, replyId, userId, liked),
        };
      }
      return reply;
    });
  }
  