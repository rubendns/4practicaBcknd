const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  fetch("/users/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (response.status === 204) {
        throw new Error("Invalid credentials");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`, errorData);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      } else {
        return { status: 'success' };
      }
    })
    .then((data) => {
      if (data.status === "success") {
        //console.log("Cookies generadas:");
        //console.log(document.cookie);
        alert("Login completed successfully!");
        window.location.replace("/users");
      } else {
        alert(data.error || "Invalid credentials");
      }
    })
    .catch((error) => {
      console.error("Error when making request:", error);
      alert("Invalid credentials. Please try again.");
    });
});
