document.addEventListener("DOMContentLoaded", () => {
  const studentCard = document.querySelector('a[href="#User-login"]');
  const adminCard = document.querySelector('a[href="#Admin-login"]');
  const adminLogin = document.getElementById("Admin-login");
  const userLogin = document.getElementById("User-login");
  const homeSection = document.querySelector(".home");
  const backButtons = document.querySelectorAll(".back-btn");

  // Initially hide login sections
  adminLogin.style.display = "none";
  userLogin.style.display = "none";

  studentCard.addEventListener("click", (e) => {
    e.preventDefault();
    homeSection.style.display = "none";
    userLogin.style.display = "block";
    adminLogin.style.display = "none";
  });

  adminCard.addEventListener("click", (e) => {
    e.preventDefault();
    homeSection.style.display = "none";
    adminLogin.style.display = "block";
    userLogin.style.display = "none";
  });

  // Back to home
  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      homeSection.style.display = "block";
      userLogin.style.display = "none";
      adminLogin.style.display = "none";
    });
  });
});
