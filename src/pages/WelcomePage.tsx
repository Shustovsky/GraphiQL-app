import React from 'react';
import { Outlet } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <>
      <div>Header</div>
      <div id="detail">
        <Outlet />
      </div>
      <div>Footer</div>
    </>
  );
}
