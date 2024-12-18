// ContentScript can directly access the content of web pages.

//function: 
function checkAndClickNotification() {
    const notification = document.getElementsByClassName("at-notification at-notification-student-recommend right")[0];

    if (notification) {
        notification.click();
        console.log("Notification clicked!");
        const card = getElementsByClassName("v-card__actions");
        if (card) {
            const send_btn = document.getElementsByClassName("button is-secondary")[0];
            if (send_btn) {
                send_btn.click();
                chrome.runtime.sendMessage({type: "MESSAGE_SENT" });
                chrome.runtime.sendMessage({type: "UPDATE_COUNTER"});// If text is sent to the student, send a message to background script
            }
            return true;
        }   
    }
    return false;
    
}
// runtime.onMessage: in a content script, to listen for messages from a background script.
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "NEW_NOTIF_CHECK") {
        // 1. The function checkAndClickNotification is executed.
        // 2. Its return value is assigned to the constant success.
        const success = checkAndClickNotification();
        if (!success) {
            console.log("No notification found at this moment.");
        }
    }
    
});

//SetInterval: 
setInterval(() => {
    const success = checkAndClickNotification();
    if (!success) {
        console.log("No notification found during periodic check.");
    }
}, 2000);