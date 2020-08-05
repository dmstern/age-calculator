import React, { Component } from "react";
import "./styles.css";
import Person from "./Person";
import units from "./Units";
import { l10n } from "./l10n";
import Icon from "./Icons";

export default class App extends Component {
  constructor() {
    super();
    this.units = units;
    this.state = { persons: [] };
  }

  componentDidMount() {
    this.handleUnitChange();
  }

  submit = (event) => {
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
        getLabels={this.getLabels}
        getUnit={() => {
          return {
            factor: this.units[this.state.unit].factor,
            label: this.getLabels()[this.state.unit],
          };
        }}
        remove={() => {
          this.removePerson(hash);
        }}
      />
    );

    this.setState({
      persons,
    });

    document.getElementById("form").reset();
  };

  removePerson(id) {
    var really = window.confirm(
      `${this.getLabels().doYouWant} ${
        this.state.persons.find((person) => person.props.id === id).props.name
      } ${this.getLabels().fromTheList}`
    );
    if (really) {
      var persons = this.state.persons.filter(
        (person) => person.props.id !== id
      );
      this.setState({
        persons,
      });
    }
  }

  handleUnitChange = () => {
    var unit = document.querySelector("[name=unit]").value;
    this.setState({
      unit,
    });
  };

  getLabels() {
    var lang = document.querySelector("html").lang;

    if (!(lang in l10n)) {
      lang = "en";
    }

    return l10n[lang];
  }

  render() {
    return (
      <div className="App" onSubmit={this.submit}>
        <h1>{this.getLabels().appName}</h1>
        <div className="forms">
          <form id="form">
            <label>
              <span>{this.getLabels().name}: </span>
              <input type="text" name="name" required />
            </label>
            <label>
              <span>{this.getLabels().birthday}: </span>
              <span className="dateTimePicker">
                <input type="date" name="birthday" required />
                <input type="time" name="birthtime" required />
              </span>
            </label>
            <div className="formFooter">
              <button type="submit">
                <Icon icon="addPerson" /> {this.getLabels().add}
              </button>
              <button type="reset">
                {" "}
                <Icon icon="reset" /> {this.getLabels().reset}
              </button>
            </div>
          </form>
          <form>
            <label>
              <span>{this.getLabels().unit}: </span>
              <select
                name="unit"
                defaultValue={
                  Object.entries(this.units).find(
                    ([key, unit]) => unit.isDefault
                  )[0]
                }
                onChange={this.handleUnitChange}
              >
                {Object.entries(this.units).map(([key, value]) => (
                  <option value={key} name={key} key={key}>
                    {this.getLabels()[key]}
                  </option>
                ))}
              </select>
            </label>
          </form>
        </div>
        <div className="persons">
          {this.state.persons.map((person) => person)}
        </div>
      </div>
    );
  }
}
