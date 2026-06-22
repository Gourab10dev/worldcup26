document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      username: document.getElementById("username").value.trim(),
      dob: document.getElementById("dob").value,
      email: document.getElementById("email").value.trim(),
      country: document.getElementById("country").value.trim(),
      whatsapp: document.getElementById("whatsapp").value.trim(),
      wcWinner: document.getElementById("wcWinner").value.trim(),
      goldenBoot: document.getElementById("goldenBoot").value.trim()
    };

    try {
      const response = await fetch("https://worldcup26-backend.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration Successful!");

        document.getElementById("registerForm").reset();

        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);

        // Optional redirect
         window.location.href = "CreatBestXI.html";
      } else {
        alert(result.message || "Registration Failed");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Cannot connect to server");
    }
  });