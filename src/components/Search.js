import React from "react";
import { getMovies } from "../Api/apiHelper";


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleSearch = () => {
    const moviesData = getMovies();
    console.log(moviesData);
  }

  render() {
    return (
      <div>
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button className="add-todo" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}


export default Search;
