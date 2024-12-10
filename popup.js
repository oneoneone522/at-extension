// used to determine if the popup is being opened 
// on the correct page (amazingtalker.com/dashboard/teacher).
import {getActiveTabURL} from "./utils.js"

//What is "count": 
//What is "counter": the "counter" is the number element that show on the popup.html
//What is this viewCounter doing?: 

// Initial Setup: DOMContentLoaded Listener
//Check if the active tab is on the specified domain (amazingtalker.com/dashboard/teacher).
//If it is, update the UI elements (counter and tester) using the viewCounter and viewTesterCount functions.
//If not, display a message saying the page is not relevant.
document.addEventListener("DOMContentLoaded", async() =>{
    const activeTab = await getActiveTabURL();
    if (activeTab.url.includes("amazingtalker.com/dashboard/teacher")) {
        // Request the counter from background.js
        chrome.runtime.sendMessage({ type: "GET_COUNTER" }, (response) => {
            if (response && response.count !== undefined) {
                viewCounter(response.count);
            } else {
                console.error("Failed to fetch counter:", chrome.runtime.lastError);
            }
        });        
        // Request the tester count from background.js
        chrome.runtime.sendMessage({ type: "GET_TESTER" }, (response) => {
            if (response && response.testerCount !== undefined) {
                viewTesterCount(response.testerCount);
            } else {
                console.error("Failed to fetch tester count:", chrome.runtime.lastError);
            }
        });
        
    }
    else {
        const container = document.getElementsByClassName("container")[0];
        container.innerHTML = '<div class="title">This is not a AT tutor page.</div>'
    }
})


chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "UPDATE_COUNTER") {
        const counter = document.getElementById("counter");
        counter.textContent = message.count;
    }
    else if (message.type === "UPDATE_TESTER_COUNTER") {
        const tester = document.getElementById("tester");
        tester.textContent = message.testerCount;
    }
})
const viewCounter = (count) => {
    const counterElement = document.getElementById("counter");
    counterElement.innerHTML = 0;
    if (count > 0) {
        counterElement.innerHTML = count;
    }
    
}
const viewTesterCount = (testerCount) => {
    const testerElement = document.getElementById("tester");
    testerElement.innerHTML = 0;
    if(testerCount > 0) {
        testerElement.innerHTML = testerCount;
    }
}