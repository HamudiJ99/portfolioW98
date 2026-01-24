// Globaler Klick-Sound (Windows 95 Style)
const clickSound = new Audio("assets/sounds/click.wav");
clickSound.volume = 0.4;

const closeSound = new Audio("assets/sounds/click.wav");
closeSound.volume = 0.4;

function toggleStartMenu() {
  document.getElementById("start-menu").classList.toggle("hidden");
}

let activeZ = 200;

function openWindow(id) {
  const win = document.getElementById(id);

  // Fenster sichtbar machen
  win.classList.remove("hidden");

  // Nach vorne holen
  activeZ += 1;
  win.style.zIndex = activeZ;

  // Klick-Sound
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

function closeWindow(id) {
  // Sound neu starten (wichtig bei schnellem Klicken)
  closeSound.currentTime = 0;
  closeSound.play().catch(() => {});

  document.getElementById(id).classList.add("hidden");
}

// Drag-Funktion
let offsetX, offsetY, dragTarget;



function dragStart(e, el) {
  dragTarget = el;
  offsetX = e.clientX - el.offsetLeft;
  offsetY = e.clientY - el.offsetTop;

  activeZ += 1;
  el.style.zIndex = activeZ;

  document.addEventListener("mousemove", dragMove);
  document.addEventListener("mouseup", dragEnd);
}

function dragMove(e) {
  if (!dragTarget) return;
  dragTarget.style.left = `${e.clientX - offsetX}px`;
  dragTarget.style.top = `${e.clientY - offsetY}px`;
}

function dragEnd() {
  document.removeEventListener("mousemove", dragMove);
  document.removeEventListener("mouseup", dragEnd);
  dragTarget = null;
}

function toggleStartMenu() {
  const menu = document.getElementById("start-menu");
  const btn = document.getElementById("startButton");
  const isOpen = !menu.classList.contains("hidden");

  menu.classList.toggle("hidden");
  btn.classList.toggle("pressed", !isOpen);
}

window.addEventListener("DOMContentLoaded", () => {
  const audio = new Audio("assets/sounds/winstart.wav");
  const bootScreen = document.getElementById("boot-screen");
  const mainContent = document.querySelector(".desktop-bg");

  audio.play().catch(err => {
    console.warn("Autoplay verhindert. Nutzer muss evtl. klicken.");
  });

  setTimeout(() => {
    bootScreen.style.display = "none";
    mainContent.style.display = "block";

    startClock(); // ⬅️ HIER rein!
  }, 4000);
});

function startClock() {
  const clock = document.getElementById("taskbar-clock");
  if (!clock) return;

  function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    clock.textContent = `${hh}:${mm}`;
  }

  updateClock();                 // sofort setzen
  setInterval(updateClock, 1000); // jede Sekunde (wie Windows)
}


