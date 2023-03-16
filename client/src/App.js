import './App.css';
import Landing from './Views/LandingPage/Landing';
import Home from './Views/HomePage/Home';
import Form from './Views/FormPage/Form';
import Detail from './Views/DetailPage/Detail';
import NavBar from './components/navBar/NavBar';
import {Route} from 'react-router-dom'

function App() {

  return (
    <div className="App">
        <NavBar/>
        <Route exact path='/' render={() => <Landing/>}/>
        <Route path='/home' render={() => <Home/>}/>
        <Route path='/form' render={() => <Form/>}/>
        <Route path='/detail/:idVideogame' render={() => <Detail/>}/>
    </div>
  );
}

export default App;
