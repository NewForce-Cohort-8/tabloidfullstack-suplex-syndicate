using System.ComponentModel.DataAnnotations;

namespace TabloidFullStack.Models
{
    public class Subscription
    {
        public int Id { get; set; }

        public int SubscriberId { get; set; }

        public int ProviderId {  get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime EndDateTime { get; set; }   
    }
}
