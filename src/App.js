import './App.css';
import React, { useEffect, useState, Fragment } from "react";
import Search from './components/Search';
import NewsArticle from './components/NewsArticle';
// import mockData from './mockdata/response.json';
import { nanoid } from "nanoid";
// To create unique IDs easily
// https://www.npmjs.com/package/nanoid
import Pagination from "./components/Pagination";
// import { Pagination } from 'semantic-ui-react';
import DropdownNumberOfResults from "./components/Dropdown";
import Comment from "./components/Comment";


function App() {
  const url = new URL("https://hn.algolia.com/api/v1/search");
  const [activePage, setActivePage] = useState(1);
  const [numberOfArticles, setNumberOfArticles] = useState(5);
  const [articles, setArticles] = useState([]);
  const [searchValue, setSearchValue] = useState("")
  const [selectedArticle, setSelectedArticle] = useState(0);
  const [comments, setComments] = useState({});
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  
  const getSearchValue = (e) => {
    setSearchValue(() => e.target.value)
  }

  const onSearch = (value) => {
    value.preventDefault();
    setCommentsLoaded(false);
    if (searchValue.length === 0) {
      return(null)
    }
    console.log(`Entered search item: ${value}`);
    console.log(`Search item: ${searchValue}`);

    const parameters = {
      query: searchValue,
      hitsPerPage: 200
    }

    url.search = new URLSearchParams(parameters);

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.hits && setArticles(() => data.hits);
        // console.log(data.hits);
      });
  }


  const handlePaginationChange = (_, { activePage }) => {
    setActivePage(() => activePage);
  };

  const setNumberOfArticlesOnPage = (numberOfArticles) => {
    setNumberOfArticles(() => numberOfArticles);
  }

  const sumOfItems = articles.length;
  const sumOfPages = Math.ceil(sumOfItems / numberOfArticles);
  const firstSlice = (activePage * numberOfArticles) - numberOfArticles;
  const lastSlice = parseInt(firstSlice) + parseInt(numberOfArticles);
  const selectArticle = articles.slice(firstSlice, lastSlice)

  

  // const showComment = (selection) => {
  const setArticle = (selection) => {
    // selection.preventDefault();
    // console.log("clicked on article");
    console.log(selection);
    setSelectedArticle(selection);

    const url = `https://hn.algolia.com/api/v1/items/${selection}`;

    // const parameters = {
    //   query: selectedArticle,
    //   // hitsPerPage: 200
    // }

    // url.search = new URLSearchParams(parameters);

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // data.hits && setArticles(() => data.hits);
        // console.log(data.children);
        setComments(data.children);
        setCommentsLoaded(true);
      });
  }



  useEffect(() => {

  }, [searchValue]) //numberOfArticles


  return (
    <div className="App">
      Hacker-News-Serach
      <Search isValue={getSearchValue} onSearch={onSearch} value={searchValue} />

      <div>
        {
          selectArticle && selectArticle.map((loadedData) => {
            return (
              <Fragment key={nanoid()}>
                <NewsArticle {...loadedData} setArticle={setArticle}/>
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
      <DropdownNumberOfResults setNumberOfArticlesPr={setNumberOfArticlesOnPage} />

      {commentsLoaded ? <Comment comment={comments}/> : null}
    </div>


  );

}

export default App;
