function startSurvey() {
  const number = document.getElementById('mobileNumber').value;

  if (!number || number.length < 10) {
    alert("Please enter a valid mobile number.");
    return;
  }

  // Save to localStorage
  localStorage.setItem("mobile", number);

  // Redirect to questions page
  window.location.href = "questions.html";
}

