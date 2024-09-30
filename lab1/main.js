function handleEmailAlert(event) {
    const email = document.querySelector('#subscribe-form input[type="email"]').value;
    window.alert("Subscribed email: " + email);
}

window.onload = function() {
    document.getElementById("subscribe-form").addEventListener("submit", handleEmailAlert);
}