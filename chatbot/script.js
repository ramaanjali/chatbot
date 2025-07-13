const botReplies = {
  "hello": "Hello there! 👋",
  "hi": "Hi! 😊",
  "how are you?": "I'm great, thanks for asking! 🤖",
  "what is your name?": "I'm ChatieBot, nice to meet you! 🤝",
  "what do you love?": "I love answering your questions! ❤",
  "do you sleep?": "No, I'm always awake! 🛌❌",
  "what is your favorite dish?": "Virtual pizza! 🍕",
  "what do you fear?": "Losing internet connection... 😱",
  "tell me a joke": "Why don't robots panic? They have nerves of steel! 😂",
  "what is today?": new Date().toDateString(),
  "who made you?": "A brilliant human like you! 👨‍💻",
  "are you human?": "Not quite! But I try my best 🤖",
  "what's your favorite color?": "I like neon blue 🌌",
  "do you play games?": "I play word games in my code! 🧠",
  "can you dance?": "Digitally, yes! 💃🕺",
  "where do you live?": "In your browser 🌐",
  "how old are you?": "Just born a few milliseconds ago! 🍼",
  "are you smart?": "Getting smarter every day! 🧠",
  "do you have friends?": "You're my favorite one! 🤗",
  "what is ai?": "AI stands for Artificial Intelligence 🤓"
};

function sendMessage() {
  const inputBox = document.getElementById("userInput");
  const userText = inputBox.value.trim();
  if (!userText) return;

  appendMessage("user", userText);

  const lowerText = userText.toLowerCase();
  const reply = botReplies[lowerText] || "Hmm... I'm still learning that. 🤔";

  setTimeout(() => {
    appendMessage("bot", reply);
  }, 500);

  inputBox.value = "";
}

function quickAsk(text) {
  document.getElementById("userInput").value = text;
  sendMessage();
}

function appendMessage(role, text) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className =` message ${role}`; // ✅ fixed template string
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function clearChat() {
  document.getElementById("chatBox").innerHTML = "";
  document.getElementById("userInput").value = "";
}

function startVoice() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Voice input not supported.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("userInput").value = transcript;
    sendMessage();
  };

  recognition.onerror = function(event) {
    alert("Voice error: " + event.error);
  };

  recognition.start();
}

function uploadFile() {
  document.getElementById("fileInput").click();
}

function openCamera() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.capture = "environment";
  fileInput.onchange = () => {
    alert("Photo selected: " + fileInput.files[0].name);
  };
  fileInput.click();
}
