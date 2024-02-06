using TabloidFullStack.Models;
using TabloidFullStack.Utils;


namespace TabloidFullStack.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration) { }


        //Return all tags as a list
        public List<Tag> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name FROM Tag ORDER BY Name";

                    var tags = new List<Tag>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Tag tag = new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                        };

                        tags.Add(tag);
                    }

                    reader.Close();
                    return tags;
                }
            }
        }

        public void Add(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Tag (Name) OUTPUT INSERTED.ID VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", tag.Name);
                    tag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
