import React from 'react';
//pages
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';

//styled components
import { StyledContainer } from './components/Styles';

//Loader css
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <StyledContainer>
        <Routes>
          <Route exact path='/' element={<Home/>}>
          </Route>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/login' element={<Login/>}/>
          </Routes>
      </StyledContainer>
    </Router>
  );
}

/* function App() {
  return (
    <Router>
      <StyledContainer>
          <Routes>
              <Route path="/">
                <Home />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
          </Routes>
      </StyledContainer>
    </Router>
  );
} */

export default App;
