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

  return (
    <>
      <Paper key={filter.name} className={className}>
        <Typography>{filter.name}</Typography>
        <Divider />
        <FormGroup row>
          {filter.buckets.map((bucket: any, index: number) => (
            <FormControlLabel
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
          ))}
        </FormGroup>
      </Paper>
    </>
  );
};

export default Filter;
