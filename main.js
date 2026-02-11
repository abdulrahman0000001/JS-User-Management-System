let users = [
  {},
  {
    name: "John Smith",
    age: 28,
    email: "john.smith@example.com",
    specialty: "Software Engineering"
  },
  {
    name: "Sarah Johnson",
    age: 32,
    email: "sarah.johnson@example.com",
    specialty: "Data Science"
  },
  {
    name: "Michael Chen",
    age: 26,
    email: "michael.chen@example.com",
    specialty: "Web Development"
  },
  {
    name: "Emily Davis",
    age: 29,
    email: "emily.davis@example.com",
    specialty: "UI/UX Design"
  },
  {
    name: "David Wilson",
    age: 35,
    email: "david.wilson@example.com",
    specialty: "DevOps"
  }
]
let manageMod = false

//basic display and add
function displayUsers() {
  let ul = document.getElementById("usr")
  ul.innerHTML = `<h2>Users</h2>`

  for(let i = 1; i < users.length; i++) {

    let li = document.createElement("li")
    li.innerHTML = 
      `${users[i].name}
      - ${users[i].age}
      - ${users[i].email}
      - ${users[i].specialty}`

    ul.appendChild(li)
  }
  updateSpecialties()
}

function addUser() {
  let name = document.getElementById("name").value
  let age = document.getElementById("age").value
  let email = document.getElementById("email").value
  let specialty = document.getElementById("specialty").value
  if(!name || !age || !email || !specialty) {
    alert("Enter all inputs")
    return
  }
  else if(age < 18) {
    alert("Age must be 18 and above")
    return
  }
  else if(!isValidEmail(email)) {
    alert("Please enter a valid email address")
    return
  }


  let user = {
    name: name,
    age: age,
    email: email,
    specialty: specialty
  }
  
  users.push(user)
  updateSpecialties()
    
  clearInput()
  if(!manageMod) {
    displayUsers()
  }
  else {
    displayAndManage()
  }
  
  
}



//editing mode
function displayAndManage() {
  manageMod = true
  let existingBtn = document.getElementById("closeBtn")
  if(existingBtn) {
    existingBtn.remove()
  }

  let closeBtn = document.createElement("button")
  closeBtn.innerHTML = "Close manage mode"
  closeBtn.id = "closeBtn"
  closeBtn.onclick = function() {
    closeManageMod()
    
  }
  document.getElementById("buttons").appendChild(closeBtn)


  document.getElementById("manageBtn").disabled = true
  let ul = document.getElementById("usr")
  ul.innerHTML = `<h2>Users</h2>`

  for(let i = 1; i < users.length; i++) {

    let li = document.createElement("li")
    li.innerHTML =
      `${users[i].name}
      - ${users[i].age}
      - ${users[i].email}
      - ${users[i].specialty}
      <button onclick="deleteUser(${i})">Delete User</button>
      <button onclick="editUser(${i})">Edit User</button>`
    ul.appendChild(li)
  }
}

function deleteUser(index) {
  let userName = users[index].name
  if(confirm(`You are about to delete ${userName}`)) {
    users.splice(index, 1)
    updateSpecialties()
    if(!manageMod) {
      displayUsers()
    }
    else {
      displayAndManage()
    }  
    if(users.length == 1) alert("There is no users")     
  }
  
}

function editUser(index) {
  document.getElementById("addBtn").disabled = true
  let usr = getUserValues(index)
  fillInput(usr.name, usr.age, usr.email, usr.specialty)
  
  let existingBtn = document.getElementById("saveBtn")
  if(existingBtn) {
    existingBtn.remove()
  }
  
  let saveBtn = document.createElement("button")
  saveBtn.innerHTML = "Save User"
  saveBtn.id = "saveBtn"
  saveBtn.onclick = function() {
    saveUser(index)
    document.getElementById("addBtn").disabled = false
    saveBtn.remove()
    cancelBtn.remove()
  }
  document.getElementById("buttons").appendChild(saveBtn)

  let cancelBtn = document.createElement("button")
  cancelBtn.innerHTML = "Cancel Edit"
  cancelBtn.id = "cancelBtn"
  cancelBtn.onclick = function() {
    clearInput()
    document.getElementById("addBtn").disabled = false
    cancelBtn.remove()
    saveBtn.remove()
  }
  document.getElementById("buttons").appendChild(cancelBtn)
}

function saveUser(index) {
 
  let usr2 = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    email: document.getElementById("email").value,
    specialty: document.getElementById("specialty").value
  }
  users.splice(index, 1)

  users.splice(index, 0, usr2)
  updateSpecialties()
  clearInput()

  displayAndManage()
  document.getElementById("addBtn").disabled = false
}

function closeManageMod() {
  clearInput()
  let existingBtn = document.getElementById("saveBtn")
  if(existingBtn) {
    existingBtn.remove()
  }

  let existingBtn2 = document.getElementById("cancelBtn")
  if(existingBtn) {
    existingBtn2.remove()
  }


  let closeBtn = document.getElementById("closeBtn")
  closeBtn.remove()

  displayUsers()

  document.getElementById("manageBtn").disabled = false
  document.getElementById("addBtn").disabled = false
  manageMod = false
}





//search engine & specialties
function searchEngine(value = "", specialty = "") {
  let ul = document.getElementById("usr")
  ul.innerHTML = `<h2>Users</h2>`

  if (specialty === "" && value === "") {
  displayUsers()
  return
  }
  let found = false

  for (let i = 1; i < users.length; i++) {
  let isMatch = isFound(value, specialty, i)
  
  if (isMatch[0] && isMatch[1]) {
    found = true

    let li = document.createElement("li")
    li.innerHTML = `
      ${users[i].name}
      - ${users[i].age}
      - ${users[i].email}
      - ${users[i].specialty}
    `
    ul.appendChild(li)
  }
  }

  if (!found) {
  ul.innerHTML += `<li>No users found</li>`
  }
}

function getSpecialties() {
  let specialties = []
  for (let i = 1; i < users.length; i++) {
    if (!specialties.includes(users[i].specialty) && users[i].specialty) {
      specialties.push(users[i].specialty)
    }
  }
  return specialties.sort()
}

function updateSpecialties() {
  let select = document.getElementById("specialtyFilter")
  
  let currentValue = select.value
  select.innerHTML = '<option value="">All Specialties</option>'
  
  let specialties = getSpecialties()
  for (let i = 0; i < specialties.length; i++) {
    let option = document.createElement("option")
    option.value = specialties[i]
    option.innerHTML = specialties[i]
    select.appendChild(option)
  }
  
  select.value = currentValue
}

function isFound(value, specialty, index) {
  let nameMatch = value === "" || users[index].name.toLowerCase().includes(value.toLowerCase())
  let specialtyMatch = specialty === "" || users[index].specialty === specialty

  return [nameMatch, specialtyMatch]
  
}





//simplify code
function getUserValues(index) {
  return {
    name: users[index].name,
    age: users[index].age,
    email: users[index].email,
    specialty: users[index].specialty
  }
}

function clearInput() {
  document.getElementById("name").value = ""
  document.getElementById("age").value = ""
  document.getElementById("email").value = ""
  document.getElementById("specialty").value = ""
}

function fillInput(name, age, email, specialty) {
  document.getElementById("name").value = name
  document.getElementById("age").value = age
  document.getElementById("email").value = email
  document.getElementById("specialty").value = specialty
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

