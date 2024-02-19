using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        List<Post> GetAll();
        Post GetById(int id);
<<<<<<<<< Temporary merge branch 1

        void Update(Post post);
        List<Post> GetPostByAuthor(int userProfileId);
        void DeletePost(int postId);
    }
}