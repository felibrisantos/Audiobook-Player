const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const prevButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const audio = document.getElementById("audio");
const chapterNumber = document.getElementById("chapter");

let totalChapters = 10;
let chapter = 1;

playButton.addEventListener("click", () => {
  audio.play();
  playButton.style.display = "none";
  pauseButton.style.display = "inline-block";
});

pauseButton.addEventListener("click", () => {
  audio.pause();
  pauseButton.style.display = "none";
  playButton.style.display = "inline-block";
});

nextButton.addEventListener("click", () => {
  chapter++;
  if (chapter > totalChapters) {
    chapter = 1;
  }
  updateChapter();
});

prevButton.addEventListener("click", () => {
  chapter--;
  if (chapter < 1) {
    chapter = totalChapters;
  }
  updateChapter();
});

audio.addEventListener("ended", () => {
  chapter++;
  if (chapter > totalChapters) {
    chapter = 1;
  }
  updateChapter();
});

function updateChapter() {
  audio.src = `./books/dom-casmurro/${chapter}.mp3`;
  audio.play();
  chapterNumber.innerText = "Capítulo " + chapter;
}
