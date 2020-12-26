import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';
import Zoom from '@material-ui/core/Zoom';
import Collapse from '@material-ui/core/Collapse';



const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.headerText,
  },
  list: {
    width: 500,
    height: 500,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.background,
    overflow: 'auto',
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const [banner, showBanner] = React.useState(false);

  
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleCheckedRight = () => {
    //Allow at most 5 nominations
    if (right.length + leftChecked.length <= 5) {
      setRight(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
    }
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  React.useEffect(() => {
    const mappedTestArr = props.moviesData.map((d) => `${d.Title} (${d.Year})`).filter((e)  => !right.includes(e));
    setLeft(mappedTestArr);
  },[props.moviesData, right]);

  React.useEffect(() => {
    if (right.length === 5) {
      console.log("show banner");
      showBanner(true);

    }
    else {
      console.log("dont show banner");
      showBanner(false);
    }
    },[right]);

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <Collapse appear in={right.length + leftChecked.length > 5 && title === "Results"} timeout={1500}>
        <Alert severity="warning">You can only Nominate 5 Movies</Alert>
      </Collapse>
      <Collapse appear in={banner && title === "Nominations"} timeout={1500}>
        <Alert severity="success">You Have Nominated 5 Movies!</Alert>
      </Collapse>
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
          <Zoom in timeout={1000}>
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemText id={labelId} primary={value} />
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
            </ListItem>
          </Zoom>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <>
      <Grid container spacing={5} justify="center" alignItems="center" className={classes.root}>
        <Grid item>{customList('Results', left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0 || right.length + leftChecked.length > 5}
              aria-label="move selected right"
              color="primary"
            >
              Nominate &gt;
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
              color="primary"
            >
              Remove Nomination &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList('Nominations', right)}</Grid>
      </Grid>
    </>
  );
}
