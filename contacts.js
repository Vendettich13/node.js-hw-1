const uniqid = require("uniqid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const searchedContact = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    if (!searchedContact) {
      return null;
    }
    return searchedContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const searchedContact = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    const contactToDelete = contacts.indexOf(searchedContact);
    if (contactToDelete === -1) {
      return null;
    }
    const [splicedArr] = contacts.splice(contactToDelete, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return splicedArr;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const contactToAdd = { id: uniqid(), name, email, phone };

    contacts.push(contactToAdd);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return contactToAdd;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
