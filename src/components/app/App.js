import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { useState, useEffect } from 'react';

import RandomCats from '../randomCat/RandomCats';
import Cats from '../cats/Cats';
import Favorites from '../favorites/Favorites';




function App() {

  const [favoriteCats, setFavoriteCats] = useState([]);





  return (
    <Router>
      <div className="App">
       <RandomCats />

        <Routes>
            <Route exact path='/'  element= {<Cats setFavoriteCats={setFavoriteCats}/>}/>


      
            <Route exact path='/favorites' element={<Favorites favoriteCats={favoriteCats}/>}/>

        </Routes>
          
       </div>
    </Router>
    
  );
}

export default App;
