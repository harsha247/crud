// Contact form handler
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Your message has been submitted successfully.");
  this.reset();
});

// CRUD logic
let selectedIndex = null;
let dataList = [];

const crudForm = document.getElementById("crudForm");

crudForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();
  const address = document.getElementById("address").value.trim();

  const newData = { name, email, age, address };

  if (selectedIndex === null) {
    dataList.push(newData);
  } else {
    dataList[selectedIndex] = newData;
    selectedIndex = null;
  }

  renderTable();
  crudForm.reset();
});

function renderTable() {
  const tbody = document.getElementById("crudTableBody");
  tbody.innerHTML = "";

  dataList.forEach((data, i) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${data.name}</td>
      <td>${data.email}</td>
      <td>${data.age}</td>
      <td>${data.address}</td>
      <td>
        <button class="btn btn-sm btn-info me-1" onclick="editRow(${i})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteRow(${i})">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function editRow(index) {
  const data = dataList[index];
  document.getElementById("name").value = data.name;
  document.getElementById("email").value = data.email;
  document.getElementById("age").value = data.age;
  document.getElementById("address").value = data.address;
  selectedIndex = index;
}

function deleteRow(index) {
  if (confirm("Are you sure you want to delete this entry?")) {
    dataList.splice(index, 1);
    renderTable();
    crudForm.reset();
    selectedIndex = null;
  }
}
