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
import DropdownNumberOfResults from "./components/Dropdown";


function App() {
  const [searchItem, setSearchItem] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [numberOfArticles, setNumberOfArticles] = useState(10);

  const getSearchItemFX = (data) => {
    console.log(`Entered search item: ${data}`);
    setSearchItem(data);
  }

  const handlePaginationChange = (_, { activePage }) => {
    setActivePage(activePage);
  };

  const setNumberOfArticlesOnPage = (numberOfArticles) => {
    setNumberOfArticles(numberOfArticles);
  }

  console.log(`Number of Articles per page: ${numberOfArticles}`);
  const sumOfItems = mockData.hits.length;
  console.log(`sumOfItems: ${sumOfItems}`);
  const sumOfPages = Math.ceil(sumOfItems / numberOfArticles);
  console.log(`sumOfPages: ${sumOfPages}`);
  const firstSlice = (activePage * numberOfArticles) - numberOfArticles;
  console.log(`firstSlice: ${firstSlice}`);
  const lastSlice = firstSlice + numberOfArticles;
  console.log(`lastSlice: ${lastSlice}`);


  console.log(`Active Page: ${activePage}`);

  const selectArticle = mockData.hits.slice(firstSlice, lastSlice)
  // console.log(`Selection: ${selectArticle}`);
  useEffect(() => {
    console.log(`Search item: ${searchItem}`);

    // fetch("./public/response.json")
    // fetch(mockData)
    // .then((response) =>{
    //   return response.json();
    //   })
    // .then((response) => console.log(response));
    console.log(mockData.hits);
  }, [searchItem, selectArticle, numberOfArticles])

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
      <DropdownNumberOfResults setNumberOfArticlesPr={setNumberOfArticlesOnPage}/>
    </div>


  );

}

export default App;
