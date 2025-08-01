document.addEventListener("DOMContentLoaded", () => {
  const studentCard = document.querySelector('a[href="#User-login"]');
  const adminCard = document.querySelector('a[href="#Admin-login"]');
  const adminLogin = document.getElementById("Admin-login");
  const userLogin = document.getElementById("User-login");
  const registerForm = document.getElementById("User-Register-form");
  const homeSection = document.querySelector(".home");
  const createButtons = document.querySelectorAll(".Create");
  const backButtons = document.querySelectorAll(".back-btn");
  const adminLoginForm = document.getElementById("admin-login-form");
  const adminDashboard = document.getElementById("admin-dashboard");

  // Hide everything except home on load
  adminLogin.style.display = "none";
  userLogin.style.display = "none";
  registerForm.style.display = "none";
  adminDashboard.style.display = "none"; // hide dashboard initially

  // When user clicks "Student"
  studentCard.addEventListener("click", (e) => {
    e.preventDefault();
    homeSection.style.display = "none";
    userLogin.style.display = "block";
    adminLogin.style.display = "none";
    registerForm.style.display = "none";
    adminDashboard.style.display = "none";
  });

  // When user clicks "Admin"
  adminCard.addEventListener("click", (e) => {
    e.preventDefault();
    homeSection.style.display = "none";
    adminLogin.style.display = "block";
    userLogin.style.display = "none";
    registerForm.style.display = "none";
    adminDashboard.style.display = "none";
  });

  // When user clicks "Create Account"
  createButtons.forEach((button) => {
    button.addEventListener("click", () => {
      homeSection.style.display = "none";
      userLogin.style.display = "none";
      adminLogin.style.display = "none";
      registerForm.style.display = "block";
      adminDashboard.style.display = "none";
    });
  });

  // Back button behavior
  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // If user is in registration form, go to user login
      if (registerForm.style.display === "block") {
        registerForm.style.display = "none";
        userLogin.style.display = "block";
      } else {
        // Default: go to home
        homeSection.style.display = "block";
        adminLogin.style.display = "none";
        userLogin.style.display = "none";
        registerForm.style.display = "none";
        adminDashboard.style.display = "none";
      }
    });
  });

  // Registration form submission
  const registrationForm = registerForm.querySelector("form");
  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent actual form submission

    // Show styled popup
    const popup = document.getElementById("popup-message");

    // Add class to show the popup with fade-in effect
    popup.classList.add("show");

    // Remove the class after 3 seconds to fade it out
    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);

    // Reset the form
    registrationForm.reset();

    // Go back to user login after registration
    registerForm.style.display = "none";
    userLogin.style.display = "block";
  });

  // Admin login form submission
  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("admin-email").value;
    const password = document.getElementById("admin-password").value;

    console.log("Admin Login Attempt:", email, password); // <== DEBUG

    const adminEmail = "admin@gmail.com";
    const adminPassword = "123456";

    const popup = document.getElementById("popup-message");

    if (email === adminEmail && password === adminPassword) {
      console.log("Admin login success"); // <== DEBUG
      popup.innerText = "✅ Admin login successful!";
      popup.classList.add("show");

      setTimeout(() => {
        popup.classList.remove("show");

        adminLogin.style.display = "none";
        adminDashboard.style.display = "block";
      }, 2000);
    } else {
      console.log("Admin login failed"); // <== DEBUG
      popup.innerText = "❌ Invalid admin credentials!";
      popup.classList.add("show");

      setTimeout(() => {
        popup.classList.remove("show");
      }, 3000);
    }

    adminLoginForm.reset();
  });

});
