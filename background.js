// Background Script:
// monitor and react to events in the browser, 
// such as navigating to a new page, removing a bookmark, or closing a tab.
let stuCount = 0;

//Add a listener to the event(a message sent to the background script 
// via the Chrome Extension's chrome.runtime.sendMessage API.)
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "MESSAGE_SENT") {
        stuCount ++;
        console.log('Message sent: Total count: ${stuCount}');
        chrome.runtime.sendMessage({type: "UPDATE_COUNTER", count: stuCount });
    }
});

//sendResponse: 
//Why return true?: 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GET_COUNTER") {
        sendResponse({count: stuCount});
        return true;
    }
});
// sets up an event listener for the chrome.tabs.onUpdated event, 
// which is triggered whenever a tab's properties (like its URL) are updated.
chrome.tabs.onUpdated.addListener((tabId,tab) => {
    if (tab.url && tab.url.includes("amazingtalker.com/dashboard/teacher")) {
        chrome.tabs.sendMessage(tabId, {
            type: "NEW_NOTIF_CHECK",
        });
    }
        
});
