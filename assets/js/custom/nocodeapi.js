async function registerUser(member, callback) {
  var username = member.username;
  var email = member.email;
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
        console.log(member);
        return callback(member, {"register_id": json[0]['fields']['record_id']})
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}
