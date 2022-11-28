importScripts('./ngsw-worker.js');

const cacheName = 'pwa-cache-v1';

self.addEventListener('install', (e) => {
    swLog('Install');
});

addEventListener('fetch', event => {
    // Prevent the default, and handle the request ourselves.
    event.respondWith(async function () {
        // Try to get the response from a cache.
        const cachedResponse = await caches.match(event.request);
        // Return it if we found one.
        if (cachedResponse) return cachedResponse;
        // If we didn't find a match in the cache, use the network.
        return fetch(event.request);
    }());
});

// Push notifications
self.addEventListener('push', event => {
    const notification = event.data.json();

    const title = notification.title;
    const options = {
        body: notification.body,
        icon: 'assets/icons/icon-72x72.png',
        badge: 'assets/icons/icon-72x72.png',
        vibrate: [300, 100, 400],
        actions: [
            {
                action: "showclick",
                title: "Click Me!"
            }
        ]
    };

    swLog(`Push received and had this data: "${event.data.text()}"`);

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
    swLog('Notification click Received.');

    // event.notification.close();

    var payload = event.notification.data;
    if (event.action && payload.actions && payload.actions.includes(event.action) && clients.openWindow && event.notification.data.url) {
        event.waitUntil(clients.openWindow(event.notification.data.url));
    }
});

// Logging
function swLog(eventName, event) {
    console.log('[Service Worker] ' + eventName);
    if (event) {
        console.log(event);
    }
}
