import React, { Component } from 'react';
import axios from 'axios';
import { HashRouter as Router} from 'react-router-dom';
import 'bulma/css/bulma.css';
import './App.css';


import routes from './routes';
import Header from './components/Header/Header';

class App extends Component {

  
  
  




  
  render() {
    return (
      <Router>
       
        
        <div className="App">
          <div className='App-body'>
            <Header/>
            {routes}
          </div>
        </div>
      </Router>
      
    );
  }
}

export default App;
