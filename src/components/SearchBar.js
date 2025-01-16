import React, { useState } from "react";
import "../index.css"; 

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [makeModel, setMakeModel] = useState([]);
    const [yearRange, setYearRange] = useState([2015, 2023]);
    const [priceRange, setPriceRange] = useState([0, 500000]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [mileageRange, setMileageRange] = useState([0, 200000]);
    const [bodyStyle, setBodyStyle] = useState([]);
    const [transmission, setTransmission] = useState([]);
    const [fuelType, setFuelType] = useState([]);
    const [drivetrain, setDrivetrain] = useState([]);
    const [condition, setCondition] = useState([]);
    const [features, setFeatures] = useState([]);
    const [keywords, setKeywords] = useState("");
    const [showMoreFilters, setShowMoreFilters] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        const filters = {
            searchTerm,
            makeModel,
            yearRange,
            priceRange: [minPrice || priceRange[0], maxPrice || priceRange[1]],
            mileageRange,
            bodyStyle,
            transmission,
            fuelType,
            drivetrain,
            condition,
            features,
            keywords,
        };
        onSearch(filters);
    };

    const handlePriceRangeChange = (min, max) => {
        setPriceRange([min, max]);
        setMinPrice(min);
        setMaxPrice(max);
    };

    return (
        <div className="search-bar mb-4">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for cars..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="filters">
                {/* Price Range */}
                <div className="filter-group">
                    <label>Price Range</label>
                    <div className="price-range-buttons">
                        <button className="btn btn-light" onClick={() => handlePriceRangeChange(0, 500000)}>0 - 500K</button>
                        <button className="btn btn-light" onClick={() => handlePriceRangeChange(500000, 1000000)}>500K - 1M</button>
                        <button className="btn btn-light" onClick={() => handlePriceRangeChange(1000000, 2000000)}>1M - 2M</button>
                        <button className="btn btn-light" onClick={() => handlePriceRangeChange(2000000, 3000000)}>2M - 3M</button>
                        <button className="btn btn-light" onClick={() => handlePriceRangeChange(3000000, 5000000)}>3M - 5M</button>
                        <button className="btn btn-light" onClick={() => handlePriceRangeChange(5000000, 10000000)}>5M - 10M</button>
                        <button className="btn btn-light" onClick={() => handlePriceRangeChange(10000000, Infinity)}>Above 10M</button>
                    </div>
                    <div className="manual-price-inputs mt-3">
                        <label>Min Price</label>
                        <input
                            type="number"
                            className="form-control"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <label>Max Price</label>
                        <input
                            type="number"
                            className="form-control"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
                <button className="btn btn-secondary mt-3" onClick={() => setShowMoreFilters(!showMoreFilters)}>
                    {showMoreFilters ? "Hide Filters" : "More Filters"}
                </button>
                {showMoreFilters && (
                    <>
                        {/* Make & Model */}
                        <div className="filter-group">
                            <label>Make & Model</label>
                            <select multiple className="form-control" value={makeModel} onChange={(e) => setMakeModel([...e.target.selectedOptions].map(option => option.value))}>
                                <option value="all">Select All</option>
                                <option value="toyota">Toyota</option>
                                <option value="honda">Honda</option>
                                <option value="ford">Ford</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        {/* Year */}
                        <div className="filter-group">
                            <label>Year Range</label>
                            <input type="range" min="2000" max="2023" value={yearRange[0]} onChange={(e) => setYearRange([+e.target.value, yearRange[1]])} />
                            <input type="range" min="2000" max="2023" value={yearRange[1]} onChange={(e) => setYearRange([yearRange[0], +e.target.value])} />
                            <div>{yearRange[0]} - {yearRange[1]}</div>
                        </div>
                        {/* Mileage */}
                        <div className="filter-group">
                            <label>Mileage Range</label>
                            <input type="range" min="0" max="300000" value={mileageRange[0]} onChange={(e) => setMileageRange([+e.target.value, mileageRange[1]])} />
                            <input type="range" min="0" max="300000" value={mileageRange[1]} onChange={(e) => setMileageRange([mileageRange[0], +e.target.value])} />
                            <div>{mileageRange[0]} - {mileageRange[1]} miles</div>
                        </div>
                        {/* Body Style */}
                        <div className="filter-group">
                            <label>Body Style</label>
                            <select multiple className="form-control" value={bodyStyle} onChange={(e) => setBodyStyle([...e.target.selectedOptions].map(option => option.value))}>
                                <option value="sedan">Sedan</option>
                                <option value="suv">SUV</option>
                                <option value="truck">Truck</option>
                                <option value="coupe">Coupe</option>
                                <option value="convertible">Convertible</option>
                                <option value="hatchback">Hatchback</option>
                                <option value="wagon">Wagon</option>
                                <option value="minivan">Minivan</option>
                            </select>
                        </div>
                        {/* Transmission */}
                        <div className="filter-group">
                            <label>Transmission</label>
                            <select multiple className="form-control" value={transmission} onChange={(e) => setTransmission([...e.target.selectedOptions].map(option => option.value))}>
                                <option value="automatic">Automatic</option>
                                <option value="manual">Manual</option>
                                <option value="cvt">CVT</option>
                                <option value="hybrid">Hybrid/Electric</option>
                            </select>
                        </div>
                        {/* Fuel Type */}
                        <div className="filter-group">
                            <label>Fuel Type</label>
                            <select multiple className="form-control" value={fuelType} onChange={(e) => setFuelType([...e.target.selectedOptions].map(option => option.value))}>
                                <option value="gasoline">Gasoline</option>
                                <option value="diesel">Diesel</option>
                                <option value="hybrid">Hybrid</option>
                                <option value="electric">Electric</option>
                                <option value="alternative">Alternative Fuels</option>
                            </select>
                        </div>
                        {/* Drivetrain */}
                        <div className="filter-group">
                            <label>Drivetrain</label>
                            <select multiple className="form-control" value={drivetrain} onChange={(e) => setDrivetrain([...e.target.selectedOptions].map(option => option.value))}>
                                <option value="fwd">FWD</option>
                                <option value="rwd">RWD</option>
                                <option value="awd">AWD</option>
                                <option value="4wd">4WD</option>
                            </select>
                        </div>
                        {/* Condition */}
                        <div className="filter-group">
                            <label>Condition</label>
                            <select multiple className="form-control" value={condition} onChange={(e) => setCondition([...e.target.selectedOptions].map(option => option.value))}>
                                <option value="new">New</option>
                                <option value="used">Used</option>
                                <option value="certified-pre-owned">Certified Pre-Owned</option>
                                <option value="no-accident">No Accident History</option>
                            </select>
                        </div>
                        {/* Features */}
                        <div className="filter-group">
                            <label>Features</label>
                            <select multiple className="form-control" value={features} onChange={(e) => setFeatures([...e.target.selectedOptions].map(option => option.value))}>
                                <option value="sunroof">Sunroof/Moonroof</option>
                                <option value="leather-seats">Leather Seats</option>
                                <option value="navigation">Navigation</option>
                                <option value="backup-camera">Backup Camera</option>
                                <option value="bluetooth">Bluetooth</option>
                                <option value="heated-seats">Heated Seats</option>
                            </select>
                        </div>
                        {/* Keywords */}
                        <div className="filter-group">
                            <label>Keywords</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="e.g., sport package, turbo, performance"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                            />
                        </div>
                        {/* Filter Actions */}
                        <div className="filter-actions">
                            <button className="btn btn-secondary" onClick={() => {
                                setSearchTerm("");
                                setMakeModel([]);
                                setYearRange([2015, 2023]);
                                setPriceRange([0, 500000]);
                                setMinPrice("");
                                setMaxPrice("");
                                setMileageRange([0, 200000]);
                                setBodyStyle([]);
                                setTransmission([]);
                                setFuelType([]);
                                setDrivetrain([]);
                                setCondition([]);
                                setFeatures([]);
                                setKeywords("");
                            }}>
                                Clear All Filters
                            </button>
                            <button className="btn btn-primary" onClick={handleSearch}>
                                Refine Results
                            </button>
                        </div>
                    </>
                )}
            </div>
            <button className="btn btn-primary mt-3 w-100" onClick={handleSearch}>
    Search
</button>
        </div>
    );
}

export default SearchBar;