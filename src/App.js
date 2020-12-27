import React from "react";
import { getMovies } from "./utils/apiHelper";
import { TextField, IconButton, Box, Divider, Grid, Zoom} from '@material-ui/core';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Results from './components/results';
import shoppies from './shoppies.jpg';


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
    width: '50%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20
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
  },
  smallImg: {
    width: 150,
    height: 50
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
          <Box className={classes.secondaryInput}>
          <Grid container>
            <Grid item >
              <a href="/">
                <img src={shoppies} alt='shoppies logo' className={classes.smallImg}/> 
              </a>
            </Grid>
            <Grid item xs={8}>
              <Zoom in timeout={1500}>
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
              </Zoom>
            </Grid>
            <Grid item>
              <IconButton color="primary" variant="contained" onClick={() => this.handleSearch(this.state.input)}>
               <SearchIcon/>
              </IconButton>
            </Grid>
          </Grid>
          </Box>
          <Divider></Divider>
          <Results moviesData={this.state.moviesData} /> 
        </Box>
        : 
        <Zoom in timeout={1500}>
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
          </Box>
        </Zoom>}
      </ThemeProvider>
    );
  }
}
export default withStyles(useStyles)(App); 
