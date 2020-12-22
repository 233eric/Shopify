import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { getMovies } from "./utils/apiHelper";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Results from './components/results'

const useStyles = {
  input: {
    width: 300,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: 10,
    margin: 10
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      input: "",
      moviesData: [],
    };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleSearch = async (search) => {
    const moviesData =  await getMovies(search);
    this.setState({ moviesData: moviesData.Search });
    //console.log(this.state.moviesData);
  }

  render() {
    const { classes } = this.props;
    // let listItems = [];
    // if (this.state.moviesData.length !== 0){
    //   listItems = this.state.moviesData.map((d) => 
    //     <li key={d.imdbID}>{d.Title} ({d.Year})</li> 
    //   );
    // }
    return (
      <div>
        <InputBase
          className={classes.input}
          placeholder="Search OMDB"
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <IconButton color="primary" variant="contained" onClick={() => this.handleSearch(this.state.input)}>
          <SearchIcon />
        </IconButton>
        {/* {listItems} */}
        <Results moviesData={this.state.moviesData} />
      </div>
    );
  }
}
export default withStyles(useStyles)(App); 
