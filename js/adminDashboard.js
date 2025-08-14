// adminDashboard.js
document.addEventListener("DOMContentLoaded", () => {
  const adminDashboard = document.getElementById("admin-dashboard");
  const homeSection = document.querySelector(".home");
  const adminLogout = document.getElementById("admin-logout");

  const userUploads = [
    {
      username: "shoaib",
      file: "oop_notes.pdf",
      downloads: 22,
      approved: true,
    },
    {
      username: "fatima",
      file: "db_project.docx",
      downloads: 14,
      approved: false,
    },
  ];
  const users = [
    { id: 1, name: "Shoaib Sikder", email: "shoaib@example.com" },
    { id: 2, name: "Fatima Akter", email: "fatima@example.com" },
  ];

  document.getElementById("total-uploads").textContent = userUploads.length;
  document.getElementById("total-downloads").textContent = userUploads.reduce(
    (acc, item) => acc + item.downloads,
    0
  );
  document.getElementById("total-approvals").textContent = userUploads.filter(
    (item) => item.approved
  ).length;

  if (adminLogout) {
    adminLogout.addEventListener("click", () => {
      adminDashboard.style.display = "none";
      homeSection.style.display = "block";
    });
  }

  document
    .querySelector(".footer-btn:nth-child(1)")
    .addEventListener("click", () => {
      let message = "📋 All Users:\n\n";
      users.forEach((user) => {
        message += `🧑 ${user.name} (${user.email})\n`;
      });
      alert(message);
    });

  document
    .querySelector(".footer-btn:nth-child(2)")
    .addEventListener("click", () => {
      const userId = prompt("Enter User ID to delete:");
      const found = users.find((user) => user.id == userId);
      alert(
        found ? `User ${found.name} deleted successfully!` : "User not found."
      );
    });

  document
    .querySelector(".footer-btn:nth-child(3)")
    .addEventListener("click", () => {
      const searchName = prompt("Enter username to search:").toLowerCase();
      const result = users.find((u) =>
        u.name.toLowerCase().includes(searchName)
      );
      alert(
        result
          ? `✅ User Found:\n\nName: ${result.name}\nEmail: ${result.email}`
          : "❌ No user found."
      );
    });
});
