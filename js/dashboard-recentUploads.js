document.addEventListener("DOMContentLoaded", () => {
  const filesContainer = document.getElementById("recent-files-container");
  const uploadsCountElem = document.getElementById("uploads-count");
  const downloadsCountElem = document.getElementById("downloads-count");

  async function loadUploads() {
    try {
      const res = await fetch("./Database/getUploads.php");
      const data = await res.json();

      filesContainer.innerHTML = "";
      let totalUploads = 0;
      let totalDownloads = 0;

      if (data.success && data.uploads.length > 0) {
        data.uploads.forEach((file) => {
          totalUploads++;
          totalDownloads += parseInt(file.downloads) || 0;

          const card = document.createElement("div");
          card.classList.add("file-card");

          // Card innerHTML
          card.innerHTML = `
            <p><strong>Title:</strong> ${file.title}</p>
            <p><strong>Subject:</strong> ${file.subject}</p>
            <p><strong>Uploaded:</strong> ${file.uploaded_at} | <strong>Downloads:</strong> ${file.downloads}</p>
            <div class="file-actions"></div>
          `;

          const viewBtn = document.createElement("button");
          viewBtn.textContent = "View";
          viewBtn.addEventListener("click", () => {
            window.open("./" + file.file_path, "_blank");
          });

          const downloadBtn = document.createElement("button");
          downloadBtn.textContent = "Download";
          downloadBtn.addEventListener("click", () => {
            window.location.href = `./Database/download.php?file_id=${file.upload_id}`;
          });

          card.querySelector(".file-actions").appendChild(viewBtn);
          card.querySelector(".file-actions").appendChild(downloadBtn);

          filesContainer.appendChild(card);
        });
      } else {
        filesContainer.innerHTML = "<p>No uploads yet!</p>";
      }

      if (uploadsCountElem) uploadsCountElem.textContent = totalUploads;
      if (downloadsCountElem) downloadsCountElem.textContent = totalDownloads;
    } catch (err) {
      console.error(err);
      filesContainer.innerHTML = "<p>⚠️ Failed to load uploads</p>";
    }
  }

  window.loadUploads = loadUploads;
  loadUploads();
});
