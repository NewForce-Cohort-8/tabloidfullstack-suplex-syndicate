
using TabloidFullStack.Models;
using TabloidFullStack.Utils;


namespace TabloidFullStack.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }


        //Return all categories as a list
        public List<Category> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name FROM Category ORDER BY Name";

                    var categories = new List<Category>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Category category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                        };

                        categories.Add(category);
                    }

                    reader.Close();
                    return categories;
                }
            }
        }
        public void Add(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Category (Name) OUTPUT INSERTED.ID VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", category.Name);
                    category.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}