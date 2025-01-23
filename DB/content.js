document.addEventListener("DOMContentLoaded", () => {
    let recognition;
    let isListening = false;
    let textList = [];
    let totalScore = 0;

    document.getElementById("start").addEventListener("click", () => {
        if (isListening) {
            if (recognition) {
                recognition.stop();
            }
            isListening = false;
            document.getElementById("start").innerText = "Start Recognition";
        } else {
            startRecognition();
            isListening = true;
            document.getElementById("start").innerText = "Stop Recognition";
        }
    });

    document.getElementById("copy").addEventListener("click", () => {
        const textToCopy = document.getElementById("textareaInput").value;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    alert("Text copied successfully!");
                })
                .catch((err) => {
                    console.error("Error copying text: ", err);
                });
        } else {
            alert("No text to copy!");
        }
    });

    document.getElementById("clear").addEventListener("click", () => {
        document.getElementById("textareaInput").value = "";
        totalScore = 0;
        document.getElementById("totalScore").textContent = `Total Score: ${totalScore}`;
    });

    document.getElementById("inputForm").addEventListener("submit", (event) => {
        event.preventDefault();
        addToList();
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
                    const resultElement = document.getElementById("textareaInput");
                    resultElement.value += ` ${transcript}`;
                    checkMatch();
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

    window.addToList = function() {
        const textInput = document.getElementById('textInput').value.trim();
        const numberInput = document.getElementById('numberInput').value.trim();

        // Validate inputs
        if (textInput === '' || numberInput === '') {
            return;
        }

        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.innerHTML = `<span class="text">Text: ${textInput}</span> 
                              <span class="score">Score: ${numberInput}</span> 
                              <button onclick="removeItem(this)" style="margin-left: 10px;">&#10060;</button>`;

        document.getElementById('list').appendChild(listItem);

        textList.push({ text: textInput, score: parseInt(numberInput, 10) });

        document.getElementById('inputForm').reset();
        updateTotalScore();
    };

    window.removeItem = function(button) {
        const listItem = button.parentElement;
        const text = listItem.querySelector('.text').innerText.split(': ')[1];
        textList = textList.filter(item => item.text !== text);
        listItem.remove();
        updateTotalScore();
    };

    window.checkMatch = function() {
        const textareaValue = document.getElementById('textareaInput').value;
        const listItems = document.querySelectorAll('.list-item');
        totalScore = 0;

        listItems.forEach(item => {
            const textValue = item.querySelector('.text').innerText.split(': ')[1];
            const scoreValue = parseInt(item.querySelector('.score').innerText.split(': ')[1], 10);

            if (textareaValue.includes(textValue)) {
                item.classList.add('highlight');
                totalScore += scoreValue;
            } else {
                item.classList.remove('highlight');
            }
        });

        updateTotalScore();
    };

    function updateTotalScore() {
        document.getElementById('totalScore').innerText = `Total Score: ${totalScore}`;
    }
});
