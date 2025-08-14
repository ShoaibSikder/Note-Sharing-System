// userDashboard.js
document.addEventListener("DOMContentLoaded", () => {
  const userBtn = document.getElementById("user-btn"); // <-- fixed
  const userMenu = document.querySelector(".user-menu");
  const dashboard = document.getElementById("user-dashboard");

  const uploadBtn = document.getElementById("upload-btn");
  const uploadModal = document.getElementById("uploadModal");
  const closeUpload = document.getElementById("closeUpload");
  const uploadForm = document.getElementById("uploadForm");

  const yourUploadsBtn = document.getElementById("your-uploads-btn");
  const yourUploadsModal = document.getElementById("yourUploadsModal");
  const closeYourUploadsBtn = document.getElementById("closeYourUploads");
  const yourUploadsContainer = document.getElementById(
    "your-uploads-container"
  );

  // Simulated user data
  const userData = {
    username: "Shoaib",
    uploads: 10,
    downloads: 25,
    recentFiles: [
      {
        title: "DBMS Notes",
        subject: "Database",
        uploadedDate: "1 Aug",
        downloads: 5,
        filePath: "files/dbms.pdf",
      },
      {
        title: "Algorithms",
        subject: "Computer Science",
        uploadedDate: "28 Jul",
        downloads: 12,
        filePath: "files/algo.pdf",
      },
      {
        title: "OOP Concepts",
        subject: "Programming",
        uploadedDate: "26 Jul",
        downloads: 8,
        filePath: "files/oop.pdf",
      },
      {
        title: "Networking Basics",
        subject: "Networks",
        uploadedDate: "24 Jul",
        downloads: 9,
        filePath: "files/networking.pdf",
      },
      {
        title: "Software Testing",
        subject: "QA",
        uploadedDate: "20 Jul",
        downloads: 6,
        filePath: "files/testing.pdf",
      },
    ],
  };

  // Populate header + stats
  const filesContainer = document.getElementById("recent-files-container");
  const uploadsCount = document.getElementById("uploads-count");
  const downloadsCount = document.getElementById("downloads-count");
  if (userBtn) userBtn.textContent = `Welcome, ${userData.username} ▼`;
  if (uploadsCount) uploadsCount.textContent = userData.uploads;
  if (downloadsCount) downloadsCount.textContent = userData.downloads;

  // Render recent files
  if (filesContainer) {
    filesContainer.innerHTML = "";
    userData.recentFiles.forEach((file) => {
      const fileCard = document.createElement("div");
      fileCard.classList.add("file-card");
      fileCard.innerHTML = `
        <p><strong>Title:</strong> ${file.title}</p>
        <p><strong>Subject:</strong> ${file.subject}</p>
        <p><strong>Uploaded:</strong> ${file.uploadedDate} | <strong>Downloads:</strong> ${file.downloads}</p>
        <div class="file-actions">
          <button onclick="window.open('${file.filePath}', '_blank')">View</button>
          <span style="width: 8px;"></span>
          <a href="${file.filePath}" download><button>Download</button></a>
        </div>
      `;
      filesContainer.appendChild(fileCard);
    });
  }

  // Dropdown menu
  if (userBtn && userMenu) {
    userBtn.addEventListener("click", () => {
      userMenu.classList.toggle("show");
    });
  }

  // Upload modal
  if (uploadBtn && uploadModal && dashboard) {
    uploadBtn.addEventListener("click", () => {
      uploadModal.style.display = "flex";
      dashboard.classList.add("blur");
    });
  }
  if (closeUpload && uploadModal && dashboard) {
    closeUpload.addEventListener("click", () => {
      uploadModal.style.display = "none";
      dashboard.classList.remove("blur");
    });
  }

  // Your uploads modal (show recentFiles for this user)
  function renderUserUploads() {
    if (!yourUploadsContainer) return;
    yourUploadsContainer.innerHTML = "";
    if (!userData.recentFiles.length) {
      yourUploadsContainer.innerHTML =
        "<p>You have not uploaded any files yet.</p>";
      return;
    }
    userData.recentFiles.forEach((file) => {
      const fileDiv = document.createElement("div");
      fileDiv.classList.add("file-card");
      fileDiv.innerHTML = `
        <p><strong>Title:</strong> ${file.title}</p>
        <p><strong>Subject:</strong> ${file.subject}</p>
        <p><strong>Uploaded:</strong> ${file.uploadedDate}</p>
        <div class="file-actions">
          <button onclick="window.open('${file.filePath}', '_blank')">View</button>
          <a href="${file.filePath}" download><button>Download</button></a>
        </div>
      `;
      yourUploadsContainer.appendChild(fileDiv);
    });
  }

  if (yourUploadsBtn && yourUploadsModal && dashboard) {
    yourUploadsBtn.addEventListener("click", () => {
      renderUserUploads();
      yourUploadsModal.style.display = "flex";
      dashboard.classList.add("blur");
    });
  }
  if (closeYourUploadsBtn && yourUploadsModal && dashboard) {
    closeYourUploadsBtn.addEventListener("click", () => {
      yourUploadsModal.style.display = "none";
      dashboard.classList.remove("blur");
    });
  }

  // Upload handler
  if (uploadForm && uploadModal && dashboard) {
    uploadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("title")?.value.trim();
      const subject = document.getElementById("subject")?.value.trim();
      const file = document.getElementById("file")?.files?.[0];

      if (!file)
        return showPopupMessage("❌ Please select a file to upload.", false);
      if (!title || !subject)
        return showPopupMessage("❌ Title and subject are required.", false);

      showPopupMessage(`✅ Uploaded "${title}" successfully!`, true, () => {
        uploadModal.style.display = "none";
        dashboard.classList.remove("blur");
        uploadForm.reset();
      });
    });
  }
});
