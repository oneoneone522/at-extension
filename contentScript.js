// ContentScript can directly access the content of web pages.

//function: 
function checkAndClickNotification() {
    const notification = document.getElementsByClassName("at-notification at-notification-student-recommend right")[0];
    const tester_notif = document.getElementsByClassName("at-notification at-notification__current-message right")[0]

    if (notification) {
        notification.click();
        console.log("Notification clicked!");
        const card = getElementsByClassName("v-card__actions");
        if (card) {
            console.log("Card element caught!");
            const send_btn = document.getElementsByClassName("button is-secondary")[0];
            if (send_btn) {
                send_btn.click();
                chrome.runtime.sendMessage({type: "MESSAGE_SENT" });
                chrome.runtime.sendMessage({type: "UPDATE_COUNTER"});// If text is sent to the student, send a message to background script
            }
            return true;
        }
        const send_btn = document.getElementsByClassName("button is-secondary")[0];
            if (send_btn) {
                send_btn.click();
                chrome.runtime.sendMessage({type: "MESSAGE_SENT" });
                chrome.runtime.sendMessage({type: "UPDATE_COUNTER"});// If text is sent to the student, send a message to background script
            }
            return true;
        
        
    }
    else if (tester_notif) {
        tester_notif.click();
        //Tell background that the tester was found.
        chrome.runtime.sendMessage({type: "TESTER_FOUND"});
        console.log("tester clicked!");

        return true;
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
        else if (message.type === "NEW_TESTER_CHECK") {
            const tester_success = checkAndClickNotification();
            if(!tester_success) {
                console.log("No tester found at this moment.");
            }
        }
    }
    
});

//SetInterval: 
setInterval(() => {
    const success = checkAndClickNotification();
    const tester_success = checkAndClickNotification();
    if (!success) {
        console.log("No notification found during periodic check.");
    }
    else if (!tester_success) {
        console.log("No tester found during periodic check.");
    }
}, 2000);