document.addEventListener("DOMContentLoaded", () => {
  const userBtn = document.getElementById("user-btn");
  const userMenu = document.querySelector(".user-menu");
  const logoutLink = document.getElementById("logout-link");

  if (!userBtn || !userMenu || !logoutLink) return;

  // ===== User dropdown toggle =====
  userBtn.addEventListener("click", () => userMenu.classList.toggle("show"));
  window.addEventListener("click", (e) => {
    if (!userBtn.contains(e.target) && !userMenu.contains(e.target)) {
      userMenu.classList.remove("show");
    }
  });

  // ===== Logout =====
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("id");
    window.location.href = "index.html"; // redirect home
  });
});
