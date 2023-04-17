console.log("바보야~~~~~");
setTranslateButton();

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
  const target = document.querySelector("#__next div > div.group.w-full");
  target.appendChild(button);
}
