using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ISubscriptionRepository
    {
        List<Subscription> GetAll();
        Subscription GetById(int id);
        void Add(Subscription subscription);
    }
}