// popup.js
// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setTranslateButton,
  });
});

function translate(text) {
  // 번역할 텍스트와 번역할 언어 코드를 입력합니다.
  const targetLanguage = "ko";

  // 인증 정보를 입력합니다.
  const apiKey = "YOUR_API_KEY";

  // 번역을 요청합니다.
  fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(`Original text: ${text}`);
      console.log(`Translation: ${data.data.translations[0].translatedText}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

function setTranslateButton() {
  const button = document.createElement("button");
  button.innerText = "자동 번역";

  function getTextNodes(element) {
    const nodes = element.childNodes;
    const textNodes = [];

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        textNodes.push(...getTextNodes(node));
      }
    }

    return textNodes;
  }

  function getListToText(textNodes) {
    const text = textNodes.map((node) => node.textContent).join("");
    return text;
  }

  button.addEventListener("click", () => {
    // 버튼 클릭시 내용 변경
    const div = document.querySelector(".AIPRM__conversation__response");
    const textNodes = getTextNodes(div);
    const text = getListToText(textNodes);
    console.log(text);
  });

  // 버튼을 추가할 위치를 찾아서 버튼 추가
  const target = document.querySelector(".items-end");
  target.appendChild(button);
}

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
