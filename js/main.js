window.onload = () => {
    'use strict';

    // navigator.serviceWorker.register('./sw.js');

    var cleanButton = document.getElementById("clean");
    var resultLink = document.getElementById("resultLink");
    var errorArea = document.getElementById("errorArea");

    var patterns = [
        { regex: /https:\/\/www.amazon.co.jp\/([^/]*\/)?dp\/([^?/]*)(.*)?/, index: 2 },
        { regex: /https:\/\/www.amazon.co.jp\/gp\/aw\/d\/([^?/]*)(\/.*)?/, index: 1 },
        { regex: /https:\/\/www.amazon.co.jp\/gp\/product\/([^/]*)(\/.*)?/, index: 1 },
        { regex: /https:\/\/www.amazon.co.jp\/exec\/obidos\/ASIN\/([^/]*)(\/.*)?/, index: 1},
        { regex: /https:\/\/www.amazon.co.jp\/o\/ASIN\/([^/]*)(\/.*)?/, index: 1},
    ];
    function getAsin(url) {
        for(const pattern of patterns) {
            var matched = url.match(pattern.regex)
            if(matched) {
                return matched[pattern.index];
            }
        }
        return null;
    }

    
    cleanButton.addEventListener("click", e => cleanURL());
    window.addEventListener("focus", e => cleanURL());

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

        var asin = getAsin(text);

        if(!asin) {
            resultLink.style.display = "none";
            errorArea.style.display = "";
            errorArea.textContent = "No Match";
            errorArea.href = "";
            return;
        }
        var replaced = "https://www.amazon.co.jp/dp/"+asin;
        resultLink.textContent = replaced;
        resultLink.href = replaced;

        if(document.hasFocus()) {
            navigator.clipboard.writeText(replaced);
        }
    }

    cleanURL();
}
