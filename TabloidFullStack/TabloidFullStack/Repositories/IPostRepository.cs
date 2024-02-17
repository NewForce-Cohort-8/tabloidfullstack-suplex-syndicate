using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        List<Post> GetAll();
        Post GetById(int id);

        void Update(Post post);
        List<Post> GetPostByAuthor(int userProfileId);
    }
}