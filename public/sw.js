// public/sw.js
self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || "Time to measure your blood pressure!",
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      vibrate: [200, 100, 200],
      tag: "bp-reminder",
      renotify: true,
      actions: [
        {
          action: "open",
          title: "Open App",
          icon: "/icon-192.png",
        },
        {
          action: "later",
          title: "Remind Later",
          icon: "/icon-192.png",
        },
      ],
    };

    event.waitUntil(
      self.registration.showNotification(data.title || "BP Reminder", options)
    );
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  if (event.action === "open") {
    event.waitUntil(clients.openWindow("/"));
  } else {
    // Default: open app
    event.waitUntil(clients.openWindow("/"));
  }
});

// Schedule recurring 6-hour reminders
self.addEventListener("install", (event) => {
  self.skipWaiting();
  scheduleReminders();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  scheduleReminders();
});

function scheduleReminders() {
  // Clear old alarms
  self.registration.periodicSync.unregister("bp-reminder").catch(() => {});

  // Register new periodic sync every 6 hours
  self.registration.periodicSync
    .register("bp-reminder", {
      minInterval: 6 * 60 * 60 * 1000, // 6 hours in milliseconds
    })
    .catch((err) => {
      console.log("Periodic sync not supported or failed:", err);
    });
}

// Handle periodic sync (this triggers every 6 hours)
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "bp-reminder") {
    event.waitUntil(
      self.registration.showNotification("BP Reminder", {
        body: "It's time to measure your blood pressure!",
        icon: "/icon-192.png",
        badge: "/icon-192.png",
        vibrate: [200, 100, 200],
        tag: "bp-reminder",
        renotify: true,
      })
    );
  }
});
