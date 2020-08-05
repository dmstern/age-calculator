import React, { Component } from "react";
import { TrashIcon, ShowIcon, BellIcon, HideIcon } from "./Icons";

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
        <span className="person__text">
          <span className="person__name">{this.props.name}</span> (
          <span
            title={`🐣 ${this.state.birthday}`}
            role="img"
            className="emoji"
            aria-label={this.props.getLabels().dateOfBirth}
          >
            🐣
          </span>
          ) {this.props.getLabels().isNow}{" "}
          <strong className="person__age">
            {Number(this.state.age).toLocaleString()}{" "}
          </strong>
          {this.props.getUnit().label} {this.props.getLabels().old}.
        </span>
        <details>
          <summary>
            <span
              aria-label={this.props.getLabels().nextMoment}
              className="party"
              role="img"
              aria-hidden="true"
            >
              🎉
            </span>
            <ShowIcon />
            <HideIcon />
          </summary>
          <ul class="content">
            <h3>
              {this.props.getLabels().nextMoment}:{" "}
              <span className="emoji" role="img" aria-hidden="true">
                🎉
              </span>
            </h3>
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
          className="btn--naked btn--remove"
          onClick={this.props.remove}
          title={this.props.getLabels().remove}
        >
          <TrashIcon />
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
    var now = Date.now();

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
