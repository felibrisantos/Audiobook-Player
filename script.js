const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const prevButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const audio = document.getElementById("audio");
const chapterNumber = document.getElementById("chapter");

let totalChapters = 30;
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

  audio.play();
  playButton.style.display = "none";
  pauseButton.style.display = "inline-block";

  updateChapter();
});

prevButton.addEventListener("click", () => {
  chapter--;
  if (chapter < 1) {
    chapter = totalChapters;
  }

  audio.play();
  playButton.style.display = "none";
  pauseButton.style.display = "inline-block";

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
  chapterNumber.innerText = "Seção " + chapter;
}

document.addEventListener("DOMContentLoaded", function () {
  var audio = document.getElementById("audio");
  var progressBar = document.getElementById("progress");
  var timer = document.getElementById("timer");

  audio.addEventListener("timeupdate", function () {
    var progressValue = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressValue;

    var currentTime = formatTime(audio.currentTime);
    var duration = formatTime(audio.duration);

    timer.textContent = currentTime + " / " + duration;
  });

  progressBar.addEventListener("click", function (e) {
    var clickX = e.clientX - progressBar.getBoundingClientRect().left;
    var percentClicked = (clickX / progressBar.offsetWidth) * 100;
    var newTime = (percentClicked / 100) * audio.duration;
    audio.currentTime = newTime;
  });

  function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }
});
