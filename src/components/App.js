import React, { Component } from 'react';

import '../App.css';

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
        password: ''
      },

      checked: {
        gender: '',
        terms: ''
      },

      err: {
        username: false,
        email: false,
        password: false,
        country: false,
        gender: false,
        terms: false
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
    this.setState({ form: obj });
  }

  render() {
    const { form, err } = this.state;

    return (
      <div className="App">
        <div>
          <div>Create a new account</div>
          <form>
            <div className="username">
              <input
                name="username"
                type="text"
                value={form.username}
                onInput={(e) => this.handleData(e.target.name, e.target.value)}
              />
              <div className="err-username">
                {!err.username ? '' : 'Please enter a valid name'}
              </div>
            </div>
            <div className="email">
              <input
                name="email"
                type="text"
                value={form.email}
                onInput={(e) => this.handleData(e.target.name, e.target.value)}
              />
              <div className="err-email">
                {!err.email ? '' : 'Please enter a valid email address'}
              </div>
            </div>
            <div className="password">
              <input
                name="password"
                type="password"
                value={form.password}
                onInput={(e) => this.handleData(e.target.name, e.target.value)}
              />
              <div className="err-password">
                {!err.password ? '' : 'Password must contain at least 6 symbols'}
              </div>
            </div>
            <div className="country">
              <select>
                <option>Select country</option>
                {this.countryList.map(country =>
                  <option value={country.value}>{country.label}</option>
                )}
              </select>
              <div>{!err.country ? '' : 'You must select your country'}</div>
            </div>
            <div className="gender">
              <div>
                <label>
                <input
                  name="gender"
                  value="female"
                  type="radio"
                />
                <span>Female</span>
                </label>
                <label>
                <input
                  name="gender"
                  value="male"
                  type="radio"
                />
                <span>Male</span>
                </label>
              </div>
              <div className="err-gender">
                {!err.gender ? '' : 'You must select the gender'}
              </div>
            </div>
            <div className="terms">
              <div>
                <label>
                  <input type="checkbox" name="terms" />
                  <span>Accept <a href="#">terms</a> and <a href="#">conditions</a></span>
                </label>
              </div>
              <div>{!err.terms ? '' : 'You must accept the policies'}</div>
            </div>
            <button type="submit">Sugn Up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
