// ADD FORM

var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");

// Form submit event
form.addEventListener("submit", addItem);

// Delete and edit events
itemList.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("delete")) {
    removeItem(e.target.parentElement);
  } else if (e.target && e.target.classList.contains("edit")) {
    editItem(e.target.parentElement);
  }
});

// Add Event
function addItem(e) {
  e.preventDefault();

  var newItem = document.getElementById("item").value;
  var description = document.getElementById("description").value;

  var li = createItem(newItem, description);

  // Append li to list
  itemList.appendChild(li);

  // Clear input fields
  form.reset();
}

// Edit item
function editItem(item) {
  var editForm = document.createElement("form");
  editForm.className = "edit-form";
  var itemText = item.firstChild.textContent;
  var itemDescription = item.childNodes[1].textContent;
  editForm.innerHTML = `
    <input type="text" class="form-control edit-item" value="${itemText}">
    <input type="text" class="form-control edit-description" value="${itemDescription}">
    <button type="submit" class="btn btn-primary btn-sm save">Save</button>
  `;
  item.innerHTML = "";
  item.appendChild(editForm);
}

// Save edited item
function saveItem(item, newText, newDescription) {
  var li = createItem(newText, newDescription);
  itemList.replaceChild(li, item);
}

// Delete item
function removeItem(item) {
  if (confirm("Are you sure?")) {
    itemList.removeChild(item);
  }
}

//Filter Items
filter.addEventListener("keyup", filterItems);

function filterItems(e) {
  var text = e.target.value.toLowerCase();
  var items = itemList.getElementsByTagName("li");
  Array.from(items).forEach(function (item) {
    var itemText = item.firstChild.textContent.toLowerCase();
    if (itemText.indexOf(text) !== -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function createItem(newText, newDescription) {
  var li = document.createElement("li");
  li.className = "list-group-item";
  var textNode = document.createTextNode(newText);
  var descriptionNode = document.createTextNode(newDescription);
  var deleteBtn = document.createElement("button");
  var editBtn = document.createElement("button");
  deleteBtn.className = "btn btn-secondary btn-sm float-right edit mr-2";
  editBtn.className = "btn btn-danger btn-sm float-right delete";

  editBtn.appendChild(document.createTextNode("X"));
  deleteBtn.appendChild(document.createTextNode("Edit"));

  li.appendChild(textNode);
  li.appendChild(descriptionNode);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  return li;
}
// Edit item
function editItem(item) {
  var editForm = document.createElement("form");
  editForm.className = "edit-form";
  var itemText = item.firstChild.textContent;
  var itemDescription = item.childNodes[1].textContent;
  editForm.innerHTML = `
    <input type="text" class="form-control edit-item" value="${itemText}">
    <input type="text" class="form-control edit-description" value="${itemDescription}">
    <button type="submit" class="btn btn-primary btn-sm save">Save</button>
  `;
  item.innerHTML = "";
  item.appendChild(editForm);

  // Add submit event listener to the edit form
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var newText = editForm.querySelector(".edit-item").value;
    var newDescription = editForm.querySelector(".edit-description").value;
    saveItem(item, newText, newDescription);
  });
}

