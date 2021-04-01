import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
function SearchBox() {
  const [keyword, setKeyword] = useState("");
  let history = useHistory();
  const submithandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.location.pathname);
    }
    console.log("Submithandler");
  };
  return (
    <Fragment>
      <form onSubmit={submithandler}>
        <input
          type="text"
          placeholder="Eg. Shirt, jeans"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">
          <FontAwesomeIcon
            icon={faSearch}
            style={{ color: "var(--primaryColor)" }}
          />
        </button>
      </form>
    </Fragment>
  );
}

export default SearchBox;
