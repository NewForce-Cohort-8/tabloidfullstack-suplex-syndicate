using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        List<Post> GetAll();

        List<Post> GetAllUnapprovedPosts();
        Post GetById(int id);
        List<Post> GetPostByAuthor(int userProfileId);
    }
}