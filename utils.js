// The util.js file contains a set of JavaScript utility functions that are used across multiple
export async function getActiveTabURL() {
    let queryOptions = {active: true, currentWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}