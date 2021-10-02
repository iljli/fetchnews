import './App.css';
import React, { useEffect, useState, Fragment } from "react";
import Search from './components/Search';
import NewsArticle from './components/NewsArticle';
import mockData from './mockdata/response.json';
import { nanoid } from "nanoid";
// To create unique IDs easily
// https://www.npmjs.com/package/nanoid
import Pagination from "./components/Pagination";
// import { Pagination } from 'semantic-ui-react';


function App() {
  const [searchItem, setSearchItem] = useState("");
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;
  let sumOfItems = 0;
  let sumOfPages = 0;
  let firstSlice = 0;
  let lastSlice = 0;

  const getSearchItemFX = (data) => {
    console.log(`Entered search item: ${data}`);
    setSearchItem(data);
  }

  const handlePaginationChange = (_, { activePage }) => {
    setActivePage(activePage);
  };

  const fetchDataFromServer = () => {
    console.log(`Search item: ${searchItem}`);

    // fetch("./public/response.json")
    // fetch(mockData)
    // .then((response) =>{
    //   return response.json();
    //   })
    // .then((response) => console.log(response));
    console.log(mockData.hits);


  }
  sumOfItems = mockData.hits.length;
  console.log(`sumOfItems: ${sumOfItems}`);
  sumOfPages = Math.ceil(sumOfItems / itemsPerPage);
  console.log(`sumOfPages: ${sumOfPages}`);
  firstSlice = (activePage * itemsPerPage) - itemsPerPage;
  console.log(`firstSlice: ${firstSlice}`);
  lastSlice = firstSlice + itemsPerPage;
  console.log(`lastSlice: ${lastSlice}`);


  console.log(`Active Page: ${activePage}`);

  const selectArticle = mockData.hits.slice(firstSlice, lastSlice)
  // console.log(`Selection: ${selectArticle}`);
  useEffect(fetchDataFromServer, [searchItem, selectArticle])

  return (
    <div className="App">
      Hacker-News-Serach
      <Search getSearchItem={getSearchItemFX} />

      <div>
        {
          selectArticle && selectArticle.map((loadedData) => {
            return (
              <Fragment key={nanoid()}>
                <NewsArticle {...loadedData} />
              </Fragment>
            );
          })
        }

      </div>
      <Pagination
        activePage={activePage}
        onPaginationChange={handlePaginationChange}
        totalPages={sumOfPages}
      />
    </div>


  );

}

export default App;
