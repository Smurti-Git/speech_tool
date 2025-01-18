 document.addEventListener("DOMContentLoaded", () => {
            let recognition;
            let isListening = false;

            document.getElementById("start").addEventListener("click", () => {
                if (isListening) {
                    recognition.stop();
                    isListening = false;
                    document.getElementById("start").innerText = "Start Recognition";
                } else {
                    startRecognition();
                    isListening = true;
                    document.getElementById("start").innerText = "Stop Recognition";
                }
            });

            document.getElementById("copy").addEventListener("click", () => {
                const textToCopy = document.getElementById("result").value;
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

            document.getElementById("clear").addEventListener("click", () => {
                document.getElementById("result").value = "";
            });

            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                if (request.action === "startRecognition") {
                    startRecognition();
                }
            });

            function startRecognition() {
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then((stream) => {
                        console.log("Microphone access granted");
                        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                        recognition.lang = "en-US";
                        recognition.interimResults = false;
                        recognition.continuous = false;
                        recognition.maxAlternatives = 1;

                        recognition.onresult = (event) => {
                            const transcript = event.results[0][0].transcript;
                            document.getElementById("result").value += ` ${transcript}`;
                        };

                        recognition.onerror = (event) => {
                            console.error("Error occurred in recognition: ", event.error);
                        };

                        recognition.onend = () => {
                            if (isListening) {
                                setTimeout(() => {
                                    recognition.start();
                                }, 500);
                            } else {
                                console.log("Recognition ended");
                            }
                        };

                        recognition.start();
                        console.log("Recognition started");
                    })
                    .catch((err) => {
                        console.error("Error getting user media: ", err.name, err.message);
                        alert("Microphone access is required for speech recognition. Please allow microphone access.");
                    });
            }
        });
    
