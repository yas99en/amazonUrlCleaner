window.onload = () => {
    'use strict';

    // navigator.serviceWorker.register('./sw.js');

    var cleanButton = document.getElementById("clean");
    var resultLink = document.getElementById("resultLink");
    var errorArea = document.getElementById("errorArea");

    cleanButton.addEventListener("click", async e => {
        cleanURL();
    });

    async function cleanURL() {
        resultLink.style.display = "";
        errorArea.style.display = "none";
        
        if(!document.hasFocus()) {
            resultLink.style.display = "none";
            errorArea.style.display = "";
            errorArea.textContent = "Not Focused";
            errorArea.href = "";
            return;
        }

        var text = await navigator.clipboard.readText()

        var regex = /https:\/\/www.amazon.co.jp\/([^/]*\/)?dp\/([^/]*)(\/.*)?/
        var matched = text.match(regex);
        if(!matched) {
            resultLink.style.display = "none";
            errorArea.style.display = "";
            errorArea.textContent = "No Match";
            errorArea.href = "";
            return;
        }
        var replaced = "https://www.amazon.co.jp/dp/"+matched[2]
        resultLink.textContent = replaced;
        resultLink.href = replaced;
        if(document.hasFocus()) {
            navigator.clipboard.writeText(replaced);
        }
    }

    cleanURL();
}
