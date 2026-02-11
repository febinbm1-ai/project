const form = document.getElementById("contactForm");
const responseMsg = document.getElementById("response");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    console.log("Sending data:", data);

    try {
        const response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log("Response status:", response.status);

        const result = await response.json();
        console.log("Response body:", result);

        responseMsg.innerText = result.message || "Message sent";
        responseMsg.style.color = "green";

        // reset AFTER success
        form.reset();

    } catch (error) {
        console.error("Fetch error:", error);
        responseMsg.innerText = "Error sending message";
        responseMsg.style.color = "red";
    }
});
