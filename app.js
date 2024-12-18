const validPasswords = ['TejashwiniSUranakar', 'wx3nf0', 'ax3p6h','1zp5qm','ld1k0o','k0m1sv']; 

// Logged-in users list (retrieved from localStorage if available)
let loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || [];
let loginDetails = JSON.parse(localStorage.getItem('loginDetails')) || [];

// Handle login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const status = document.getElementById('login-status');
    
    // Check if the password is valid
    if (validPasswords.includes(password)) {
        loggedInUsers.push(username);
        localStorage.setItem('loggedInUsers', JSON.stringify(loggedInUsers));  // Save to localStorage
        
        const currentTime = new Date().toLocaleString();  // Get current time
        loginDetails.push({ username, password, time: currentTime });
        localStorage.setItem('loginDetails', JSON.stringify(loginDetails));  // Store login details

        status.textContent = 'Access Granted';
        status.style.color = 'green';


        hideAdminDashboard();  // Hide admin view when new login occurs
        if (username === 'TejashwiniSUranakar') {
            showAdminDashboard();
        }
    } else {
        status.textContent = 'Access Denied';
        status.style.color = 'red';
    }
});

// Show admin view if user is logged in as admin
function showAdminDashboard() {
    document.getElementById('admin-view').style.display = 'block';
    const userList = document.getElementById('userList');
    userList.innerHTML = loggedInUsers.map(user => `<li>${user}</li>`).join('');

    const loginDetailsList = document.getElementById('loginDetailsList');
    loginDetailsList.innerHTML = loginDetails.map(detail => 
        `<li>${detail.username} logged in with ${detail.password} at ${detail.time}</li>`
    ).join('');
}

// Hide admin view when new login occurs
function hideAdminDashboard() {
    document.getElementById('admin-view').style.display = 'none';
}

// Clear the admin dashboard and reset localStorage data
function clearAdminDashboard() {
    // Clear data from localStorage
    localStorage.removeItem('loggedInUsers');
    localStorage.removeItem('loginDetails');

    // Reset the displayed lists on the page
    document.getElementById('userList').innerHTML = '';
    document.getElementById('loginDetailsList').innerHTML = '';

    // Optionally hide the admin view after clearing
    document.getElementById('admin-view').style.display = 'none';

    // Optionally, display a message
    alert('Dashboard data cleared!');
}


