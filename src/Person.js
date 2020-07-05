import React, { Component } from "react";
import { createLogicalAnd } from "typescript";

export default class Person extends Component {
  constructor(state, props) {
    super(state, props);
    this.state = {};
    this.init();
  }

  componentDidMount() {
    var birthdayTime = Date.parse(
      `${this.props.birthDate} ${this.props.birthTime}`
    );
    var birthday = new Date(birthdayTime).toLocaleString();
    this.setState({
      birthdayTime,
      birthday,
    });
  }

  toString() {
    return this.props.name;
  }

  render() {
    return (
      <div className="person">
        {this.props.name}
        <span
          title={`* ${this.state.birthday}`}
          role="img"
          aria-label="Date of Birth"
        >
          🐣
        </span>{" "}
        ist jetzt {Number(this.state.age).toLocaleString()}{" "}
        {this.props.getUnit().label} alt.
        <span
          title={`Nächster runder Geburtsmoment (${Number(
            this.state.next
          ).toLocaleString()} ${this.props.getUnit().label}): ${
            this.state.nextBirthday
          }`}
          role="img"
          aria-label="Next Birthday"
        >
          🎉
        </span>
        <button
          className="remove"
          onClick={this.props.remove}
          title="Entfernen"
        >
          <span role="img" aria-label="Remove">
            ➖
          </span>
        </button>
      </div>
    );
  }

  init() {
    setInterval(() => {
      var now = new Date().getTime();

      var age = Math.floor(
        (now - this.state.birthdayTime) / this.props.getUnit().factor
      );

      var length = age.toString().length - 1;
      var divisor = Math.pow(10, length);
      var decimal = age / divisor;
      var ceil = Math.ceil(decimal);
      var factor = Math.pow(10, length);
      var next = ceil * factor;

      var nextBirthday =
        this.state.birthdayTime + next * this.props.getUnit().factor;

      this.setState({
        age,
        next,
        nextBirthday: `${new Date(nextBirthday).toLocaleString()}`,
      });
    }, 1);
  }
}
