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
        <details>
          <summary>
            <span role="img" aria-label="Next Birthday">
              Nächster runder Geburtsmoment: 🎉
            </span>
          </summary>
          <ul>
            {this.state.next &&
              this.state.next
                .sort((a, b) => a.age - b.age)
                .map((next) => {
                  var now = new Date().getTime();
                  var className = next.date - now < 0 ? "past" : "future";
                  return (
                    <li className={className}>
                      {Number(next.age).toLocaleString()}{" "}
                      {this.props.getUnit().label}:{" "}
                      {new Date(next.date).toLocaleString()}
                    </li>
                  );
                })}
          </ul>
        </details>
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

  toDate(nextTimeStamp) {
    return (
      this.state.birthdayTime + nextTimeStamp * this.props.getUnit().factor
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
      var next1 = ceil * factor;
      var next2 = Math.pow(10, length + 1);
      var next3 = next2 * 0.25;
      var next4 = next2 * 0.5;
      var next5 = next2 * 0.75;

      var next = [
        {
          age: next1,
          date: this.toDate(next1),
        },
        {
          age: next3,
          date: this.toDate(next3),
        },
        {
          age: next4,
          date: this.toDate(next4),
        },
        {
          age: next5,
          date: this.toDate(next5),
        },
        {
          age: next2,
          date: this.toDate(next2),
        },
      ];

      this.setState({
        age,
        next,
      });
    }, 1);
  }
}
