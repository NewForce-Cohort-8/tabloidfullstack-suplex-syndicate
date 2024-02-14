using Microsoft.Extensions.Hosting;
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

        public List<Post> GetSubscribedPosts(int subscriberUserProfileId) {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id, s.SubscriberUserProfileId, s.ProviderUserProfileId, s.BeginDateTime, s.EndDateTime,

                        p.Id as SubscribedPostId, p.Title, p.CategoryId, p.Content, p.ImageLocation AS HeaderImage, 
                        p.CreateDateTime, p.PublishDateTime, p.IsApproved,

                        
                        c.Id as CategoryCategoryId, c.Name as CategoryName,
                           
                        up.Id AS AuthorId, up.DisplayName AS AuthorDisplayName, up.FirstName AS AuthorFirstName, 
                        up.LastName AS AuthorLastName, up.Email, up.CreateDateTime AS AuthorCreateDateTime, 
                        up.ImageLocation AS AuthorImage,

                        pt.Id AS PostTagId, pt.PostId AS PostTagPostId, pt.TagId AS PostTagTagId,
                           
                        t.Id as TagId, t.Name as TagName

                        FROM Subscription s
                        LEFT JOIN Post p ON p.UserProfileId = s.ProviderUserProfileId
                        LEFT JOIN Category c ON p.CategoryId = c.id
                        LEFT JOIN UserProfile up ON p.UserProfileId = up.id
                        LEFT JOIN PostTag pt ON p.Id = pt.PostId
                        LEFT JOIN Tag t ON pt.TagId = t.Id 

                        
                        WHERE s.SubscriberUserProfileId = @subscriberUserProfileId 
                        AND IsApproved = 1 
                        AND PublishDateTime < SYSDATETIME()
                        ORDER BY PublishDateTime DESC
                    ;";

                    DbUtils.AddParameter(cmd, "@subscriberUserProfileId", subscriberUserProfileId);

                    var subscribedPosts = new List<Post>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var postId = DbUtils.GetInt(reader, "SubscribedPostId");
                        var existingPost = subscribedPosts.FirstOrDefault(p => p.Id == postId);
                        if (existingPost == null)
                        {
                            existingPost = new Post()
                            {
                                Id = postId,
                                Title = DbUtils.GetString(reader, "Title"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                Category = new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryId"),
                                    Name = DbUtils.GetString(reader, "CategoryName")
                                },
                                Content = DbUtils.GetString(reader, "Content"),
                                ImageLocation = DbUtils.GetString(reader, "HeaderImage"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                                IsApproved = DbUtils.IsDbNull(reader, "IsApproved"),
                                UserProfileId = DbUtils.GetInt(reader, "AuthorId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "AuthorId"),
                                    DisplayName = DbUtils.GetString(reader, "AuthorDisplayName"),
                                    ImageLocation = DbUtils.GetString(reader, "AuthorImage"),
                                    FirstName = DbUtils.GetString(reader, "AuthorFirstName"),
                                    LastName = DbUtils.GetString(reader, "AuthorLastName"),
                                    CreateDateTime = DbUtils.GetDateTime(reader, "AuthorCreateDateTime")
                                },
                                Tags = new List<Tag>()
                            };
                            subscribedPosts.Add(existingPost);
                        }
                        if (DbUtils.IsNotDbNull(reader, "PostTagId"))
                        {
                            existingPost.Tags.Add(new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Name = DbUtils.GetString(reader, "TagName"),
                            });
                        }

                        
                    }

                    reader.Close();
                    return subscribedPosts;
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
