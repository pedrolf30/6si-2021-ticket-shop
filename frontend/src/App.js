import React from 'react';
//pages
import Home from './pages/Home/index.jsx';
import Login from './pages/Login/index.jsx';
import Signup from './pages/Signup/index.jsx';
import Profile from './pages/Profile/index.jsx';
import PurchaseHistory from './pages/PurchaseHistory/index.jsx';

//styled components
import { StyledContainer } from './components/Styles';

//Loader css
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatedTickets from './pages/CreatedTickets/index.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/profile' element={<Profile/>}/>
          <Route exact path='/purchase-history' element={<PurchaseHistory />} />
           <Route exact path='/created-tickets' element={<CreatedTickets/>}/>
        </Routes>
      </div>
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
