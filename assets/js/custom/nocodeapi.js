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
        console.log("Success:", JSON.stringify(json[0]['fields']['record_id']));
        return json[0]['fields']['record_id'];
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}
