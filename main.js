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
  let user = getInputValues()
  let isValid = validateInput(user)
  if(!isValid) return


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
  let ul = document.getElementById("usr")
  ul.innerHTML = `<h2>Users</h2>`
  manageMod = true
  let existingBtn = document.getElementById("closeBtn")
  if(existingBtn) {
    existingBtn.remove()
  }

  let closeBtn = document.createElement("button")
  closeBtn.innerHTML = "Close manage mode"
  closeBtn.id = "closeBtn"
  closeBtn.style.marginRight = "8px"
  closeBtn.onclick = function() {
    closeManageMod()
    
  }
  document.getElementById("buttons").appendChild(closeBtn)


  document.getElementById("manageBtn").disabled = true


  for(let i = 1; i < users.length; i++) {

    let li = document.createElement("li")
    li.innerHTML =
      `${users[i].name}
      - ${users[i].age}
      - ${users[i].email}
      - ${users[i].specialty}
      <button class="delete-btn" onclick="deleteUser(${i})">Delete User</button>
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

  if(!existingBtn) {
    let saveBtn = document.createElement("button")
    saveBtn.innerHTML = "Save User"
    saveBtn.id = "saveBtn"
    saveBtn.style.marginRight = "8px"
    
    saveBtn.onclick = function() {

      let isCompleted = saveUser(index)
      if(!isCompleted) return
      
      document.getElementById("addBtn").disabled = false
      document.getElementById("saveBtn").remove()
      document.getElementById("cancelBtn").remove()
    }
    document.getElementById("buttons").appendChild(saveBtn)
  }
  
  
  existingBtn = document.getElementById("cancelBtn")

  if(!existingBtn) {
    let cancelBtn = document.createElement("button")
    cancelBtn.innerHTML = "Cancel Edit"
    cancelBtn.style.marginRight = "8px"
    cancelBtn.id = "cancelBtn"
    document.getElementById("buttons").appendChild(cancelBtn)
  }

  let cancelBtn = document.getElementById("cancelBtn")
  cancelBtn.onclick = function() {
    clearInput()
    document.getElementById("addBtn").disabled = false
    document.getElementById("cancelBtn").remove()
    document.getElementById("saveBtn").remove()
  }
  
  
}

function saveUser(index) {
  let user = getInputValues()
  let isValid = validateInput(user)
  if(!isValid) {
    return false
  }

  users.splice(index, 1)

  users.splice(index, 0, user)

  updateSpecialties()
  clearInput()

  displayAndManage()
  document.getElementById("addBtn").disabled = false
  
  return true
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

  if (specialty === "" && value === "" && !manageMod) {
    displayUsers()
  return
  }
  else if(specialty === "" && value === "" && manageMod) {
    displayAndManage()
    return
  }

  let found = false

  for (let i = 1; i < users.length; i++) {
  let isMatch = isFound(value, specialty, i)
  
  if (isMatch[0] && isMatch[1]) {
    found = true

    let li = document.createElement("li")
    if(!manageMod) {
    li.innerHTML = `
    ${users[i].name}
    - ${users[i].age}
    - ${users[i].email}
    - ${users[i].specialty}
    `
      ul.appendChild(li)
    }
    else {
      li.innerHTML = `
      ${users[i].name}
      - ${users[i].age}
      - ${users[i].email}
      - ${users[i].specialty}
      <button class="delete-btn" onclick="deleteUser(${i})">Delete User</button>
      <button onclick="editUser(${i})">Edit User</button>
    `
    ul.appendChild(li)
    }

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
function getInputValues() {
  let user = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    email: document.getElementById("email").value,
    specialty: document.getElementById("specialty").value
  }
  return user
}
function validateInput(user = {}) {
  let isValid = true
  if(!user.name || !user.age || !user.email || !user.specialty) {
    alert("Enter all inputs")
    isValid = false
    return
  }
  else if(user.age < 18) {
    alert("Age must be 18 and above")
    isValid = false
    return
  }
  else if(!isValidEmail(user.email)) {
    alert("Please enter a valid email address")
    isValid = false
    return
  }
  return isValid
  
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

