import React from 'react';
import tvshows from '../../assets/tv2.png';
import './Home.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>myTVtracker</h1>
          <img src={tvshows} className="App-logo" alt="logo" />
          <p>Descobre novas Series.</p>
          <p>Regista o progresso das tuas Series.</p>
        </header>
      </div>
    );
  }
}
