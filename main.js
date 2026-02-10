let users = [{}]
let manageMod = false
//basic display and add
function displayusers() {
    let ul = document.getElementById("stu")
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


    let user = {
        name: name,
        age: age,
        email: email,
        specialty: specialty
    }
    
    users.push(user)
        
    clearInput()
    if(!manageMod) {
        displayusers()
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
    let ul = document.getElementById("stu")
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
        displayusers()
        if(users.length == 1) alert("There is no users")
    }
}

function editUser(index) {
    document.getElementById("addBtn").disabled = true
    let stu = getStuValues(index)
    fillInput(stu.name, stu.age, stu.email, stu.specialty)
    
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
 
    let stu2 = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        email: document.getElementById("email").value,
        specialty: document.getElementById("specialty").value
    }
    users.splice(index, 1)

    users.splice(index, 0, stu2)
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

    displayusers()

    document.getElementById("manageBtn").disabled = false
    document.getElementById("addBtn").disabled = false
    manageMod = false
}

//simplify code
function getStuValues(index) {
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
