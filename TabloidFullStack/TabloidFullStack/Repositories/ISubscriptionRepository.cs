using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ISubscriptionRepository
    {
        List<Subscription> GetAll();
        List<Post> GetSubscribedPosts(int subscriberUserProfileId);
        Subscription GetById(int id);
        Subscription GetByProviderId(int subscriberId, int providerId);
        void Add(Subscription subscription);
        void Update(Subscription subscription);
    }
}