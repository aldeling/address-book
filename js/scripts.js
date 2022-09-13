//Business Logic for AddressBook
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

//Business Logic for Contact
function Contact(firstName, lastName, phoneNumber, address1, address2, workEmail, personEmail) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.address1 = address1;
  this.address2 = address2;
  this.workEmail = workEmail;
  this.personEmail = personEmail;
}

Contact.prototype.fullName = function() {
return this.firstName + " " + this.lastName;
};



//UI Logic

let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText =  null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const br = document.createElement("br");
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    li.append("\nPhone Number: " + contact.phoneNumber);
    ul.append(li);
    ul.append(br);
  });
  contactsDiv.append(ul);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedAddressOne = document.querySelector("input#new-address-one").value;
  const inputtedAddressTwo = document.querySelector("input#new-address-two").value;
  const inputtedWorkEmail = document.querySelector("input#new-work-email").value;
  const inputtedPersonalEmail = document.querySelector("input#new-personal-email").value;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedAddressOne, inputtedAddressTwo, inputtedWorkEmail, inputtedPersonalEmail);
  addressBook.addContact(newContact);
  console.log(addressBook);
  listContacts(addressBook);
}

window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
});
