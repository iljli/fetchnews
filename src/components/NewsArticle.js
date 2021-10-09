import React from "react";
// import './App.css';

function NewsArticle(props) {

   

    // console.log(`Title: ${props.title}`)
    // console.log(props)
    return (
        <div className="article" onClick={() => {
                props.setArticle(props.objectID);
                // props.setArticle(props.objectID)
                }}>
            
            <p>Title: {props.title} </p>
            <p>Author: {props.author} </p>
            <a href={props.url} target="_blank" rel="noopener">URL: {props.url} </a>
            <p>ID: {props.objectID} </p>
        </div>
    );
}

export default NewsArticle;



