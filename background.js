let stuCount = 0;
let testerCount = 0;

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "MESSAGE_SENT") {
        stuCount ++;
        console.log('Message sent: Total count: ${stuCount}');
        chrome.runtime.sendMessage({type: "UPDATE_COUNTER", count: stuCount });
    }
    else if (message.type === "TESTER_FOUND") {
        testerCount ++;
        console.log('Tester found: Total count; ${testerCount}');
        chrome.runtime.sendMessage({type: "UPDATE_COUNTER", count: testerCount});
    }
});

chrome.runtime.onMessage.addListener((message, sendResponse) => {
    if (message.type === "GET_COUNTER") {
        sendResponse({count: stuCount});
    }
    else if (message.type === "GET_TESTER") {
        sendResponse({count:testerCount});
    }
});
chrome.tabs.onUpdated.addListener((tabId,tab) => {
    if (tab.url && tab.url.includes("amazingtalker.com/dashboard/teacher")) {
        chrome.tabs.sendMessage(tabId, {
            type: "NEW_NOTIF_CHECK",
        });
    }
        
});
