function showPopupMessage(message, isSuccess = true, callback) {
  const popup = document.getElementById("popup-message");
  if (!popup) return; // exit if popup not found

  const popupContent = popup.querySelector(".popup-content p");
  if (popupContent) popupContent.innerText = message;

  // Remove any previous status classes
  popup.classList.remove("success", "error");

  // Add a class based on success or error (you can style it in CSS)
  popup.classList.add(isSuccess ? "success" : "error");

  // Restart animation
  popup.classList.remove("show");
  void popup.offsetWidth; // trigger reflow
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
    if (callback) callback();
  }, 3000);
}
