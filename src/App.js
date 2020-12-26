import React from "react";
import { withStyles, withTheme } from '@material-ui/core/styles';
import { getMovies } from "./utils/apiHelper";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Results from './components/results'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import shoppies from './shoppies.jpg';
import {Box, Grid} from '@material-ui/core';


const theme = createMuiTheme({
  typography: {
    fontSize: 18,
    fontFamily:  "Helvetica, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#004c3f",
      background: "#FFF5EE",
      headerText: "#FFFFFF"
    },
    secondary: {
      main: "#008060",
    },
  },
});

const useStyles = {
  secondaryInput: {
    width: 300,
    fontSize: 16,
    padding: 10,
  },
  searchIcon: {
   "margin-top": 10,
   fontSize: 35
  },
  logo: {
    width: '50%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20
  },
  input: {
    width: '50%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10%'
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      input: "",
      showResult: false,
      moviesData: [],
      showError: false,
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
        showResult: true,
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
        {this.state.showResult ? 
        <Box>
          <TextField
            variant="outlined"
            className={classes.secondaryInput}
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
            <SearchIcon className={classes.searchIcon}/>
          </IconButton>
          <Results moviesData={this.state.moviesData} /> 
        </Box>
        : 
        <Box className={classes.input}>
        <img src={shoppies} alt='shoppies logo' className={classes.logo}/>
          <Grid container>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                fullWidth
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
            </Grid>
            <Grid item>
              <IconButton color="primary" variant="contained" onClick={() => this.handleSearch(this.state.input)}>
               <SearchIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </Box>}
      </ThemeProvider>
    );
  }
}
export default withStyles(useStyles)(App); 
