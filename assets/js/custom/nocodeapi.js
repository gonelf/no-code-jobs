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
        return callback(json[0]['fields']['record_id'])
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

async function updateRecord(record, callback) {
    try {
        const response = await fetch("https://v1.nocodeapi.com/nocodery/airtable/JbqRxeaBwbmMXsBU", {
            method: "post",
			body: JSON.stringify([record]),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        return callback(json[0]['fields']);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getUser(record_id, callback) {
    try {
        const response = await fetch("https://v1.nocodeapi.com/nocodery/airtable/JbqRxeaBwbmMXsBU?id="+record_id, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        return callback(json)
    } catch (error) {
        console.error("Error:", error);
    }
}
