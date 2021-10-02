import './App.css';
import React, { useEffect, useState } from "react";
import Search from './components/Search'

function App() {
  const [searchItem, setSearchItem] = useState("");
 
 const getSearchItemFX = (data) => {
   console.log(`Entered search item: ${data}`);
   setSearchItem(data);
 }


  const fetchDataFromServer = () => {
     console.log(`Search item: ${searchItem}`);

    

  }


 useEffect(fetchDataFromServer, [searchItem])
 
  return (
    <div className="App">
      Hacker-News-Serach
      <Search getSearchItem={getSearchItemFX}/>
    </div>
  );
}

export default App;
