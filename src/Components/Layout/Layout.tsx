import React from 'react';
import FlightView from '../FlightView';
import AirportInfo from 'Components/AirportInfo';

function Layout() {
  return (
    <div className="wrapper">
      <div className="main-content">
        <main className="main">
          <FlightView />
        </main>
        <aside className="aside">
          <AirportInfo />
        </aside>
      </div>
    </div>
  );
}

export default Layout;
