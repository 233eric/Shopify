import React from "react";
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

export const useStyles = {
  card: {
    "padding": 10,
    "margin": 10,
    "minWidth": "45%",
    "display" : "inline-block",
    "vertical-align": "top"
  },
  text: {
    "fontWeight": "bold",
    "padding": 10,
  },
  input: {
    "margin-left": 10,
    "height": 55
  },
  title: {
    "fontWeight": "bold",
    "font-size": 40
  }
};


class Nominations extends React.Component{
  render() {
    const { classes } = this.props;
    const { items} = this.state;

    return (
      <Card className={classes.card}>
        <InputBase
          className={classes.title}
          placeholder="Add a title"
          inputProps={{ 'aria-label': 'naked' }}
          />
          <ListItems items={items} onDelete={this.handleDelete} />
      </Card>
    );
  }
}

const ListItems = (props) => {
  const items = props.items.map((item, index) => {
    return <Items content={item} key={index} id={index} onDelete={props.onDelete}/>
  })
  return (
    <List>
      <ListItemText>
        {items}
      </ListItemText>
    </List>
  )
}

const Items = (props) => {
  return(
    <ListItem>
      {props.content}
      <IconButton onClick={() => {props.onDelete(props.id)}}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

export default withStyles(useStyles)(Nominations);