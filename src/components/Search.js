import React, {useState} from 'react';
import axios from 'axios';

import styles from '../styles/Search.module.css';

const Search = () => {
  const defaultProductInfo = {'asin': {'label': 'ASIN', 'value': ''},
                              'name': {'label': 'Product Name', 'value': ''},
                              'dimensions': {'label': 'Product Dimensions', 'value': ''},
                              'category': {'label': 'Category', 'value': ''},
                              'rank': {'label': 'Rank (in Category)', 'value': ''},};

  const [asinValue, setAsinValue] = useState("");
  const [productInfo, setProductInfo] = useState(defaultProductInfo);
  const [formIsValid, setFormIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = event => {
      const value = event.target.value;
      setAsinValue(value);
      setFormIsValid((value !== "" ? true : false));
  };

  const handleInputKeyDown = event => {
    console.log("key down", event.key);
    if (event.key === "Enter") {
      submitSearch();
    }
  };

  const submitSearch = event => {
      event.preventDefault();

      setIsSearching(true);

      axios.get('/api/product/' + asinValue)
      .then(function (response) {
        let newProductInfo = {...productInfo};
        let errMessage = "";

        if (response.data.status === 'success') {
          for (let key in newProductInfo) {
            if (response.data.data.hasOwnProperty(key)) {
              newProductInfo[key].value = response.data.data[key];
            }
          }
        }
        else if (response.data.status === 'error') {
          errMessage = response.data.data;
          newProductInfo = defaultProductInfo;
        }

        setIsSearching(false);
        setErrorMessage(errMessage);
        setProductInfo(newProductInfo);
      })
      .catch(function (error) {
        // handle error
        console.log('success', error);
        setIsSearching(false);
      })
      .finally(function () {
        // always executed
      });
  };

  return (
      <div>
        <div id="searchSection">
          <div id="formWrapper">
            <form onSubmit={submitSearch}>
              <input id="searchInput" type="text" value={asinValue} onChange={handleInputChange} onKeyDown={handleInputKeyDown} placeholder="Enter Product ASIN (e.g. B002QYW8LW)"/>
              <button id="searchButton" type="submit" disabled={!formIsValid || isSearching}>Search</button>
            </form>
            <div id="errorMessage">{errorMessage}</div>
          </div>
        </div>
        <div>
          <table id="productInfo">
            <tbody>
              <tr>
                <td className="fieldLabel">{productInfo.asin.label}</td>
                <td className="fieldValue">{productInfo.asin.value}</td>
              </tr>
              <tr>
                <td className="fieldLabel">{productInfo.name.label}</td>
                <td className="fieldValue">{productInfo.name.value}</td>
              </tr>
              <tr>
                <td className="fieldLabel">{productInfo.dimensions.label}</td>
                <td className="fieldValue">{productInfo.dimensions.value}</td>
              </tr>
              <tr>
                <td className="fieldLabel">{productInfo.category.label}</td>
                <td className="fieldValue">{productInfo.category.value}</td>
              </tr>
              <tr>
                <td className="fieldLabel">{productInfo.rank.label}</td>
                <td className="fieldValue">{productInfo.rank.value}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default Search;