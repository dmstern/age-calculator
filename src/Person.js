import React, { Component } from "react";

export default class Person extends Component {
  constructor(state, props) {
    super(state, props);
    this.state = {};
    setInterval(this.update, 1);
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
          aria-label={this.props.getLabels().dateOfBirth}
        >
          🐣
        </span>{" "}
        {this.props.getLabels().isNow} {Number(this.state.age).toLocaleString()}{" "}
        {this.props.getUnit().label} {this.props.getLabels().old}.
        <details>
          <summary>{this.props.getLabels().nextMoment}: 🎉</summary>
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
          title={this.props.getLabels().remove}
        >
          ➖
        </button>
      </div>
    );
  }

  toDate(nextTimeStamp) {
    return (
      this.state.birthdayTime + nextTimeStamp * this.props.getUnit().factor
    );
  }

  update = () => {
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
  };
}