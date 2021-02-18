import React, { Component } from 'react';

import { dataValidation } from '../dataValidation/dataValidation.js';
import { validateForm } from '../validateForm/validateForm';
import Spinner from '../Spinner/Spinner.js';

import '../../css/App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      submit: false,

      form: {
        username: '',
        email: '',
        password: '',
        country: null,
        gender: null,
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
    this.getButton = this.getButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleData(e) {
    const { name } = e.target;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const { form, err } = this.state;
    let obj = {};

    obj = {
      ...form,
      [name]: value
    };

    //save state and check data in fields
    this.setState({ form: obj }, () => {
      let errors = {};
      const isErrors = dataValidation(name, value);
      errors = {
        ...err,
        [name]: isErrors
      };
      this.setState({ err: errors });
    });
  }

  // disabled/enabled submit button
  getButton() {
    const { form } = this.state;

    if (
      form.username
      && form.email
      && form.password
    ) return false;

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, err } = this.state;
    const errorsObj = validateForm(form, err, dataValidation);

    if (Object.keys(errorsObj).length != 0) {
      this.setState({ err: { ...err, ...errorsObj } });
      return false;
    };

    this.setState({ submit: true }, () => {
      setTimeout(() => {
        this.setState({ submit: false });
      }, 10000);
    });
  }

  render() {
    const { form, err } = this.state;

    return (
      <div className="app">
        <div className="container">
          <h1>Create a new account</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="username">
              <input
                name="username"
                type="text"
                placeholder="Enter your name"
                value={form.username}
                onInput={(e) => this.handleData(e)}
              />
              {!err.username ? '' : <div className="err-username">{err.username}</div>}
            </div>
            <div className="email">
              <div>
                <div className="back-img-mail">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <path className="a"
                      d="M19,4H5A3,3,0,0,0,2,7V17a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7a3,3,0,0,0-3-3Zm-.67,2L12,10.75,5.67,6ZM19,18H5a1,1,0,0,1-1-1V7.25l7.4,5.55a1,1,0,0,0,1.2,0L20,7.25V17A1,1,0,0,1,19,18Z"
                      transform="translate(-2 -4)" />
                  </svg>
                </div>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={form.email}
                  onInput={(e) => this.handleData(e)}
                />
              </div>
              {!err.email ? '' : <div className="err-email">{err.email}</div>}
            </div>
            <div className="password">
              <div>
                <div className="back-img-pass">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19.89" viewBox="0 0 16 19.89">
                    <path className="a"
                      d="M17,8H16V6.11a4,4,0,0,0-8,0V8H7a3,3,0,0,0-3,3v8a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V11A3,3,0,0,0,17,8ZM10,6.11a2,2,0,1,1,4,0V8H10ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"
                      transform="translate(-4 -2.11)" />
                    <path className="a" d="M12,12a3,3,0,1,0,3,3A3,3,0,0,0,12,12Zm0,4a1,1,0,1,1,1-1A1,1,0,0,1,12,16Z"
                      transform="translate(-4 -2.11)" />
                  </svg>
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onInput={(e) => this.handleData(e)}
                />
              </div>
              {!err.password ? '' : <div className="err-password">{err.password}</div>}
            </div>
            <div className="country">
              <select
                name="country"
                onChange={this.handleData}
              >
                <option value="">Select country</option>
                {this.countryList.map(country =>
                  <option
                    key={country.value}
                    value={country.value}
                  >
                    {country.label}
                  </option>
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
                    checked={form.gender === "male"}
                    onChange={(e) => this.handleData(e)}
                  />
                  <span>Male</span>
                </label>
                <label>
                  <input
                    name="gender"
                    value="female"
                    type="radio"
                    checked={form.gender === "female"}
                    onChange={(e) => this.handleData(e)}
                  />
                  <span>Female</span>
                </label>
              </div>
              {!err.gender ? '' : <div className="err-gender">{err.gender}</div>}
            </div>
            <div className="terms">
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="terms"
                    checked={form.terms}
                    onChange={(e) => this.handleData(e)}
                  />
                  <span>Accept <a href="#">terms</a> and <a href="#">conditions</a></span>
                </label>
              </div>
              {!err.terms ? '' : <div className="err-terms">{err.terms}</div>}
            </div>
            <button
              disabled={this.getButton()}
              type="submit"
            >
              {this.state.submit ? <Spinner /> : 'Sign up'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
