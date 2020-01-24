async function registerUser(member, callback) {
  var username = member.username;
  var email = member.email;
  var id = member.id
  var body = {
        "user": {
          "resourceId": id,
          "username":username,
          "email":email,
          "createdDate": new Date().toISOString(),
          "updatedDate": new Date().toISOString()
        }
    }
    console.log("registerUser");
    console.log(body);
    try {
        const response = await fetch("https://v2-api.sheety.co/a0ec0d951abaa3c46c358969a6b2f696/nocodeDb/users", {
            method: "POST",
			      body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        return callback(json)
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

async function updateRecord(record, callback) {
    try {
        const response = await fetch("https://v2-api.sheety.co/a0ec0d951abaa3c46c358969a6b2f696/nocodeDb/users/", {
            method: "put",
			      body: JSON.stringify(record),
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
        const response = await fetch("https://v2-api.sheety.co/a0ec0d951abaa3c46c358969a6b2f696/nocodeDb/users/?resourceId="+record_id, {
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
