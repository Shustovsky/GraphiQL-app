import React from 'react';

import { useRouteError } from 'react-router-dom';

export default function NotFonundPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center w-1/1">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}
