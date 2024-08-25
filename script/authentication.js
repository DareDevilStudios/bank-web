
/*Forgot Password*/
function forgot() {
    const email = prompt("Enter your email");
    let useremail = localStorage.getItem('usermail');
    let userpass = localStorage.getItem('userpassword');

    if (email !== useremail) {
        alert("Email not found!");
    } else {
        alert("Your password is: " + userpass);
    }
}

/*Sign Up*/

function signup() {
    let name1 = document.getElementById('name');
    let name2 = document.getElementById('namel');
    let email = document.getElementById('mail');
    let passw = document.getElementById('password');



    if (name1.value === "") {
        name1.classList.add('border-red-500');
        name1.placeholder = "First name is required";

    }
    else if (name2.value === "") {
        name2.classList.add('border-red-500');
        name2.placeholder = "Last name is required";

    }
    else if (email.value === "") {
        email.classList.add('border-red-500');
        email.placeholder = "Email is required";

    }
    else if (passw.value === "") {
        passw.classList.add('border-red-500');
        passw.placeholder = "Password is required";

    }
    else {
        localStorage.setItem("usernamefirst", name1.value);
        localStorage.setItem("usernamelast", name2.value);
        localStorage.setItem("usermail", email.value);
        localStorage.setItem("userpassword", passw.value);
        alert("You have successfully registered!");
        window.location.href = "login.html";
    }
}
/* Password Toggle */
const eye = document.getElementById('show');
eye.addEventListener('click', function () {
    const passwo = document.getElementById('password');
    if (passwo.type === 'password') {
        passwo.type = 'text';
    } else {
        passwo.type = 'password';
    }
}
);

function icon() {
    document.getElementById('eyeicon').src = "./images/cross.jpg"
}

/* Login */
function login() {
    const email = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    const useremail = localStorage.getItem('usermail');
    const userpass = localStorage.getItem('userpassword');
    const emailInput = document.getElementById('mail');
    const passwordInput = document.getElementById('password');

    if (email !== useremail) {
        emailInput.style.borderColor = 'red';
        emailInput.placeholder = "Mail is incorrect";
        emailInput.value = '';
    } else if (password !== userpass) {
        passwordInput.style.borderColor = 'red';
        passwordInput.placeholder = "Password is incorrect";
        passwordInput.value = '';
    } else {

        localStorage.setItem("loginEmail", email);
        localStorage.setItem("password", password);
        alert("Logged in successfully!");
        window.location.href = "home.html";
    }
}

function toggleSection(sectionId) {
    document.getElementById('transaction').style.display = 'none';
    document.getElementById('withdraw').style.display = 'none';
    document.getElementById('deposit').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}
let balance = 0;
localStorage.setItem("userbalance", balance);
let receiverAccount = ""; // Global variable for receiver account

function transac() {
    receiverAccount = document.getElementById('accountrec').value;
    let amount = document.getElementById('amount').value;
    if (amount !== "" && !isNaN(amount) && parseInt(amount) > 0) { // Check for valid amount
        let currentBalance = localStorage.getItem('userbalance');
        let newBalance = parseInt(currentBalance) - parseInt(amount);

        if (newBalance < 2000) {
            alert("Insufficient balance to send this amount.");
            history("SEND", 0, amount);
        } else {
            localStorage.setItem('userbalance', newBalance);
            alert(`Rs.${amount} sent successfully.`);
            alert("Your balance is " + newBalance);
            history("SEND", 1, amount);
        }
    } else {
        alert("Please enter a valid amount.");
    }
}

function withdraw() {
    const withdrawAmount = document.getElementById('draw').value;
    let amount = localStorage.getItem('userbalance');
    if (withdrawAmount !== "" && !isNaN(withdrawAmount) && parseInt(withdrawAmount) > 0) { // Check for valid amount
        let newAmount = parseInt(amount) - parseInt(withdrawAmount);

        if (newAmount < 2000) {
            alert("Insufficient balance");
            history("WITHDRAW", 0, withdrawAmount);
        } else {
            localStorage.setItem('userbalance', newAmount);
            alert("Rs." + withdrawAmount + " withdrawn successfully.");
            alert("Your balance is " + newAmount);
            history("WITHDRAW", 1, withdrawAmount);
        }
    } else {
        alert("Please enter a valid amount.");
    }
}

function deposit() {
    const depositAmount = document.getElementById('depo').value;
    let amount = localStorage.getItem('userbalance');
    if (depositAmount !== "" && !isNaN(depositAmount) && parseInt(depositAmount) > 0) { // Check for valid amount
        let newAmount = parseInt(amount) + parseInt(depositAmount);
        localStorage.setItem('userbalance', newAmount);
        alert("Rs." + depositAmount + " deposited successfully.");
        alert("Your balance is " + newAmount);
        history("DEPOSIT", 1, depositAmount);
    } else {
        alert("Please enter a valid amount.");
    }
}

function displayProfile() {
    const email = localStorage.getItem('usermail');
    const name = localStorage.getItem('usernamefirst');
    const nam = localStorage.getItem('usernamelast');
    let amount = localStorage.getItem('userbalance');

    if (amount === null || amount === "") {
        amount = "0";
    }

    document.getElementById('row1').innerHTML = 'Name: ' + name + " " + nam;
    document.getElementById('row2').innerHTML = 'Email id: ' + email;
    document.getElementById('row3').innerHTML = "Balance: " + amount;
}

function history(transactionType, result, transactionAmount) {
    let amount = localStorage.getItem('userbalance');

    document.getElementById('type').innerHTML = transactionType;
    document.getElementById('money').innerHTML = transactionAmount;
    document.getElementById('bal').innerHTML = amount;

    if (transactionType === "DEPOSIT" || transactionType === "WITHDRAW") {
        document.getElementById('accnum').innerHTML = result === 1 ? "SELF" : "FAILED";
    } else if (transactionType === "SEND") {
        document.getElementById('accnum').innerHTML = result === 1 ? receiverAccount : "FAILED";
    }
}
