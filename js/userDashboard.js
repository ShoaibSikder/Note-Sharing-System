document.addEventListener("DOMContentLoaded", () => {
  // ====== Elements ======
  const uploadForm = document.getElementById("uploadForm");
  const filesContainer = document.getElementById("recent-files-container");
  const uploadBtn = document.getElementById("upload-btn");
  const uploadModal = document.getElementById("uploadModal");
  const closeUpload = document.getElementById("closeUpload");

  const yourUploadsBtn = document.getElementById("your-uploads-btn");
  const yourUploadsModal = document.getElementById("yourUploadsModal");
  const closeYourUploads = document.getElementById("closeYourUploads");
  const yourUploadsContainer = document.getElementById(
    "your-uploads-container"
  );

  const userBtn = document.getElementById("user-btn");
  const userMenu = document.querySelector(".user-menu");

  // ====== Fetch recent uploads (approved only) ======
  async function loadUploads() {
    try {
      const res = await fetch("Database/getUploads.php?status=approved");
      const data = await res.json();

      filesContainer.innerHTML = "";
      if (data.length > 0) {
        data.forEach((file) => {
          const fileCard = document.createElement("div");
          fileCard.classList.add("file-card");
          fileCard.innerHTML = `
            <p><strong>Title:</strong> ${file.title}</p>
            <p><strong>Subject:</strong> ${file.subject}</p>
            <p><strong>Uploaded:</strong> ${file.uploaded_at} | <strong>Downloads:</strong> ${file.downloads}</p>
            <div class="file-actions">
              <button onclick="window.open('${file.file_path}', '_blank')">View</button>
              <a href="Database/download.php?id=${file.upload_id}"><button>Download</button></a>
            </div>
          `;
          filesContainer.appendChild(fileCard);
        });
      } else {
        filesContainer.innerHTML = "<p>No uploads yet!</p>";
      }
    } catch (error) {
      console.error(error);
      filesContainer.innerHTML = "<p>⚠️ Failed to load uploads</p>";
    }
  }

  // ====== Upload form handler ======
  if (uploadForm) {
    uploadForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(uploadForm);

      try {
        const res = await fetch("Database/upload.php", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (data.success) {
          alert("✅ File uploaded successfully!");
          uploadForm.reset();
          uploadModal.style.display = "none";
          loadUploads();
        } else {
          alert("❌ " + data.message);
        }
      } catch (error) {
        console.error(error);
        alert("❌ Server error!");
      }
    });
  }

  // ====== Show/Hide Upload Modal ======
  uploadBtn.addEventListener("click", () => {
    uploadModal.style.display = "flex";
  });
  closeUpload.addEventListener("click", () => {
    uploadModal.style.display = "none";
  });

  // ====== Show/Hide Your Uploads Modal ======
  yourUploadsBtn.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const res = await fetch(
        `Database/getUploads.php?mine=true&user_id=${userId}`
      );
      const data = await res.json();

      yourUploadsContainer.innerHTML = "";
      if (data.length > 0) {
        data.forEach((file) => {
          const fileCard = document.createElement("div");
          fileCard.classList.add("file-card");
          fileCard.innerHTML = `
            <p><strong>Title:</strong> ${file.title}</p>
            <p><strong>Subject:</strong> ${file.subject}</p>
            <p><strong>Status:</strong> ${file.status}</p>
            <p><strong>Uploaded:</strong> ${file.uploaded_at}</p>
            <div class="file-actions">
              <button onclick="window.open('${file.file_path}', '_blank')">View</button>
            </div>
          `;
          yourUploadsContainer.appendChild(fileCard);
        });
      } else {
        yourUploadsContainer.innerHTML = "<p>No uploads yet!</p>";
      }
    } catch (error) {
      console.error(error);
      yourUploadsContainer.innerHTML = "<p>⚠️ Failed to load your uploads</p>";
    }

    yourUploadsModal.style.display = "flex";
  });
  closeYourUploads.addEventListener("click", () => {
    yourUploadsModal.style.display = "none";
  });

  // ====== User dropdown toggle ======
  if (userBtn && userMenu) {
    userBtn.addEventListener("click", () => {
      userMenu.classList.toggle("show");
    });

    window.addEventListener("click", (e) => {
      if (!userBtn.contains(e.target) && !userMenu.contains(e.target)) {
        userMenu.classList.remove("show");
      }
    });
  }

  // ====== Load recent uploads on page load ======
  loadUploads();
});
