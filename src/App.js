import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { getMovies } from "./utils/apiHelper";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Results from './components/results'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  typography: {
    fontSize: 18,
    fontFamily:  "Helvetica, Arial, sans-serif",
    fontWeightBold: 800
  },
  palette: {
    primary: {
      main: "#004c3f",
      background: "#FFF5EE"
    },
    secondary: {
      main: "#008060",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  
  input: {
    width: 300,
    fontSize: 16,
    padding: 10,
    margin: 10
  },
}));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      input: "",
      moviesData: [],
      showError: false
    };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleSearch = async (search) => {

    const moviesData =  await getMovies(search);
    if (moviesData.Response === "True") {
      this.setState({ 
        moviesData: moviesData.Search,
        showError: false
       });
    }
    else {
      this.setState({showError: true})
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <TextField
          variant="outlined"
          className={classes.input}
          error={this.state.showError}
          helperText={this.state.showError && "No Search Results Found"}
          placeholder="Search OMDB"
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}         
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.handleSearch(this.state.input);
            }
         }}
        />
        <IconButton color="primary" variant="contained" onClick={() => this.handleSearch(this.state.input)}>
          <SearchIcon />
        </IconButton>
        <Results moviesData={this.state.moviesData} />
      </ThemeProvider>
    );
  }
}
export default withStyles(useStyles)(App); 
