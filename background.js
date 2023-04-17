// background.js

let color = "#3aa757"; // 배경색 데이터

chrome.runtime.onInstalled.addListener(() => {
  // runtime.onInstalled에 대한 수신 이벤트를 포함하여 시작.
  chrome.storage.sync.set({ color }); // 배경색 데이터를 storage에 저장.
  console.log("Default background color set to %cgreen", `color: ${color}`); // console.log를 통해 저장된 배경색을 확인.
});
