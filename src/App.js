import React from "react";
import { getMovies } from "./utils/apiHelper";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      input: "",
      moviesData: []
    };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleSearch = async (search) => {
    const moviesData =  await getMovies(search);
    this.setState({ moviesData: moviesData.Search });
    console.log(this.state.moviesData);
  }

  render() {
    const listItems = this.state.moviesData.map((d) => <li key={d.Title}>{d.Title} ({d.Year})</li>);
    return (
      <div>
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button onClick={() => this.handleSearch(this.state.input)}>
          Search
        </button>
        {listItems }
      </div>
    );
  }
}
export default App; 
