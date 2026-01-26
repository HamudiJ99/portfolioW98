// Globaler Klick-Sound (Windows 95 Style)
// Bild-Preview-Fenster für große Bilder
function openImagePreview(src) {
  const win = document.getElementById("image-preview-window");
  const img = document.getElementById("image-preview-img");
  img.src = src;
  openWindow("image-preview-window");
}
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
    // Bilder in .detail-section klickbar machen (immer nach dem Laden)
    document.querySelectorAll(".detail-section img").forEach(img => {
      if (!img.classList.contains("preview-ready")) {
        img.classList.add("preview-ready");
        img.style.cursor = "zoom-in";
        img.addEventListener("click", function(e) {
          e.stopPropagation();
          openImagePreview(this.src);
        });
      }
    });
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


/* ===== Project Data ===== */
const projects = [
  {
    title: "6-Axis Robot Arm & Conveyor Technology",
    subtitle: "Free rotation of heavy objects with a 6-axis robot arm",
    text: "As part of a systems engineering project at the University of Bremen, an automated system for the free rotation of heavy packages up to 35 kg was developed. The goal was to detect packages on an intelligent conveyor system depending on their orientation and to align them correctly using a 6-axis robot arm. For this purpose, a Cellumation conveyor system, a collaborative UR5e robot, camera systems, and a pneumatically operated tilting mechanism were conceptually combined. Control and communication of the components are handled via ROS (Robot Operating System). Due to external constraints, the final system was designed entirely digitally, including 3D modeling, motion and collision simulation, process planning, and economic evaluation. The project demonstrates a practical, scalable solution for automated logistics and sorting processes.",
  },
  {
    title: "Projekt 2",
    subtitle: "Automatisierung & Simulation",
    text: "Beschreibung Projekt 2.",
  },
  {
    title: "Projekt 3",
    subtitle: "Embedded Systems",
    text: "Beschreibung Projekt 3.",
  },
  {
    title: "Projekt 4",
    subtitle: "Web & Cloud",
    text: "Beschreibung Projekt 4.",
  },
];

let currentProjectIndex = 0;

function openProject(index) {
  currentProjectIndex = index;
  const p = projects[index];

  document.getElementById("project-detail-title").textContent = p.title;
  document.getElementById("detail-h1").textContent = p.title;
  document.getElementById("detail-h2").textContent = p.subtitle;
  document.getElementById("detail-text").textContent = p.text;

  openWindow("project-detail-window");
}

function nextProject() {
  currentProjectIndex =
    (currentProjectIndex + 1) % projects.length;
  openProject(currentProjectIndex);
}

function prevProject() {
  currentProjectIndex =
    (currentProjectIndex - 1 + projects.length) % projects.length;
  openProject(currentProjectIndex);
}

