function checkAndClickNotification() {
    const notification = document.getElementsByClassName("at-notification at-notification-student-recommend right")[0];
    const tester = document.getElementsByClassName("at-notification at-notification__current-message right")[0]

    if (notification) {
        notification.click();
        console.log("Notification clicked!");
        const send_btn = document.querySelector("");
        if (send_btn) {
            send_btn.click();
            chrome.runtime.sendMessage({type: "MESSAGE_SENT" });
        }
        return true;
    }
    else if (tester) {
        tester.click();
        console.log("tester clicked!");
    }
    return false;
    
}
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "NEW_NOTIFICATION_CHECK") {
        // Perform the check-and-click action
        const success = checkAndClickNotification();
        if (!success) {
            console.log("No notification found at this moment.");
        }
    }
});
setInterval(() => {
    const success = checkAndClickNotification();
    if (!success) {
        console.log("No notification found during periodic check.");
    }
}, 2000);