import React, { useState } from "react";

function Search({ getSearchItem}) {
    const [searchItem, setSearchItem] = useState("");

    const handleInputChange = (event) => {
        setSearchItem(event.target.value);
    }

    return (
        <div>
            Search-Component

            <form onSubmit={() => getSearchItem(searchItem)}>
                <input
                    onChange={handleInputChange}
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