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
              <div>
                <div className="back-img-mail">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <path class="a"
                      d="M19,4H5A3,3,0,0,0,2,7V17a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7a3,3,0,0,0-3-3Zm-.67,2L12,10.75,5.67,6ZM19,18H5a1,1,0,0,1-1-1V7.25l7.4,5.55a1,1,0,0,0,1.2,0L20,7.25V17A1,1,0,0,1,19,18Z"
                      transform="translate(-2 -4)" />
                  </svg>
                </div>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={form.email}
                  onInput={(e) => this.handleData(e.target.name, e.target.value)}
                />
              </div>
              {!err.email ? '' : <div className="err-email">{err.email}</div>}
            </div>
            <div className="password">
              <div>
                <div className="back-img-pass">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19.89" viewBox="0 0 16 19.89">
                    <path class="a"
                      d="M17,8H16V6.11a4,4,0,0,0-8,0V8H7a3,3,0,0,0-3,3v8a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V11A3,3,0,0,0,17,8ZM10,6.11a2,2,0,1,1,4,0V8H10ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" transform="translate(-4 -2.11)" /><path class="a" d="M12,12a3,3,0,1,0,3,3A3,3,0,0,0,12,12Zm0,4a1,1,0,1,1,1-1A1,1,0,0,1,12,16Z"
                      transform="translate(-4 -2.11)" />
                  </svg>
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onInput={(e) => this.handleData(e.target.name, e.target.value)}
                />
              </div>
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
