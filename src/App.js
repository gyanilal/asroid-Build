import logo from './logo.svg';
import {BrowserRouter,Switch, Route } from 'react-router-dom'
import './App.css';
import Astroid from './components/astroid/index';
import AstroidDetail from './components/astroid/showData';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Astroid} />
        <Route path="/details" component={(props) =>{
          return <AstroidDetail {...props} />
        }} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
