using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;
using static TabloidFullStack.Repositories.PostRepository;

namespace TabloidFullStack.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    //We need to add actual category after its model is created
                    cmd.CommandText = @"
                    SELECT p.Id AS PostId, p.Title, p.CategoryId, p.Content, p.ImageLocation AS HeaderImage, p.CreateDateTime, p.PublishDateTime, p.IsApproved, 

                     up.Id AS AuthorId, up.DisplayName AS AuthorDisplayName, up.FirstName AS AuthorFirstName, up.LastName AS AuthorLastName, up.Email, up.CreateDateTime AS AuthorCreateDateTime, up.ImageLocation AS AuthorImage

                            FROM Post p
                            LEFT JOIN UserProfile up ON p.UserProfileId = up.id
                            WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                            ORDER BY PublishDateTime DESC;
                    ";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "HeaderImage"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = DbUtils.IsDbNull(reader, "IsApproved"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "AuthorId"),
                                DisplayName = DbUtils.GetString(reader, "AuthorDisplayName"),
                                ImageLocation = DbUtils.GetString(reader, "AuthorImage"),
                                FirstName = DbUtils.GetString(reader, "AuthorFirstName"),
                                LastName = DbUtils.GetString(reader, "AuthorLastName"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "AuthorCreateDateTime")
                            },
                        });
                    }
                    reader.Close();

                    return posts;
                }
            }
        }

        public Post GetById(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id AS PostId, p.Title, p.CategoryId, p.Content, p.ImageLocation AS HeaderImage, p.CreateDateTime, p.PublishDateTime, p.IsApproved, 

                     up.Id AS AuthorId, up.DisplayName AS AuthorDisplayName, up.FirstName AS AuthorFirstName, up.LastName AS AuthorLastName, up.Email, up.CreateDateTime AS AuthorCreateDateTime, up.ImageLocation AS AuthorImage

                            FROM Post p
                            LEFT JOIN UserProfile up ON p.UserProfileId = up.id
                            WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME() 
                            AND p.Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    if (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "HeaderImage"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = DbUtils.IsDbNull(reader, "IsApproved"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "AuthorId"),
                                DisplayName = DbUtils.GetString(reader, "AuthorDisplayName"),
                                ImageLocation = DbUtils.GetString(reader, "AuthorImage"),
                                FirstName = DbUtils.GetString(reader, "AuthorFirstName"),
                                LastName = DbUtils.GetString(reader, "AuthorLastName"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "AuthorCreateDateTime")
                            }
                        };
                    }
                    reader.Close();
                    return post;


                }
            }
        }



    }
}
