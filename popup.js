document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start").addEventListener("click", () => {
    console.log("Button clicked");

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Microphone access granted");
        startRecognition();
      })
      .catch((err) => {
        console.error("Error getting user media: ", err.name, err.message);
        alert("Microphone access is required for speech recognition. Please allow microphone access.");
      });
  });

  document.getElementById("copy").addEventListener("click", () => {
    const textToCopy = document.getElementById("result").innerText;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          
        })
        .catch((err) => {
          console.error("Error copying text: ", err);
        });
    } else {
      alert("No text to copy!");
    }
  });

  function startRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById("result").innerText = `Cx: ${transcript}`;
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: ", event.error);
    };

    recognition.onend = () => {
      console.log("Recognition ended");
    };

    recognition.start();
    console.log("Recognition started");
  }
});
