using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostTagRepository
    {
        List<PostTag> GetAllPostTagsByPostId(int postId);
        PostTag GetById(int id);
        PostTag GetByTagIdAndPostId(int tagId, int postId);
        void Add(PostTag postTag);
        void Delete(int id);
    }
}