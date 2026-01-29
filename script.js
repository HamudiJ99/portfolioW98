// Dynamische Projektausgabe in der Übersicht
function renderProjectOverview() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  grid.innerHTML = "";
  projects.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.text.length > 120 ? p.text.slice(0, 117) + "..." : p.text}</p>
      <button class="project-btn" onclick="openProject(${i})">View Project</button>
    `;
    grid.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderProjectOverview();
  // ...existing code...
});
// === Background Sound ===
let backgroundSound = null;
let soundOn = true;

function toggleBackgroundSound() {
  if (!backgroundSound) return;
  soundOn = !soundOn;
  if (soundOn) {
    backgroundSound.play();
    document.getElementById("sound-icon").src = "assets/icons/sound-on.png";
    document.getElementById("sound-icon").alt = "Sound On";
  } else {
    backgroundSound.pause();
    document.getElementById("sound-icon").src = "assets/icons/sound-off.png";
    document.getElementById("sound-icon").alt = "Sound Off";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // ...existing code...

  // Hintergrundsound vorbereiten (Datei muss bereitgestellt werden)
  backgroundSound = new Audio("assets/sounds/background.mp3"); // <--- Datei bereitstellen!
  backgroundSound.loop = true;
  backgroundSound.volume = 0.5;
  if (soundOn) {
    backgroundSound.play().catch(() => {});
  }
});
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

  audio.play().catch((err) => {
    console.warn("Autoplay verhindert. Nutzer muss evtl. klicken.");
  });

  setTimeout(() => {
    bootScreen.style.display = "none";
    mainContent.style.display = "block";

    startClock(); // ⬅️ HIER rein!
    // Bilder in .detail-section klickbar machen (immer nach dem Laden)
    document.querySelectorAll(".detail-section img").forEach((img) => {
      if (!img.classList.contains("preview-ready")) {
        img.classList.add("preview-ready");
        img.style.cursor = "zoom-in";
        img.addEventListener("click", function (e) {
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

  updateClock(); // sofort setzen
  setInterval(updateClock, 1000); // jede Sekunde (wie Windows)
}

/* ===== Project Data ===== */
const projects = [
  {
    title: "6-Axis Robot Arm & Conveyor Technology",
    subtitle: "Free rotation of heavy objects with a 6-axis robot arm",
    text: "As part of a systems engineering project at the University of Bremen, an automated system for the free rotation of heavy packages up to 35 kg was developed. The goal was to detect packages on an intelligent conveyor system depending on their orientation and to align them correctly using a 6-axis robot arm. For this purpose, a Cellumation conveyor system, a collaborative UR5e robot, camera systems, and a pneumatically operated tilting mechanism were conceptually combined. Control and communication of the components are handled via ROS (Robot Operating System). Due to external constraints, the final system was designed entirely digitally, including 3D modeling, motion and collision simulation, process planning, and economic evaluation. The project demonstrates a practical, scalable solution for automated logistics and sorting processes.",
    detailSections: [
      {
        img: "assets/project1/project101.png",
        title: "Concept",
        text: "The final concept combines an intelligently controlled conveyor system with a movable, pneumatically driven ramp and a 6-axis robot arm. Packages are first analyzed for their orientation using a camera and QR code recognition. An adjustable ramp tilts the package in a controlled manner so that the center of gravity is optimally positioned. The robot then takes over the actual rotation movement with a special tool, distributing the load evenly across the axes. The entire system is centrally controlled via ROS and enables the safe rotation of heavy packages regardless of size, weight, or initial position.",
      },
      {
        img: "assets/project1/project102.png",
        title: "Object Detection",
        text: "For package detection, we chose the program 'TensorFlow.' It can be easily installed on the Raspberry Pi and recognizes objects and their contours. It is based on Python and can most likely be integrated into ROS. TensorFlow can detect objects and determine with a percentage probability what kind of object it is.",
      },
      {
        img: "assets/project1/project103.png",
        title: "QR Code Scanning",
        text: "For scanning the QR codes, we use 'zbar.' In this program, scanning the QR codes is already fully implemented, and you only need to pass the read data to ROS.",
      },
      {
        img: "assets/project1/project104.png",
        title: "Cost-effectiveness",
        text: "The project is highly cost-effective: With a one-time investment (excluding cameras, conveyor, and robot), the system can run 24/7 and replace up to three workers. Maintenance is simple, and defective cells can be quickly replaced or updated via software without stopping the system.",
      },
    ],
  },
  {
    title: "Live Grain Detection in Real-Time",
    subtitle:
      "Development of a client-server solution for live streaming grain detection",
    text: "As part of this project, a client-server solution for AI-based real-time detection of cereal grains was developed. The goal was to automatically detect both unbroken and broken grains after the milling process and to visually present the results in order to identify optimization potential in the crushing process. For this purpose, a neural network based on an SSD object detection model was trained and integrated via a web application. The solution combines a React frontend with dashboards for evaluation, a Python Django backend for model execution, and a cloud-based infrastructure for hosting and authentication. The system enables user-friendly analysis of image data and supports data-driven process decisions in industrial compound feed production.",
    detailSections: [
      {
        img: "assets/project2/project201.png",
        title: "Process Flow",
        text: "The process starts at the feed mill, where raw material is crushed. A camera continuously captures images via a USB stream. These images show grains and serve as the data basis. Some of the images are used for the dataset and preprocessed to train a neural network based on TensorFlow. The trained model is then uploaded to the server. The client (user interface) can make process settings and send requests to the server. The server processes the uploaded images with the trained model and passes the results to the frontend. There, the model recognizes whether grains are broken or unbroken. The classification results are aggregated, evaluated, and visualized. The dashboard displays, among other things, the number of detected grains, classifications, and accuracies. Finally, the entire system is designed to be integrated and operated in Docker containers, enabling scalable and reproducible execution.",
      },
      {
        img: "assets/project2/project202.png",
        title: "SSD (Single Shot Detector)",
        text: "The SSD model we chose is a so-called convolutional neural network (CNN). In general, a CNN consists of one or more convolutional layers followed by a pooling layer. This can be repeated as often as needed. Usually, the convolutional layer is represented as a matrix, which in our case are the pixels of the color images. The activity of the neurons is calculated by moving a convolution matrix (filter kernel) over the image. Next, pooling removes redundant information. The most common is max pooling, where, for example, a matrix of four 2x2 matrices is reduced to a 2x2 matrix by only taking the value of the most active neuron in each 2x2 matrix. This has several advantages: lower memory requirements and, correspondingly, higher computation speed. Pooling also helps prevent overfitting. The last step is the fully connected layer, which is mainly used for classification and has as many neurons as there are classes.",
      },
      {
        img: "assets/project2/project203.png",
        title: "Object Detection",
        text: "When the user accesses the Image Detector, they can upload an image with the respective grains via an upload button. The model is capable of identifying images with multiple grains. The image is submitted, and after a short wait, the results are displayed under Process Image. It is worth noting that the waiting times for the COCO-SSD model were significantly longer than for our model. This is because our pre-trained model is specialized for grains.",
      },
      {
        img: "assets/project2/project204.png",
        title: "Model Training",
        text: "learning_rate: As the name suggests, the learning rate indicates how quickly the network learns. It increases rapidly at the beginning, as the neural network has not learned anything yet, and decreases as the learning process progresses. The learning rate approaches zero over time. The smaller this value becomes, the less the network learns, and at a certain point, the learning rate is so low that the training process can be stopped, even if it is not yet finished, because the network will not improve further. steps_per_second: Finally, we have the steps per second, which simply indicates how fast our network learns. The more steps per second, the faster the network learns. In our example, it can also be seen that the value drops at some points. This can have several causes, but is usually due to demanding background programs or full buffers. After our neural network is fully trained, we need to export it to a format that can be implemented. This is done with the 'exporter_main_v2.py' script. The exported model is saved as a .pb file, which is then made available to the frontend team so they can implement the model in their code.",
      },
    ],
  },
  {
    title: "Cataloging System",
    subtitle:
      "A System for Cataloging Variant-Rich Products in Expert Systems",
    text: "The cataloging system supports the structured management, creation, and validation of attributes and schemas for various object types. Users can define attributes including type, unit, synonyms, descriptions, and examples, organize them into classes, and combine them into reusable schemas with defined value ranges. An integrated schema editor and template system enable efficient schema creation and reuse. Additionally, a JSON-LD generator allows structured data to be generated, previewed, and exported. A built-in validator checks JSON-LD code or URLs against selected schemas to detect errors and inconsistencies early. All changes are stored locally in the browser, ensuring persistence and efficient iterative modeling.",
    detailSections: [
      {
        img: "assets/project3/project301.png",
        title: "System Architecture",
        text: "The system consists of multiple components that are operated by a user. A user can create an arbitrary number of schemas within the system. Each schema contains a set of attributes, with at least one attribute being mandatory. Attributes may be predefined using a controlled vocabulary. In the next step, the JSON-LD generator processes each schema and produces the corresponding JSON-LD code. This code is then validated by the validator, and the indexed URLs can be explored by the crawler program. To ensure continuous availability, the database must be hosted on a server. This allows the crawler to access the URLs at any time and extract product data. The crawler program scans structured websites, extracts relevant product information, and stores it in a structured format for further processing. Finally, the ontology can be transformed and exported into a semantic representation, such as the Web Ontology Language (OWL) format.",
      },
      {
        img: "assets/project3/project302.png",
        title: "Web Application",
        text: "The web application for managing and validating product schemas is available online. You can explore all features, including the schema editor, JSON-LD generator, and integrated validator, directly in your browser. Access the full application here: <a href='https://hamudij99.github.io/Schema/' target='_blank' rel='noopener noreferrer'>hamudij99.github.io/Schema/</a>. No installation is required—simply visit the link to get started.",
      },
      {
        img: "assets/project3/project303.png",
        title: "Crawler Program",
        text: "Using the “Generate Crawler & OWL” function, the specified URLs are crawled individually. The logging window displays the results of the crawling process, showing and extracting any JSON-LD data found on the pages. In the backend, this data is used to generate an OWL file, which is then made available for download. The crawling process takes only a few seconds and runs without noticeable delays. For cases involving a significantly larger number of URLs, a progress bar has been implemented to provide a better estimation of the overall processing time. When multiple URLs are processed, users can scroll within the logging window to view the results from additional pages. Each logging entry consists of the URL in the first line, followed by the JSON-LD code found on that page. If no JSON-LD section is detected on a given URL, the respective page is excluded from the ontology generation, and the logging window reports that no JSON-LD data was found.",
      },
    ],
  },
  {
    title: "Interface for Automated Storage of Measurement Data",
    subtitle:
      "Development of an interface for the automated storage of measurement data in an electronic laboratory notebook",
    text: "The project focuses on the development of an interface for the partially automated transfer of measurement data into an electronic laboratory notebook. The objective is to capture, process, and archive research and measurement data from scientific experiments in a structured, efficient, and reliable manner. With the increasing digitalization of scientific workflows, the solution aims to reduce manual data entry and minimize documentation effort. The developed system supports the entire research data management process from data acquisition and processing to long term storage, thereby improving traceability, reusability, and the publication of scientific results.",
    detailSections: [
      {
        img: "assets/project4/project401.png",
        title: "Metadata Extraction",
        text: "As part of the project, automated extraction of metadata from measurement and manufacturing files was implemented to enable structured and consistent documentation in the electronic laboratory notebook. Metadata such as measurement parameters, device information, and timestamps are extracted directly from file formats like TDMS and Surface files and processed further without manual input. This reduces documentation effort, minimizes sources of error, and improves the traceability and reusability of research data. Automated metadata extraction is a key component for efficient research data management and compliance with the FAIR principles.",
      },
      {
        img: "assets/project4/project402.png",
        title: "Graphical User Interface",
        text: "A graphical user interface (GUI) was developed in the project to enable intuitive and efficient interaction with the electronic laboratory notebook. The GUI supports users in the structured acquisition, display, and management of measurement data and automatically extracted metadata. By providing a clear presentation of relevant information as well as guided input and selection processes, documentation effort is reduced and usability is improved. The user interface serves as the central link between user, measurement data, and backend system, making a significant contribution to consistent and error-free research data management.",
      },
      {
        img: "assets/project4/project403.png",
        title: "Structuring of Metadata",
        text: "The image shows the structured presentation of extracted metadata from various measurement files within an electronic laboratory notebook. The displayed information includes, among others, title, creator, publisher, publication date, resource type, description of measurement parameters, and geographic information. The metadata is automatically extracted from different file formats such as SUR and TDMS files and organized hierarchically. This structured preparation enables consistent documentation, facilitates traceability of measurement data, and supports their further use in research data management.",
      },
    ],
  },
  {
    title: "Webdesign made simple",
    subtitle: "Simple static website just with html and css",
    text: "This website is a simple static demo page for a fictional web design service called “Webdesign Made Simple”. It presents a basic layout with navigation, service sections, placeholder text, a newsletter signup, and a footer. The page can be viewed as a template or student project intended to demonstrate fundamental web design and GitHub Pages usage rather than a finished commercial website.",
    detailSections: [
      {
        img: "assets/project5/project501.png",
        title: "WEBDESIGN made simple",
        text: "Access the full application here: <a href='https://jhamudi-uni.github.io/WMS.github.io/' target='_blank' rel='noopener noreferrer'>https://jhamudi-uni.github.io/WMS.github.io/</a>. No installation is required—simply visit the link to get started",
      },
    ],
  },
  {
    title: "ContentLab",
    subtitle: "Online platform for creating, managing, and publishing courses.",
    text: "ContentLab is a modern and user-friendly platform for creating and managing online courses. It is designed for educators, companies, and educational institutions that want to professionally prepare and deliver digital learning content. At its core is an intuitive dashboard that allows users to record high-quality videos directly in the browser. The integrated editor enables the creation of interactive (rich) content to enhance the learning experience. The platform also offers progress tracking, making it easy to monitor participants' learning status. Team management allows members and their permissions to be centrally organized. With its clear structure and ease of use, ContentLab provides a comprehensive solution for the digitalization of learning processes.",
    detailSections: [
      {
        img: "assets/project6/project601.png",
        title: "ContentLab",
        text: "Access the full application here: <a href='https://contentlab-6d713.web.app/home' target='_blank' rel='noopener noreferrer'>https://contentlab-6d713.web.app/home</a>. No installation is required—simply visit the link to get started",
      },
    ],
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

  // Dynamische Detail-Abschnitte rendern
  const detailDiv = document.getElementById("project-detail-dynamic");
  detailDiv.innerHTML = "";
  if (p.detailSections && Array.isArray(p.detailSections)) {
    p.detailSections.forEach((section) => {
      const sec = document.createElement("div");
      sec.className = "detail-section";
      let html = "";
      if (section.img) {
        html += `<img src='${section.img}' alt='Project Image' style='cursor:zoom-in' />`;
      }
      html += `<div>`;
      if (section.title) html += `<h3>${section.title}</h3>`;
      if (section.text) html += `<p>${section.text}</p>`;
      html += `</div>`;
      sec.innerHTML = html;
      detailDiv.appendChild(sec);
    });
  }

  // Bilder im neuen Content klickbar machen
  detailDiv.querySelectorAll("img").forEach((img) => {
    img.classList.add("preview-ready");
    img.addEventListener("click", function (e) {
      e.stopPropagation();
      openImagePreview(this.src);
    });
  });

  openWindow("project-detail-window");
}

function nextProject() {
  currentProjectIndex = (currentProjectIndex + 1) % projects.length;
  openProject(currentProjectIndex);
}

function prevProject() {
  currentProjectIndex =
    (currentProjectIndex - 1 + projects.length) % projects.length;
  openProject(currentProjectIndex);
}
