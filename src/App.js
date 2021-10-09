import './App.css';
import React, { useEffect, useState, Fragment } from "react";
import Search from './components/Search';
import NewsArticle from './components/NewsArticle';
// import mockData from './mockdata/response.json';
import { nanoid } from "nanoid";
import Pagination from "./components/Pagination";
import DropdownNumberOfResults from "./components/Dropdown";
import Comment from "./components/Comment";


function App() {
  const urlMain = "https://hn.algolia.com/api/v1";
  const url = new URL(urlMain + "/search");
  const [activePage, setActivePage] = useState(1);
  const [numberOfArticles, setNumberOfArticles] = useState(5);
  const [articles, setArticles] = useState([]);
  const [searchValue, setSearchValue] = useState("")
  const [selectedArticle, setSelectedArticle] = useState(0);
  const [comments, setComments] = useState({});
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  const errorHandler = (error) => {
    // the error is passed as an object
    console.log(`Error Message: ${error.message}`); // does not actual handle the error
  };

  const getSearchValue = (e) => {
    setSearchValue(() => e.target.value)
  }

  const onSearch = (value) => {
    value.preventDefault();
    setCommentsLoaded(false);
    
    if (searchValue.length === 0) {
      return (null)
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
        if (!response.ok) // Failed HTTP status
          throw new Error(
            `An error has occured during the request. HTTP status code: ${response.status}`
          );
        return response.json();
      }, errorHandler)
      .then((data) => {
        data.hits && setArticles(() => data.hits);
      })
      .catch(errorHandler);
  }


  const handlePaginationChange = (_, { activePage }) => {
    setActivePage(() => activePage);
  }

  const setNumberOfArticlesOnPage = (numberOfArticles) => {
    setNumberOfArticles(() => numberOfArticles);
  }

  const sumOfItems = articles.length;
  const sumOfPages = Math.ceil(sumOfItems / numberOfArticles);
  const firstSlice = (activePage * numberOfArticles) - numberOfArticles;
  const lastSlice = parseInt(firstSlice) + parseInt(numberOfArticles);
  const selectArticle = articles.slice(firstSlice, lastSlice)


  const setArticle = (selection) => {
    console.log(selection);
    setSelectedArticle(selection);

    const url = urlMain + `/items/${selection}`;

    fetch(url)
      .then((response) => {
        return response.json();
      }, errorHandler)
      .then((data) => {
        setComments(data.children);
        setCommentsLoaded(true);
      })
      .catch(errorHandler);
  }


  useEffect(() => {

  }, [searchValue])


  return (
    <div className="App">
      Hacker-News-Serach
      <Search isValue={getSearchValue} onSearch={onSearch} value={searchValue} />

      <div>
        {
          selectArticle && selectArticle.map((loadedData) => {
            return (
              <Fragment key={nanoid()}>
                <NewsArticle {...loadedData} setArticle={setArticle} />
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

      {commentsLoaded ? <Comment comment={comments} /> : null}
    </div>


  );

}

export default App;
