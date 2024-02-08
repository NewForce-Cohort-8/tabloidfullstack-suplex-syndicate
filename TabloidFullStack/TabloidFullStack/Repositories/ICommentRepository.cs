using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetCommentsByPostId(int postId);

        Comment GetCommentById(int id);
        void Add(Comment comment);
        void Delete(int id);
    }
}