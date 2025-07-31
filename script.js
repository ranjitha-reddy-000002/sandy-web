function startSurvey() {
  const number = document.getElementById('mobileNumber').value;
  
  if (!number || number.length < 10) {
    alert("Please enter a valid mobile number.");
    return;
  }

  // Save mobile number locally (for demo purposes)
  localStorage.setItem("mobile", number);

  // Simulate moving to next page (e.g., question form)
  document.getElementById('response').textContent = 
    "Mobile number saved! Ready for questions...";

  // Later, you can redirect to questions page:
  // window.location.href = "questions.html";
}
