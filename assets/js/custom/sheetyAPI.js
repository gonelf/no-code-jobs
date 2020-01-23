async function registerUser(member, callback) {
  var username = member.username;
  var email = member.email;
    try {
        const response = await fetch("https://v2-api.sheety.co/a0ec0d951abaa3c46c358969a6b2f696/nocodeDb/users/", {
            method: "post",
			      body: JSON.stringify([{"username":username,"email":email}]),
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
            method: "patch",
			body: JSON.stringify([record]),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        return callback(json);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getUser(record_id, callback) {
    try {
        const response = await fetch("https://v2-api.sheety.co/a0ec0d951abaa3c46c358969a6b2f696/nocodeDb/users/?id="+record_id, {
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

async function getUsers(callback) {
    try {
        const response = await fetch("https://v2-api.sheety.co/a0ec0d951abaa3c46c358969a6b2f696/nocodeDb/users", {
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
