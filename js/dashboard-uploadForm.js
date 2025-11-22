document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("uploadForm");
  const uploadBtn = document.getElementById("upload-btn");
  const uploadModal = document.getElementById("uploadModal");
  const closeUpload = document.getElementById("closeUpload");

  if (uploadForm) {
    uploadForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(uploadForm);

      try {
        const res = await fetch("./Database/upload.php", {
          method: "POST",
          body: formData,
        });

        const result = await res.json(); // upload.php returns JSON

        if (result.success) {
          showPopupMessage("✅ " + result.message, true, () => {
            uploadForm.reset();
            uploadModal.style.display = "none";
            if (window.loadUploads) window.loadUploads();
          });
        } else {
          showPopupMessage("❌ " + result.message, false);
        }
      } catch (err) {
        console.error(err);
        showPopupMessage("❌ Server error!", false);
      }
    });
  }

  uploadBtn.addEventListener("click", () => {
    uploadModal.style.display = "flex";
  });

  closeUpload.addEventListener("click", () => {
    uploadModal.style.display = "none";
  });
});
