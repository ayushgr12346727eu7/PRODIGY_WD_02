const display       = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn        = document.getElementById('lapBtn');
const resetBtn      = document.getElementById('resetBtn');
const lapsList      = document.getElementById('laps');

let startTime   = 0;
let elapsed     = 0;
let timerInterval= null;
let isRunning   = false;
let lapCounter  = 1;

/* ---------- FORMAT TIME ---------- */
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2,'0');
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2,'0');
  const s = String(totalSeconds % 60).padStart(2,'0');
  return `${h}:${m}:${s}`;
}

/* ---------- UPDATE DISPLAY ---------- */
function update() {
  elapsed = Date.now() - startTime;
  display.textContent = formatTime(elapsed);
}

/* ---------- START / PAUSE ---------- */
startPauseBtn.addEventListener('click', () => {
  if (!isRunning) {           // START or RESUME
    startTime = Date.now() - elapsed;
    timerInterval = setInterval(update, 10);
    startPauseBtn.textContent = 'Pause';
    startPauseBtn.classList.add('pause');
    lapBtn.disabled = false;
    isRunning = true;
  } else {                    // PAUSE
    clearInterval(timerInterval);
    startPauseBtn.textContent = 'Start';
    startPauseBtn.classList.remove('pause');
    lapBtn.disabled = true;
    isRunning = false;
  }
});

/* ---------- LAP ---------- */
lapBtn.addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = `Lap ${lapCounter++}  –  ${formatTime(elapsed)}`;
  lapsList.prepend(li);
});

/* ---------- RESET ---------- */
resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsed     = 0;
  lapCounter  = 1;
  isRunning   = false;
  display.textContent = '00:00:00';
  startPauseBtn.textContent = 'Start';
  startPauseBtn.classList.remove('pause');
  lapBtn.disabled = true;
  lapsList.innerHTML = '';
});