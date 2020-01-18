async function registerUser(username, email) {
    try {
        const response = await fetch("https://v1.nocodeapi.com/nocodery/airtable/JbqRxeaBwbmMXsBU", {
            method: "post",
			      body: JSON.stringify([{"Username":username,"Email":email}]),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        console.log("Success:", JSON.stringify(json));
    } catch (error) {
        console.error("Error:", error);
    }
}
