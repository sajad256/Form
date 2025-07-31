const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message").value.trim();

  const data = { username, email, password, message };

  successMsg.textContent = "";
  successMsg.className = "success-msg";

  try {
    const res = await fetch("http://localhost:3000/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      successMsg.textContent = result.message;
      successMsg.classList.add("success");
      form.reset();
    } else {
      successMsg.textContent = result.message || "Something went wrong.";
      successMsg.classList.add("error");
    }
  } catch (error) {
    successMsg.textContent = "Network error. Please try again.";
    successMsg.classList.add("error");
  }
});
