import React from 'react';
import FormAuth from '../FormAuth';
import { registerWithEmailAndPassword } from './../../../firebase';

function SignUp() {
  const isSignIn = false;
  return (
    <div>
      <FormAuth
        title="Register"
        titleBtn="Sign up"
        isSignIn={isSignIn}
        handlclick={registerWithEmailAndPassword}
      />
    </div>
  );
}

export default SignUp;
