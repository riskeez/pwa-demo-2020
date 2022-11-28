using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebPush;
using WebPushDemo.Models;

namespace WebPushDemo.Controllers
{
    public class WebPushController : Controller
    {
        private readonly IConfiguration _configuration;

        private readonly WebPushDemoContext _context;

        public WebPushController(WebPushDemoContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public IActionResult Send(int? id)
        {
            return View();
        }

        [HttpPost, ActionName("Send")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Send(int id)
        {
            var payload = Request.Form["payload"];
            var device = await _context.Devices.SingleOrDefaultAsync(m => m.Id == id);

            string vapidPublicKey = _configuration.GetSection("VapidKeys")["PublicKey"];
            string vapidPrivateKey = _configuration.GetSection("VapidKeys")["PrivateKey"];

            var pushSubscription = new PushSubscription(device.PushEndpoint, device.PushP256DH, device.PushAuth);
            var vapidDetails = new VapidDetails("mailto:example@example.com", vapidPublicKey, vapidPrivateKey);

            var webPushClient = new WebPushClient();
            webPushClient.SendNotification(pushSubscription, payload, vapidDetails);

            return View();
        }

        [HttpGet]
        public IActionResult SendToAll()
        {
            return View();
        }

        [HttpPost, ActionName("SendToAll")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SendPushToAll()
        {
            var payload = Request.Form["payload"];

            string vapidPublicKey = _configuration.GetSection("VapidKeys")["PublicKey"];
            string vapidPrivateKey = _configuration.GetSection("VapidKeys")["PrivateKey"];
            var vapidDetails = new VapidDetails("mailto:some-email", vapidPublicKey, vapidPrivateKey);

            var webPushClient = new WebPushClient();
            foreach (var device in _context.Devices)
            {
                var pushSubscription = new PushSubscription(device.PushEndpoint, device.PushP256DH, device.PushAuth);

                await webPushClient.SendNotificationAsync(pushSubscription, payload, vapidDetails);
            }

            return RedirectToAction(nameof(Index), "Devices");
        }


        [HttpPost("subscribe")]
        public async Task<IActionResult> Subscribe([FromBody] SubscriptionModel subscription)
        {

            var existingDevice = await _context.Devices.FirstOrDefaultAsync(x => x.PushAuth.Equals(subscription.keys.auth));
            if (existingDevice == null)
            {
                var sub = new Devices()
                {
                    Name = Guid.NewGuid().ToString(),
                    PushAuth = subscription.keys.auth,
                    PushEndpoint = subscription.endpoint,
                    PushP256DH = subscription.keys.p256dh
                };

                _context.Add(sub);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        public IActionResult GenerateKeys()
        {
            var keys = VapidHelper.GenerateVapidKeys();
            ViewBag.PublicKey = keys.PublicKey;
            ViewBag.PrivateKey = keys.PrivateKey;
            return View();
        }
    }
}