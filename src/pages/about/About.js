import React from 'react';
import './About.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Autor</h1>
          <p>Ricardo Vieira Nº20077</p>
          <p>IPT-Escola Superior de Tecnologia de Tomar</p>
          <p>Engenharia Informática</p>
          <p>Tecnologias de Internet II</p>
          <p>Ano Letivo 2019/2020</p>
          <br />
          <p>nodejs reactjs Application</p>
          <a href="https://github.com/ricvigh/myTVtracker_NodeJS">https://github.com/ricvigh/myTVtracker_NodeJS</a>
          <a href="https://github.com/ricvigh/myTVtracker_ReactJS">https://github.com/ricvigh/myTVtracker_ReactJS</a>
        </header>
      </div>
    );
  }
}
