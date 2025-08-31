// userRegistration.js
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("User-Register-form");
  const createButtons = document.querySelectorAll(".Create");
  const backButtons = document.querySelectorAll(".back-btn");
  const homeSection = document.querySelector(".home");
  const userLogin = document.getElementById("User-login");
  const adminLogin = document.getElementById("Admin-login");

  // Show registration form
  createButtons.forEach((button) => {
    button.addEventListener("click", () => {
      homeSection.style.display = "none";
      userLogin.style.display = "none";
      adminLogin.style.display = "none";
      registerForm.style.display = "block";
    });
  });

  // Back button behavior
  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (registerForm.style.display === "block") {
        registerForm.style.display = "none";
        userLogin.style.display = "block";
      } else {
        homeSection.style.display = "block";
        adminLogin.style.display = "none";
        userLogin.style.display = "none";
        registerForm.style.display = "none";
      }
    });
  });

  // Registration form submission (connect to PHP)
  const registrationForm = registerForm.querySelector("form");
  registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(registrationForm);

    try {
      const res = await fetch("php/register.php", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        showPopupMessage("✅ Registration successful!", true);
        registrationForm.reset();
        registerForm.style.display = "none";
        userLogin.style.display = "block";
      } else {
        showPopupMessage("❌ " + data.message, false);
      }
    } catch (error) {
      console.error(error);
      showPopupMessage("❌ Server error!", false);
    }
  });
});
