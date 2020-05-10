let btn = document.getElementById("more");
btn.addEventListener("click", function () {
    chrome.tabs.create({ url: "https://trackcovidvirus.netlify.app/" });
});
