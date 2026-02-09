let users = [
    { name: "Ahmed", email: "ahmed@mail.com", age: 25, specialty: "Frontend" },
    { name: "Sara", email: "sara@mail.com", age: 23, specialty: "Backend" }
  ];

  
function addUser() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;
    let specialty = document.getElementById("specialty").value;


let User = {
    name: name,
    age: age,
    email: email,
    specialty: specialty,
  };

  users.push(user);
  displayUsers();
}

function displayUsers() {
    let ul = document.getElementById("studentsList");
    ul.innerHTML = "";
  
    students.forEach((student, x) => {
      let li = document.createElement("li");
      li.innerHTML = `
        ${student.name} - ${student.age} - ${student.grade}
        <button onclick="removeStudent(${x})">Remove</button>
      `;
      ul.appendChild(li);
    });
  }
