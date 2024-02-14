using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ISubscriptionRepository
    {
        List<Subscription> GetAll();
        Subscription GetById(int id);
        Subscription GetByProviderId(int subscriberId, int providerId);
        void Add(Subscription subscription);
    }
}