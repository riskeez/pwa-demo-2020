using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebPushDemo.Models
{
    public class SubscriptionModel
    {
        public string endpoint { get; set; }
        public Keys keys { get; set; }
    }

    public class Keys
    {
        public string p256dh { get; set; }
        public string auth { get; set; }
    }
}
