﻿using System.ComponentModel.DataAnnotations;

namespace TabloidFullStack.Models
{
    public class Post
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public string? ImageLocation { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }
        
        public DateTime? PublishDateTime { get; set; }

        [Required] 
        public bool IsApproved { get; set; }


        [Required]
        public int CategoryId { get; set; }
        public Category? Category { get; set; }



        [Required]
        public int UserProfileId { get; set; }

        public UserProfile? UserProfile { get; set; }

    }
}
