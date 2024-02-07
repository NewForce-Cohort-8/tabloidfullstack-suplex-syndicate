using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        //private readonly ICommentRepository;
        private readonly ICommentRepository _commentRepository;

        public CommentController(ICommentRepository commentRepository)
        {
            //_commentProfileRepository = commentProfileRepository;
            _commentRepository = commentRepository;
        }

        [HttpGet("{postId}")]
        public IActionResult Get(int postId)
        {
            return Ok(_commentRepository.GetCommentsByPostId(postId));
        }
    }
}
