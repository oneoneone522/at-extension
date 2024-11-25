import {getActiveTabURL} from "./utils.js"

// const updateCounter = (count) => {
    
// };

const viewCounter = (count) => {
    const counterElement = document.getElementById("counter");
    counterElement.innerHTML = 0;
    if (count > 0) {
        counterElement.innerHTML = count;
    }
}

document.addEventListener("DOMContentLoaded", async() =>{
    const activeTab = await getActiveTabURL();
    if (activeTab.url.includes("amazingtalker.com/dashboard/teacher")) {
        const count = document.getElementById("counter");
        viewCounter(count);
    }
    else {
        const container = document.getElementsByClassName("container")[0];
        container.innerHTML = '<div class="title">This is not a AT tutor page.</div>'
    }
})

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "UPDATE_COUNTER") {
        const counter = document.getElementById("counter");
        counter.textContent = counter;
    }
})