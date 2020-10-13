import {
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import React from "react";
import { IFilter } from "./Filters";
import Chip from "@material-ui/core/Chip";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  shape: {
    marginTop: 12,
    marginLeft: -10,
    height: 20,
  },
  shapeCircle: {
    borderRadius: "50%",
  },
  formControlLabel: {
    width: "100%",
  },
}));

const Filter = ({
  onFilterChange,
  filter,
  className,
  activeFilters,
}: {
  onFilterChange: (filter: IFilter) => void;
  filter: any;
  className?: string;
  activeFilters: IFilter[];
}) => {
  const activeBuckets = React.useMemo(
    () =>
      activeFilters.find((f) => f.aggregationField === filter.name)?.values ||
      [],
    [activeFilters]
  );

  const setActiveBuckets = (values) => {
    onFilterChange({
      aggregationField: filter.name,
      values,
    });
  };

  const onFilterClick = (bucket: string, value: boolean) => {
    if (value) {
      setActiveBuckets([...activeBuckets, bucket]);
    } else {
      setActiveBuckets(activeBuckets.filter((a) => a !== bucket));
    }
  };

  function unCamelCase(str) {
    return (
      str
        // insert a space between lower & upper
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        // space before last upper in a sequence followed by lower
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
        // uppercase the first character
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
    );
  }

  var name = unCamelCase(filter.name).toUpperCase();
  const classes = useStyles();
  return (
    <Paper key={filter.name} className={className}>
      <Typography>{name}</Typography>
      <Divider />
      <FormGroup row>
        {filter.buckets.map((bucket: any, index: number) => (
          <>
            <FormControlLabel
              className={classes.formControlLabel}
              key={index}
              control={
                <Checkbox
                  checked={!!activeBuckets.find((a) => a === bucket.value)}
                  onChange={(_e, value) => {
                    onFilterClick(bucket.value, value);
                  }}
                  name={bucket.value}
                  color="primary"
                />
              }
              label={`${bucket.value} (${bucket.hits})`}
            />
            {/* <Chip label={bucket.hits} size="small" className={classes.shape} color="primary"/> */}
          </>
        ))}
      </FormGroup>
    </Paper>
  );
};

export default Filter;
