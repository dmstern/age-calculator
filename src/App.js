import React, { Component } from "react";
import "./styles.css";
import Person from "./Person";

export default class App extends Component {
  constructor() {
    super();
    this.units = {
      milliseconds: {
        factor: 1,
        label: "Millisekunden"
      },
      seconds: {
        factor: 1000,
        label: "Sekunden"
      },
      minutes: {
        factor: 1000 * 60,
        label: "Minuten"
      },
      hours: {
        factor: 1000 * 60 * 60,
        label: "Stunden"
      },
      days: {
        factor: 1000 * 60 * 60 * 24,
        label: "Tage"
      },
      weeks: {
        factor: 1000 * 60 * 60 * 24 * 7,
        label: "Wochen"
      },
      months: {
        factor: 1000 * 60 * 60 * 24 * 30.4,
        label: "Monate"
      },
      years: {
        factor: 1000 * 60 * 60 * 24 * 365,
        label: "Jahre"
      },
      marsyears: {
        factor: 1000 * 60 * 60 * 24 * 687,
        label: "Marsjahre"
      }
    };
    this.state = { persons: [] };
  }

  componentDidMount() {
    this.handleUnitChange();
  }

  submit = event => {
    event.preventDefault();
    var name = document.querySelector("[name=name]").value;
    var birthDate = document.querySelector("[name=birthday]").value;
    var birthTime = document.querySelector("[name=birthtime]").value;
    var hash = Math.random() * 10000000000000000;
    var persons = this.state.persons.concat(
      <Person
        key={hash}
        id={hash}
        name={name}
        birthDate={birthDate}
        birthTime={birthTime}
        getFactor={this.getFactor}
        getUnitLabel={this.getUnitLabel}
        remove={() => {
          this.removePerson(hash);
        }}
      />
    );

    this.setState({
      persons
    });

    document.getElementById("form").reset();
  };

  removePerson(id) {
    var really = window.confirm(
      `Willst du ${
        this.state.persons.find(person => person.props.id === id).props.name
      } wirklich aus der Liste entfernen?`
    );
    if (really) {
      var persons = this.state.persons.filter(person => person.props.id !== id);
      this.setState({
        persons
      });
    }
  }

  getFactor = () => {
    return this.units[this.state.unit].factor;
  };

  getUnitLabel = () => {
    return this.units[this.state.unit].label;
  };

  handleUnitChange = () => {
    var unit = document.querySelector("[name=unit]").value;
    this.setState({
      unit
    });
  };

  render() {
    return (
      <div className="App" onSubmit={this.submit}>
        <h1>Age Calculator</h1>
        <div className="forms">
          <form id="form">
            <label>
              <span>Name: </span>
              <input type="text" name="name" required />
            </label>
            <label>
              <span>Geburtstag: </span>
              <input type="date" name="birthday" required />
              <input type="time" name="birthtime" required />
            </label>
            <div className="formFooter">
              <button type="submit">
                <span role="img" aria-labelledby="Add">
                  ➕ Hinzufügen
                </span>
              </button>
              <button type="reset">
                {" "}
                <span role="img" aria-labelledby="Reset">
                  🔃
                </span>{" "}
                Zurücksetzen
              </button>
            </div>
          </form>
          <form>
            <label>
              <span>Einheit: </span>
              <select name="unit" onChange={this.handleUnitChange}>
                {Object.entries(this.units).map(([key, value]) => (
                  <option value={key} name={key}>
                    {value.label}
                  </option>
                ))}
              </select>
            </label>
          </form>
        </div>
        <div className="persons">
          {this.state.persons.map(person => person)}
        </div>
      </div>
    );
  }
}
