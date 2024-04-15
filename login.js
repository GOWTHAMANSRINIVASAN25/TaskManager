document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let useremail = document.getElementById("email").value;
    try {
        let user = await Login(username, useremail);
        console.log("User logged in:", user);
        window.location.href = 'task.html';
    } catch (error) {
        alert(error.message);
    }
});
const Login = async (username, useremail) => {
    try {
        let response = await fetch('./users.json');
        let data = await response.json();
        let users = data.users;
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let user = users.find((u) => u.name === username && u.email === useremail);
                if (user) {
                    resolve(user);
                } else {
                    reject(new Error("Invalid username or email id."));
                }
            }, 1000);
        });
    } catch (error) {
        alert(error);
    }
};