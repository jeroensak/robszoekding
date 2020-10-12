import React from "react";
import Filter from "./FilterBucket";

export interface IFilter {
  aggregationField: string;
  values: string[];
}

const Filters = ({
  className,
  filters,
  onFilterChange,
  activeFilters,
}: {
  className?: string;
  filters: IFilter[];
  onFilterChange: (filters: IFilter[]) => void;
  activeFilters: IFilter[];
}) => {
  const filteredFilters = useFilterFilters(filters);

  const handleChange = (filter: IFilter) => {
    onFilterChange(
      [
        ...activeFilters.filter(
          (a) => a.aggregationField !== filter.aggregationField
        ),
        filter.values.length > 0 ? filter : undefined,
      ].filter((a) => a)
    );
  };

  return React.useMemo(
    () => (
      <>
        {filteredFilters.map((filter: any, index: number) => (
          <Filter
            activeFilters={activeFilters}
            className={className}
            filter={filter}
            key={index}
            onFilterChange={handleChange}
          />
        ))}
      </>
    ),
    [activeFilters, filteredFilters]
  );
};

export default Filters;

const useFilterFilters = (filters?: any[]): any[] => {
  return React.useMemo(() => {
    if (!filters) return [];

    return filters.filter(
      (filter) =>
        !!filter.buckets.find(
          (bucket) => !!bucket.value && bucket.value !== "NONE"
        )
    );
  }, [filters]);
};
