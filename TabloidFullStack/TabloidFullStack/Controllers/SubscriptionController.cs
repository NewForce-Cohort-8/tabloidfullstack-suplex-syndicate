using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        //private readonly ITagRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;

        public SubscriptionController(ISubscriptionRepository subscriptionRepository)
        {
            //_tagProfileRepository = tagProfileRepository;
            _subscriptionRepository = subscriptionRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_subscriptionRepository.GetAll());
        }

        [HttpGet("GetSubscribedPosts/{subscriberUserProfileId}")]
        public IActionResult Get(int subscriberUserProfileId)
        {
            return Ok(_subscriptionRepository.GetSubscribedPosts(subscriberUserProfileId));
        }

        [HttpGet("{id}")]
        public IActionResult GetPosts(int id)
        {
            var subscription = _subscriptionRepository.GetById(id);
            if (subscription == null)
            {
                return NotFound();
            }
            return Ok(subscription);
        }

        [HttpGet("GetByProviderId/{subscriberId}/{providerId}")]
        public IActionResult Get(int subscriberId, int providerId)
        {
            var subscription = _subscriptionRepository.GetByProviderId(subscriberId, providerId);
            if (subscription == null)
            {
                return NotFound();
            }
            return Ok(subscription);
        }

        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            _subscriptionRepository.Add(subscription);
            return CreatedAtAction("Get", new { id = subscription.Id }, subscription);
        }
    }
}
