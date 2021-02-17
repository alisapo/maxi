import React, { Component } from 'react';

import '../css/App.css';

const
  namePattern = /^[A-Za-z]{3,16}$/,
  emailPattern = /^[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,6}$/i,
  passPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()}{><])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,}$/;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      form: {
        username: '',
        email: '',
        password: '',
        country: null,
        gender: null,
        terms: null
      },

      checked: {
        gender: '',
        terms: ''
      },

      err: {
        username: null,
        email: null,
        password: null,
        country: null,
        gender: null,
        terms: null
      }
    };

    this.countryList = [
      { value: "latvia", label: "Latvia" },
      { value: "lebanon", label: "Lebanon" },
      { value: "lesotho", label: "Lesotho" },
      { value: "liberia", label: "Liberia" },
      { value: "libya", label: "Libya" }
    ];

    this.handleData = this.handleData.bind(this);
  }

  handleData(name, value) {
    const { form, err } = this.state;
    let obj = {};
    obj = {
      ...form,
      [name]: value
    };
    this.setState({ form: obj }, () => {
      let errors = {};
      const isErrors = this.dataValidation(name, value);
      errors = {
        ...err,
        [name]: isErrors
      };
      this.setState({ err: errors });
    });
  }

  dataValidation(name, value) {
    let msg = null;

    try {
      switch (name) {
        case "username":
          if (!value || !namePattern.test(value)) msg = "Please enter a valid name";
          break;
        case "email":
          if (!value || !emailPattern.test(value)) msg = "Please enter a valid email address";
          break;
        case "password":
          if (!value || !passPattern.test(value)) msg = "Password must contain at least 6 symbols";
          break;
        case "country":
          if (!value) msg = "You must select your country";
          break;
        case "gender":
          if (!value) msg = "You must select the gender";
          break;
        case "terms":
          if (!value) msg = "You must accept the policies";
          break;
        default:
          break;
      }
      return msg;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { form, err } = this.state;

    return (
      <div className="app">
        <div className="container">
          <h1>Create a new account</h1>
          <form>
            <div className="username">
              <input
                name="username"
                type="text"
                placeholder="Enter your name"
                value={form.username}
                onInput={(e) => this.handleData(e.target.name, e.target.value)}
              />
              {!err.username ? '' : <div className="err-username">{err.username}</div>}
            </div>
            <div className="email">
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={form.email}
                onInput={(e) => this.handleData(e.target.name, e.target.value)}
              />
              {!err.email ? '' : <div className="err-email">{err.email}</div>}
            </div>
            <div className="password">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onInput={(e) => this.handleData(e.target.name, e.target.value)}
              />
              {!err.password ? '' : <div className="err-password">{err.password}</div>}
            </div>
            <div className="country">
              <select>
                <option>Select country</option>
                {this.countryList.map(country =>
                  <option value={country.value}>{country.label}</option>
                )}
              </select>
              {!err.country ? '' : <div className="err-country">{err.country}</div>}
            </div>
            <div className="gender">
              <div>
                <label>
                <input
                  name="gender"
                  value="male"
                  type="radio"
                />
                <span>Male</span>
                </label>
                <label>
                <input
                  name="gender"
                    value="female"
                  type="radio"
                />
                <span>Female</span>
                </label>
              </div>
              {!err.gender ? '' : <div className="err-gender">{err.gender}</div>}
            </div>
            <div className="terms">
              <div>
                <label>
                  <input type="checkbox" name="terms" />
                  <span>Accept <a href="#">terms</a> and <a href="#">conditions</a></span>
                </label>
              </div>
              {!err.terms ? '' : <div className="err-terms">{err.terms}</div>}
            </div>
            <button className="btn-disabled" type="submit">Sign up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
