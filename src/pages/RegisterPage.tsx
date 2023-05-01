import React from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <>
      <h2 className="text-blue-600 text-2xl">RegisterPage</h2>
      <p>
        Already have an account?
        <Link className="text-red-700" to="/login">
          Sign in
        </Link>
      </p>
    </>
  );
}
