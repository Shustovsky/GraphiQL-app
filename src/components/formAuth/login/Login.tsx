import React from 'react';
import FormAuth from '../FormAuth';
import { logInWithEmailAndPassword } from './../../../firebase';

function Login() {
  const isSignIn = true;
  return (
    <div>
      <FormAuth
        title="Sign in to your account"
        titleBtn="Sign in"
        isSignIn={isSignIn}
        handlclick={logInWithEmailAndPassword}
      />
    </div>
  );
}

export default Login;
