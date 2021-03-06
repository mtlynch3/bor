import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Debits from './components/Debits';


import axios from "axios";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: 'melissa',
        memberSince: '07/23/96',
      },
      debits: [],
      credits: []
    }
  }

  async componentDidMount() {
    let debits = await axios.get("https://moj-api.herokuapp.com/debits")
    let credits = await axios.get("https://moj-api.herokuapp.com/credits")
   
    //get data from API response
    debits = debits.data
    credits = credits.data

    let debitSum = 0, creditSum = 0;
    debits.forEach((debit) => {
      debitSum += debit.amount
    })
    credits.forEach((credit) => {
      creditSum += credit.amount
    })

    let accountBalance = creditSum - debitSum;
    this.setState({debits, credits, accountBalance});
  } 


addDebit = (e) => {
  //send to debits view via props
  //updates state based off user input
  e.preventDefault();
  const description  = e.target[0].value;
  const amount  = Number(e.target[1].value);
  console.log(description, amount);
}

  render() {
    const { debits } = this.state;
    const DebitsComponent = () => (<Debits addDebit={this.addDebit} debits={debits} />);
    const HomePage = () => (
      <div>
        <h1>Welcome</h1> 
        <Link to="/bor/debits">Debits</Link>
      </div>
    );
    return (
        <Router>
          <Switch>
            <Route exact path="/bor" render={HomePage} />
            <Route exact path="/bor/debits" render={DebitsComponent}/>
          </Switch>
       

        </Router>
    );
  }

}

export default App;