using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {
        public SubscriptionRepository(IConfiguration configuration) : base(configuration) { }


        public List<Subscription> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id, s.SubscriberId, s.ProviderId, s.BeginDateTime, s.EndDateTime,

                        FROM Subscription s
                    ;";

                    var subscriptions = new List<Subscription>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Subscription subscription = new Subscription()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SubscriberId = DbUtils.GetInt(reader, "SubscriberId"),
                            ProviderId = DbUtils.GetInt(reader,"ProviderId"),
                            BeginDateTime = DbUtils.GetDateTime(reader, "BeginDateTime"),
                            EndDateTime = DbUtils.GetDateTime(reader, "EndDateTime")
                        };

                        subscriptions.Add(subscription);
                    }

                    reader.Close();
                    return subscriptions;
                }
            }
        }

        public Subscription GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id, s.SubscriberId, s.ProviderId, s.BeginDateTime, s.EndDateTime,

                        FROM Subscription s 
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Subscription subscription = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        subscription = new Subscription()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SubscriberId = DbUtils.GetInt(reader, "SubscriberId"),
                            ProviderId = DbUtils.GetInt(reader, "ProviderId"),
                            BeginDateTime = DbUtils.GetDateTime(reader, "BeginDateTime"),
                            EndDateTime = DbUtils.GetDateTime(reader, "EndDateTime")
                        };

                    }
                    reader.Close();
                    return subscription;
                }
            }
        }

        public void Add(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Subscription (SubscriberId, ProviderId, BeginDateTime, EndDateTime) OUTPUT INSERTED.ID VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@SubscriberId", subscription.SubscriberId);
                    DbUtils.AddParameter(cmd, "@ProviderId", subscription.ProviderId);
                    DbUtils.AddParameter(cmd, "@BeginDateTime", subscription.BeginDateTime);
                    DbUtils.AddParameter(cmd, "@EndDateTime", subscription.EndDateTime);
                    subscription.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
