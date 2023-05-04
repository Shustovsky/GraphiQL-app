import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormAuth from '../FormAuth';
import { auth, registerWithEmailAndPassword } from './../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function SignUp() {
  const isSignIn = false;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (loading) return;
    if (user) navigate('/');
  }, [user, loading]);

  const registration = (name: string, email: string, pass: string): Promise<void> => {
    return registerWithEmailAndPassword(name, email, pass);
  };

  return (
    <div>
      <FormAuth title="Register" titleBtn="Sign up" isSignIn={isSignIn} handlclick={registration} />
    </div>
  );
}

export default SignUp;