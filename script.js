let [seconds, minutes, hours] = [0, 0, 0];
let display = document.getElementById("display");
let statusMsg = document.getElementById("statusMsg");
let timer = null;
let lapTimes = []; // Array to store lap times

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.innerText = `${h}:${m}:${s}`;
}

function stopwatch() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
}

function showMessage(msg) {
  statusMsg.innerText = msg;
  statusMsg.classList.add("show");
  setTimeout(() => {
    statusMsg.classList.remove("show");
  }, 2000); // fade out after 2 seconds
}

function displayLapTimes() {
  let lapDiv = document.getElementById("lapTimes");
  lapDiv.innerHTML = lapTimes.map((time, index) => `<p>Lap ${index + 1}: ${time}</p>`).join('');
}

document.getElementById("start").addEventListener("click", () => {
  if (timer !== null) clearInterval(timer);
  timer = setInterval(stopwatch, 1000);
  showMessage("Started...");
});

document.getElementById("pause").addEventListener("click", () => {
  clearInterval(timer);
  showMessage("Paused ⏸");
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timer);
  [seconds, minutes, hours] = [0, 0, 0];
  lapTimes = []; // Clear lap times when reset
  updateDisplay();
  showMessage("Reset ⛔");
  displayLapTimes(); // Clear lap times display
});

document.getElementById("lap").addEventListener("click", () => {
  let lapTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  lapTimes.push(lapTime);
  displayLapTimes(); // Update lap times display
});
