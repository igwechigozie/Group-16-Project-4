
// Student Grade Calculator
var records = [];

var savedRecords = localStorage.getItem("studentRecords");
if (savedRecords !== null) {
  records = JSON.parse(savedRecords);
}


// Runs when the user clicks the "Calculate Grade" button
function calculateGrade() {

  // 1. Get the values from the input boxes
  var nameInput = document.getElementById("studentName");
  var score1Input = document.getElementById("score1");
  var score2Input = document.getElementById("score2");
  var score3Input = document.getElementById("score3");

  var name = nameInput.value.trim();
  var score1 = Number(score1Input.value);
  var score2 = Number(score2Input.value);
  var score3 = Number(score3Input.value);

  // 2. Check that everything was filled in correctly
  if (name === "") {
    alert("Please enter the student's name.");
    return; // stop the function here
  }

  if (score1Input.value === "" || score2Input.value === "" || score3Input.value === "") {
    alert("Please enter all three assessment scores.");
    return;
  }

  if (score1 < 0 || score1 > 100 || score2 < 0 || score2 > 100 || score3 < 0 || score3 > 100) {
    alert("Scores must be between 0 and 100.");
    return;
  }

  // 3. Do the maths
  var total = score1 + score2 + score3;
  var average = total / 3;
  var grade = getGradeLetter(average);
  var status = average >= 40 ? "PASS" : "FAIL";

  // 4. Build a simple object to represent this student
  var student = {
    id: Date.now(), // a unique number based on the current time
    name: name,
    score1: score1,
    score2: score2,
    score3: score3,
    total: total,
    average: average.toFixed(2), // round to 2 decimal places
    grade: grade,
    status: status
  };

  // 5. Add it to our list and save everything
  records.push(student);
  saveRecords();

  // 6. Update the page and clear the form
  showRecords();
  clearForm();
}


// Works out the letter grade based on the average score
function getGradeLetter(average) {
  if (average >= 70) {
    return "A";
  } else if (average >= 60) {
    return "B";
  } else if (average >= 50) {
    return "C";
  } else if (average >= 45) {
    return "D";
  } else if (average >= 40) {
    return "E";
  } else {
    return "F";
  }
}


// Saves the records array into localStorage so it's not lost on refresh
function saveRecords() {
  localStorage.setItem("studentRecords", JSON.stringify(records));
}


// Clears the input boxes after a record is saved
function clearForm() {
  document.getElementById("studentName").value = "";
  document.getElementById("score1").value = "";
  document.getElementById("score2").value = "";
  document.getElementById("score3").value = "";
}


// Displays all the student records on the page
function showRecords() {

  var recordsDiv = document.getElementById("records");

  // If there are no records, show a simple message
  if (records.length === 0) {
    recordsDiv.innerHTML = '<p class="empty">No student records yet.</p>';
    return;
  }

  // Otherwise, build up the HTML for every record
  var html = "";

  for (var i = 0; i < records.length; i++) {
    var student = records[i];

    html += '<div class="record">';
    html += "<h3>" + student.name + "</h3>";
    html += "<p><strong>Assessment 1:</strong> " + student.score1 + "</p>";
    html += "<p><strong>Assessment 2:</strong> " + student.score2 + "</p>";
    html += "<p><strong>Assessment 3:</strong> " + student.score3 + "</p>";
    html += "<p><strong>Total Score:</strong> " + student.total + "</p>";
    html += "<p><strong>Average Score:</strong> " + student.average + "</p>";
    html += "<p><strong>Grade:</strong> " + student.grade + "</p>";
    html += "<p><strong>Status:</strong> " + student.status + "</p>";
    html += '<button class="delete-btn" onclick="deleteRecord(' + student.id + ')">Delete Record</button>';
    html += "</div>";
  }

  recordsDiv.innerHTML = html;
}


// Removes a single record by its id
function deleteRecord(id) {

  var newRecords = [];

  // keep every record that does NOT match the id we want to delete
  for (var i = 0; i < records.length; i++) {
    if (records[i].id !== id) {
      newRecords.push(records[i]);
    }
  }

  records = newRecords;
  saveRecords();
  showRecords();
}



// connect the button click to our function
document.getElementById("calculateBtn").addEventListener("click", calculateGrade);

// show any records that were already saved
showRecords();