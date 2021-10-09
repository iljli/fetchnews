import React, { useState } from "react";

function Search(props) {
    const [searchItems, setSearchItems] = useState("");

    return (
        <div>
            Search-Component:

            <form onSubmit={(e) => props.onSearch(e)}>
                <input
                    onChange={(e) => props.isValue(e)}
                    type="text"
                    name="searchItem"
                    placeholder="Search..."
                />
                <button>Submit</button>
            </form>

        </div>
    );
}

export default Search;