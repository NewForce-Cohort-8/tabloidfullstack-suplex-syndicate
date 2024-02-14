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
                        SELECT s.Id, s.SubscriberUserProfileId, s.ProviderUserProfileId, s.BeginDateTime, s.EndDateTime

                        FROM Subscription s
                    ;";

                    var subscriptions = new List<Subscription>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Subscription subscription = new Subscription()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SubscriberUserProfileId = DbUtils.GetInt(reader, "SubscriberUserProfileId"),
                            ProviderUserProfileId = DbUtils.GetInt(reader,"ProviderUserProfileId"),
                            BeginDateTime = DbUtils.GetDateTime(reader, "BeginDateTime"),
                            EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime")
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
                        SELECT s.Id, s.SubscriberUserProfileId, s.ProviderUserProfileId, s.BeginDateTime, s.EndDateTime

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
                            SubscriberUserProfileId = DbUtils.GetInt(reader, "SubscriberUserProfileId"),
                            ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId"),
                            BeginDateTime = DbUtils.GetDateTime(reader, "BeginDateTime"),
                            EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime")
                        };

                    }
                    reader.Close();
                    return subscription;
                }
            }
        }

        public Subscription GetByProviderId(int subscriberId, int providerId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id, s.SubscriberUserProfileId, s.ProviderUserProfileId, s.BeginDateTime, s.EndDateTime

                        FROM Subscription s 
                        WHERE SubscriberId = @subscriberId AND ProviderId = @providerId";

                    DbUtils.AddParameter(cmd, "@subscriberid", subscriberId);
                    DbUtils.AddParameter(cmd, "@providerId", providerId);

                    Subscription subscription = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        subscription = new Subscription()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SubscriberUserProfileId = DbUtils.GetInt(reader, "SubscriberUserProfileId"),
                            ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId"),
                            BeginDateTime = DbUtils.GetDateTime(reader, "BeginDateTime"),
                            EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime")
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
                    cmd.CommandText = @"INSERT INTO Subscription (SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime, EndDateTime) OUTPUT INSERTED.ID VALUES (@SubscriberUserProfileId, @ProviderUserProfileId, @BeginDateTime, @EndDateTime)";

                    DbUtils.AddParameter(cmd, "@SubscriberUserProfileId", subscription.SubscriberUserProfileId);
                    DbUtils.AddParameter(cmd, "@ProviderUserProfileId", subscription.ProviderUserProfileId);
                    DbUtils.AddParameter(cmd, "@BeginDateTime", subscription.BeginDateTime);
                    DbUtils.AddParameter(cmd, "@EndDateTime", subscription.EndDateTime);
                    subscription.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
