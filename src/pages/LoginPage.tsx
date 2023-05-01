import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <>
      <h2 className="text-blue-600 text-2xl">LoginPage</h2>
      <p>
        Sign in or{' '}
        <Link className="text-red-700" to="/register">
          register
        </Link>
      </p>
    </>
  );
}
