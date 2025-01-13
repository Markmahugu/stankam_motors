import React, { useState } from "react";

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="mb-4">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for cars..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
