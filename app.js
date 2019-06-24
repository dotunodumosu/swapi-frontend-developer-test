import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchResult: [],
    }
  }

    searchPersonByName = (event) => {
    fetch('/people/?search='+ event.target.value)
      .then(response => response.json())
      .then(response => {
        //let searchResult = JSON.parse(responseBody).results;
        console.log(response);
        this.setState({ searchResult: response.results });
      })
  }

render() {
    return (
      <div className="pageStyle">
        <div className="searchBar">
          <input type="text"
            placeholder="search for a person"
            onChange={this.searchPersonByName}>
          </input>
          {Object.keys(this.state.searchResult).map((item, i) => (
            <li key={i}>
              <span>{this.state.searchResult[item].name}</span>
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default App;

//Dependencies
const swapi = require('swapi-node'); 
const express = require('express'); //express server
var bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json({ type: 'application/json' }));

var API_URL = 'http://swapi.co/api/';

//Search people endpoint
//format of the search string:
// https://swapi.co/api/people/?search=
app.get('/people', (req, res) => {
    let query = req.query.search;
    console.log(query);
    swapi.get('http://swapi.co/api/people/?search=' + query).then((result) => {
        console.log(result.results);
        let results = result.results;
        res.send({ results });
    }).catch((err) => {
        console.log(err);
    });
});

//server listening on specified port
app.listen(4000, () => console.log('Listening on port 4000!'))
