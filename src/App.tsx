import React from "react";
import "./App.css";
import { useSearch } from "./api";
import {
  Divider,
  Grid,
  Input,
  List,
  ListItem,
  makeStyles,
  Paper,
} from "@material-ui/core";
import ArticleListItem from "./ArticleListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "1200px",
    height: "100%",
    margin: "0 auto",
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  input: {
    width: "100%",
  },
}));

function App() {
  const [value, setValue] = React.useState("");
  const searchResult = useSearch(value);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            Text
            <Divider />
            Hello
          </Paper>
          <Paper className={classes.paper}>Hello</Paper>
          <Paper className={classes.paper}>Hello</Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Input
              className={classes.input}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              placeholder="search..."
            />
            <Divider />

            <List>
              <ListItem>Hits: {searchResult?.hits}</ListItem>
              <Divider />

              {searchResult?.results.map((result: any, index: number) => (
                <ArticleListItem searchResult={result} key={index} />
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
