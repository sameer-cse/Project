const toggleBtn = document.getElementById('toggleBtn');
const output = document.getElementById('output');
const languageSelector = document.getElementById('language');

let isListening = false;
let recognition;

const createRecognizer = (lang) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Your browser does not support Speech Recognition. Please use Google Chrome.');
    return null;
  }
  const recognizer = new SpeechRecognition();
  recognizer.lang = lang;
  recognizer.continuous = true;
  recognizer.interimResults = true;
  return recognizer;
};

toggleBtn.onclick = () => {
  if (!isListening) {
    const lang = languageSelector.value;
    recognition = createRecognizer(lang);
    if (!recognition) return;

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      output.value = transcript;
    };

    recognition.onend = () => {
      if (isListening) recognition.start(); // auto-restart
    };

    recognition.start();
    toggleBtn.textContent = '🛑 Stop Listening';
  } else {
    recognition.stop();
    toggleBtn.textContent = '🎤 Start Listening';
  }
  isListening = !isListening;
};
