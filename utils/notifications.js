import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Permission for notifications not granted!");
      return false;
    }
    return true;
  } else {
    alert("Must use physical device for notifications");
    return false;
  }
}

export async function scheduleNotification(name, time) {
  const isAllowed = await registerForPushNotificationsAsync();
  if (!isAllowed) return;

  // 🎯 Merr orën nga input-i (p.sh. "08:30 PM")
  const match = time.match(/(\d+):(\d+)\s?(AM|PM)/i);
  if (!match) {
    console.warn("Invalid time format");
    return;
  }

  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const ampm = match[3].toUpperCase();
  if (ampm === "PM" && hours !== 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;

  // 🕓 Llogarit datën e ardhshme për atë orë
  const now = new Date();
  const triggerDate = new Date();
  triggerDate.setHours(hours, minutes, 0, 0);

  // nëse ora ka kaluar për sot, cakto për nesër
  if (triggerDate <= now) {
    triggerDate.setDate(triggerDate.getDate() + 1);
  }

  // 🕒 Planifiko njoftimin vetëm për atë datë/orar
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "💊 Medicine Reminder",
      body: `Time to take the medicine: ${name}`,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: triggerDate, // ⏰ kjo është thelbësore — përdorim direkt 'date', jo 'hour/minute'
  });

  console.log(`✅ Notification scheduled for ${name} at ${triggerDate}`);
}
