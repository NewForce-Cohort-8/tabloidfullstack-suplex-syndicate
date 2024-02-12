using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly IPostTagRepository _postTagRepository;

        public PostTagController(IPostTagRepository postTagRepository)
        {
            //_tagProfileRepository = tagProfileRepository;
            _postTagRepository = postTagRepository;
        }

        [HttpGet("GetTagsByPost/{postId}")]
        public IActionResult GetAll(int postId)
        {
            return Ok(_postTagRepository.GetAllPostTagsByPostId(postId));

        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var postTag = _postTagRepository.GetById(id);
            if (postTag == null)
            {
                return NotFound();
            }
            return Ok(postTag);
        }
        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            _postTagRepository.Add(postTag);
            return CreatedAtAction("Get", new { id = postTag.Id }, postTag);
        }
    }
}
