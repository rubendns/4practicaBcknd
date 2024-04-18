const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  fetch("/api/users/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) {
        alert("¡User created successfully!");
        setTimeout(() => {
          window.location.replace("/users/login");
        }, 200);
      } else {
        alert("There was a problem creating the user. Try again.");
      }
    })
    .catch((error) => {
      console.error("Request error:", error);
      alert("There was a problem processing the request. Try again.");
    });
});
