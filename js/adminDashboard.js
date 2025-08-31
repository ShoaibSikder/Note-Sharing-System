// adminDashboard.js
document.addEventListener("DOMContentLoaded", async () => {
  const adminDashboard = document.getElementById("admin-dashboard");
  const homeSection = document.querySelector(".home");
  const adminLogout = document.getElementById("admin-logout");

  // --- DASHBOARD OVERVIEW ---
  async function loadOverview() {
    try {
      const res = await fetch("/api/admin/overview");
      const overview = await res.json();
      document.getElementById("total-uploads").textContent =
        overview.totalUploads;
      document.getElementById("total-downloads").textContent =
        overview.totalDownloads;
      document.getElementById("total-approvals").textContent =
        overview.totalApprovals;
    } catch (err) {
      console.error("Error loading overview:", err);
    }
  }

  await loadOverview();

  // --- LOGOUT ---
  if (adminLogout) {
    adminLogout.addEventListener("click", () => {
      adminDashboard.style.display = "none";
      homeSection.style.display = "block";
    });
  }

  // --- VIEW ALL USERS ---
  document
    .querySelector(".footer-btn:nth-child(1)")
    .addEventListener("click", async () => {
      try {
        const res = await fetch("/api/admin/users");
        const users = await res.json();
        let message = "📋 All Users:\n\n";
        users.forEach((u) => (message += `🧑 ${u.full_name} (${u.email})\n`));
        alert(message);
      } catch (err) {
        alert("Error fetching users.");
        console.error(err);
      }
    });

  // --- DELETE USER ---
  document
    .querySelector(".footer-btn:nth-child(2)")
    .addEventListener("click", async () => {
      const userId = prompt("Enter User ID to delete:");
      if (!userId) return;
      try {
        const res = await fetch(`/api/admin/users/${userId}`, {
          method: "DELETE",
        });
        const result = await res.json();
        alert(result.message || result.error);
        loadOverview(); // refresh counts
      } catch (err) {
        alert("Error deleting user.");
        console.error(err);
      }
    });

  // --- SEARCH USER ---
  document
    .querySelector(".footer-btn:nth-child(3)")
    .addEventListener("click", async () => {
      const query = prompt("Enter username or email to search:");
      if (!query) return;
      try {
        const res = await fetch(`/api/admin/users/search/${query}`);
        const users = await res.json();
        if (users.length > 0) {
          let msg = "✅ Users Found:\n\n";
          users.forEach((u) => (msg += `🧑 ${u.full_name} (${u.email})\n`));
          alert(msg);
        } else {
          alert("❌ No user found.");
        }
      } catch (err) {
        alert("Error searching user.");
        console.error(err);
      }
    });

  // --- PENDING UPLOADS ---
  document
    .querySelector(".footer-btn:nth-child(4)")
    .addEventListener("click", async () => {
      try {
        const res = await fetch("/api/admin/uploads/pending");
        const uploads = await res.json();
        if (uploads.length === 0) return alert("No pending uploads.");
        let msg = "⏳ Pending Uploads:\n\n";
        uploads.forEach(
          (u) => (msg += `📄 ${u.title} by User ID ${u.user_id}\n`)
        );
        alert(msg);
      } catch (err) {
        alert("Error fetching pending uploads.");
        console.error(err);
      }
    });
});
