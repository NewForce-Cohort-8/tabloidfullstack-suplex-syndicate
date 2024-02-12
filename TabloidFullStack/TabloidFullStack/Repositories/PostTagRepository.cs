using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration configuration) : base(configuration) { }

        public List<PostTag> GetAllPostTagsByPostId(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT pt.Id as PostTagId, pt.PostId, pt.TagId, t.Id, t.Name 
                        FROM PostTag pt
                        LEFT JOIN Tag t ON t.Id = pt.TagId
                        WHERE pt.PostId = @postId
                        ORDER BY Name";

                    DbUtils.AddParameter(cmd, "@postId", postId);

                    var postTags = new List<PostTag>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        PostTag postTag = new PostTag()
                        {
                            Id = DbUtils.GetInt(reader, "PostTagId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            TagId = DbUtils.GetInt(reader, "TagId"),
                        };
                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            postTag.Tag = new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Name = DbUtils.GetString(reader, "Name")
                            };

                            postTags.Add(postTag);
                        }

                    }

                    reader.Close();
                    return postTags;
                }
            }

        }
        public PostTag GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT pt.Id as PostTagId, pt.PostId, pt.TagId, t.Id, t.Name 
                        FROM PostTag pt
                        LEFT JOIN Tag t ON t.Id = pt.TagId
                        WHERE pt.Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);

                    PostTag postTag = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        postTag = new PostTag()
                        {
                            Id = DbUtils.GetInt(reader, "PostTagId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            TagId = DbUtils.GetInt(reader, "TagId"),
                        };
                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            postTag.Tag = new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Name = DbUtils.GetString(reader, "Name")
                            };
                        };

                    }
                    reader.Close();
                    return postTag;
                }
            }
        }
        public void Add(PostTag postTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PostTag (PostId, TagId) OUTPUT INSERTED.ID VALUES (@PostId, @TagId)";

                    DbUtils.AddParameter(cmd, "@PostId", postTag.PostId);
                    DbUtils.AddParameter(cmd, "@TagId", postTag.TagId);
                    postTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
