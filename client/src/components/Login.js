import React, {useState} from "react";

import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const changeHandler = ev => {
    ev.preventDefault();

    setCredentials({
      ...credentials,
      [ev.target.name]: ev.target.value
    });
  }

  const login = ev => {
    ev.preventDefault();
    axiosWithAuth()
    .post('/api/login', credentials)
    .then(res => {
      console.log(res.data, 'login consolelog')
      localStorage.setItem('token', res.data.payload)

      props.history.push('/protected');
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <input
        type="text"
        name="username"
        onChange={changeHandler}
        value={credentials.username}
        placeholder="Username"
        />
        <input
        type="password"
        name="password"
        onChange={changeHandler}
        value={credentials.password}
        placeholder="Password"
        />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
