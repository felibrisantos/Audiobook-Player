const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const prevButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const audio = document.getElementById("audio");
const chapterNumber = document.getElementById("chapter");
const progressBar = document.getElementById("progress");
const timer = document.getElementById("timer");

let totalChapters = 30;
let chapter = 1;

playButton.addEventListener("click", togglePlayPause);
pauseButton.addEventListener("click", togglePlayPause);
nextButton.addEventListener("click", changeChapter.bind(null, 1));
prevButton.addEventListener("click", changeChapter.bind(null, -1));
audio.addEventListener("ended", () => changeChapter(1));

audio.addEventListener("timeupdate", updateProgressBar);
progressBar.addEventListener("click", handleProgressBarClick);

document.addEventListener("DOMContentLoaded", initializeAudioPlayer);

function togglePlayPause() {
  if (audio.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
}

function playAudio() {
  audio.play();
  playButton.style.display = "none";
  pauseButton.style.display = "inline-block";
}

function pauseAudio() {
  audio.pause();
  pauseButton.style.display = "none";
  playButton.style.display = "inline-block";
}

function changeChapter(offset) {
  chapter = (chapter + offset - 1 + totalChapters) % totalChapters + 1;
  updateChapter();
}

function updateChapter() {
  audio.src = `./books/dom-casmurro/${chapter}.mp3`;
  playAudio();
  chapterNumber.innerText = `Seção ${chapter}`;
}

function updateProgressBar() {
  const progressValue = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progressValue;
  timer.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
}

function handleProgressBarClick(e) {
  const clickX = e.clientX - progressBar.getBoundingClientRect().left;
  const percentClicked = (clickX / progressBar.offsetWidth) * 100;
  const newTime = (percentClicked / 100) * audio.duration;
  audio.currentTime = newTime;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${formattedSeconds}`;
}

function initializeAudioPlayer() {
  audio.addEventListener("timeupdate", updateProgressBar);
  progressBar.addEventListener("click", handleProgressBarClick);
}
