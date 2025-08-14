// userLogin.js
document.addEventListener("DOMContentLoaded", () => {
  const studentCard = document.querySelector('a[href="#User-login"]');
  const homeSection = document.querySelector(".home");
  const userLogin = document.getElementById("User-login");
  const adminLogin = document.getElementById("Admin-login");

  studentCard.addEventListener("click", (e) => {
    e.preventDefault();
    homeSection.style.display = "none";
    userLogin.style.display = "block";
    adminLogin.style.display = "none";
  });
});
