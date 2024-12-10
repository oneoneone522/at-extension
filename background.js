let stuCount = 0;
let messageCount = 0;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "MESSAGE_SENT") {
        stuCount ++;
        console.log('Message sent: Total count: ${stuCount}');
        chrome.runtime.sendMessage({type: "UPDATE_COUNTER", count: stuCount });
    } else if (message.type === "TESTER_FOUND") {
        messageCount ++;
        console.log('Tester found: Total count; ${messageCount}');
        chrome.runtime.sendMessage({type: "UPDATE_TESTER_COUNTER", testerCount: messageCount});
    } else if (message.type === "GET_COUNTER") {
        sendResponse({count: stuCount});
    } else if(message.type === "GET_TESTER") {
        sendResponse({testerCount: messageCount });
    }
});

// sets up an event listener for the chrome.tabs.onUpdated event, 
// which is triggered whenever a tab's properties (like its URL) are updated.
chrome.tabs.onUpdated.addListener((tabId,tab) => {
    if (tab.url && tab.url.includes("amazingtalker.com/dashboard/teacher")) {
        chrome.tabs.sendMessage(tabId, {
            type: "NEW_NOTIF_CHECK",
        });
        chrome.tabs.sendMessage(tabId, {
            type: "NEW_TESTER_CHECK",
        })
    }
        
});
