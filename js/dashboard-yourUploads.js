document.addEventListener("DOMContentLoaded", () => {
  const yourUploadsBtn = document.getElementById("your-uploads-btn");
  const yourUploadsModal = document.getElementById("yourUploadsModal");
  const closeYourUploads = document.getElementById("closeYourUploads");
  const yourUploadsContainer = document.getElementById(
    "your-uploads-container"
  );

  yourUploadsBtn.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("id");
      const res = await fetch(
        `./Database/getUploads.php?mine=true&user_id=${userId}`
      );
      const data = await res.json();

      yourUploadsContainer.innerHTML = "";
      if (data.success && data.uploads.length > 0) {
        data.uploads.forEach((file) => {
          const card = document.createElement("div");
          card.classList.add("file-card");
          card.innerHTML = `
            <p><strong>Title:</strong> ${file.title}</p>
            <p><strong>Subject:</strong> ${file.subject}</p>
            <p><strong>Uploaded:</strong> ${file.uploaded_at}</p>
            <div class="file-actions">
              <button onclick="window.open('${file.file_path}', '_blank')">View</button>
            </div>
          `;
          yourUploadsContainer.appendChild(card);
        });
      } else {
        yourUploadsContainer.innerHTML = "<p>No uploads yet!</p>";
      }
    } catch (err) {
      console.error(err);
      yourUploadsContainer.innerHTML = "<p>⚠️ Failed to load your uploads</p>";
    }
    yourUploadsModal.style.display = "flex";
  });

  closeYourUploads.addEventListener(
    "click",
    () => (yourUploadsModal.style.display = "none")
  );
});
