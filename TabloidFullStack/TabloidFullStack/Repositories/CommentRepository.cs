
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Comment> GetCommentsByPostId(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime,
                    up.Id, up.FirstName, up.LastName
                    FROM Comment c
                    LEFT JOIN UserProfile up ON up.Id = c.UserProfileId
                    WHERE c.PostId = @postId
                    ORDER BY c.CreateDateTime DESC;
                    ";

                    DbUtils.AddParameter(cmd, "@postId", postId);

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        var comment = new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = postId,
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                            },
                        };
                        comments.Add(comment);

                    }
                    reader.Close();
                    return comments;
                }
            }
        }
    }
}
