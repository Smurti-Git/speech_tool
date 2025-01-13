chrome.commands.onCommand.addListener((command) => {
  if (command === "start-recognition") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "startRecognition" });
    });
  }
});
