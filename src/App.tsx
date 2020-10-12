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
import Filters, { IFilter } from "./Filters";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "1200px",
    height: "100%",
    margin: "0 auto",
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3F51B5',
    fontSize: '2em',
  }
  ,
  input: {
    width: "100%",
  },
}));

function App() {
  const [value, setValue] = React.useState("");
  const [filters, setFilters] = React.useState([] as IFilter[]);

  React.useEffect(() => {
    setFilters([]);
  }, [value]);

  const searchResult = useSearch(value, filters);
  const classes = useStyles();
  const filteredFilters = searchResult?.aggregations.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

  console.log(filteredFilters);
  const MemoedFilterComponent = React.useMemo(() => {
    return (
      <Filters
        filters={filteredFilters}
        className={classes.paper}
        activeFilters={filters}
        onFilterChange={setFilters}
      />
    );
  }, [filteredFilters, filters]);

  return (
    <div className={classes.root}>
    <div className={classes.title}> SEARCH DEMO APP </div>
    <br/>
      <Grid container spacing={10}>
        <Grid item xs={4}>
          {MemoedFilterComponent}
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
            <br/>
            Hits: {searchResult?.hits}
            <List>          
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
