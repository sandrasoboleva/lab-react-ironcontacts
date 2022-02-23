// src/App.js
import contacts from "./contacts.json";
import React from "react";
import "./App.css";

//console.log('this is first 5 contacts', fiveContactsArr)

function App() {
  let fiveContactsArr = contacts.slice(0, 5);
  let restArr = contacts.slice(5, contacts.length);
  let randomContact = restArr[Math.floor(Math.random() * restArr.length)];

  const [contact, setContact] = React.useState(fiveContactsArr);
  const [random, setRandom] = React.useState(randomContact);
  const [ascending, setAscending] = React.useState(true);

  const addRandom = () => {
    let doesExist = contact.includes(randomContact);
    if (!doesExist) {
      setContact(contact.concat(randomContact));
    }
    setRandom({});
  };

  const sortByName = () => {
    let copyArr = [...contact];
    if (ascending) {
      copyArr.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else {
      copyArr.sort((a, b) => (a.name < b.name ? 1 : -1));
    }
    setContact(copyArr);
    setAscending(!ascending);
  };

  const sortByPopularity = () => {
    let copyArr = [...contact];
    if (ascending) {
      copyArr.sort((a, b) => (a.popularity - b.popularity));
    } else {
      copyArr.sort((a, b) => (b.popularity - a.popularity));
    }
    setContact(copyArr);
    setAscending(!ascending);
  };

  const deleteContact = (contactToRemove) => {
    let filteredArr = contact.filter((contact) => {
      return contact !== contactToRemove;
    });

    setContact(filteredArr);
  };

  // console.log(restArr)
  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandom}>Add Random Contact</button>
      <button onClick={sortByName}>
        Sort By Name ({ascending ? "ascending" : "descending"})
      </button>
      <button onClick={sortByPopularity}>
        Sort By Popularuty ({ascending ? "ascending" : "descending"})
      </button>
      <table style={{ border: "1px solid black" }}>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularuty</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Action</th>
        </tr>
        {contact.map((props, i) => {
          return (
            <tr key={i}>
              <td>
                <img
                  style={{ wight: "100px", height: "100px" }}
                  src={props.pictureUrl}
                  alt="contact"
                />
              </td>
              <td>{props.name}</td>
              <td>{Math.round((props.popularity * 100) / 100)}</td>
              <td>{props.wonOscar ? "🏆" : ""}</td>
              <td>{props.wonEmmy ? "🏆" : ""}</td>
              <td>
              <button onClick={() => deleteContact(contact)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
