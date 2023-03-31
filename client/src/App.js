import './App.css';
import Landing from './Views/LandingPage/Landing';
import Home from './Views/HomePage/Home';
import Form from './Views/FormPage/Form';
import Detail from './Views/DetailPage/Detail';
import NavBar from './components/navBar/NavBar';
import { Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, getGenres } from './redux/actions';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/'

function App() {

  const location = useLocation()
  const dispatch = useDispatch()

  // cuando se levante el componente se hacen los llamados a las actions de traer todos los juegos y generos
  useEffect(() => {
    dispatch(getAllGames())
    dispatch(getGenres())
  }, [])

  return (
    <div className="App">
      {
        location.pathname !== '/' && <NavBar />
      }
      <Route exact path='/' render={() => <Landing />} />
      <Route path='/home' render={() => <Home />} />
      <Route path='/form' render={() => <Form />} />
      <Route path='/detail/:idVideogame' render={() => <Detail />} />
    </div>
  );
}

export default App;
