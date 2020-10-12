import { ListItem } from "@material-ui/core";
import React from "react";

const ArticleListItem = ({ searchResult }: any) => {
  return <ListItem>{searchResult.account}</ListItem>;
};

export default ArticleListItem;
