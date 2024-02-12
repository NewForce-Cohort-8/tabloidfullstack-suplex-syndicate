using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostTagRepository
    {
        List<PostTag> GetAllPostTagsByPostId(int postId);
        PostTag GetById(int id);
        void Add(PostTag postTag);
    }
}