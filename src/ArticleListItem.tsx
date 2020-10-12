import { ListItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  header: {
    color: '#3F51B5',
  },
  subheader: {
    color: '#F50057',
  }
}));

const ArticleListItem = ({ searchResult }: any) => {
  const classes = useStyles();
  var qty = searchResult.articleQuantity;
  if (qty < 0) {qty = qty*-1}
  var price = searchResult.articleCostPrice;
  if (price < 0){price = price *-1}

  var date = searchResult.workOrderOrderDate.substr(0,10)


  // var date = new Intl.DateTimeFormat("en-GB", {
  //   year: "numeric",
  //   month: "long",
  //   day: "2-digit"
  // }).format(searchResult.workOrderOrderDate)

   return (<>
         <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar> */}
      
        <ListItemText
          primary={<>
            <div className={classes.header}>
            {`${qty} x ${searchResult.articleDescription} ${searchResult.articleGenericDescription} ${searchResult.articleCode} a ${price}€ `}
            </div>
            <div className={classes.subheader}>
            {`${searchResult.workOrderNumber} - ${date}`}
            </div>
          </>
          }
         
          secondary={
            <>
           
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {searchResult.account}
              </Typography>
              {` | ${searchResult.accountAddress}`}
              <br/>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              > 
              {`${searchResult.vehicleBrand} ${searchResult.vehicleModel} ${searchResult.vehicleType}`}
              </Typography>
              {` | ${searchResult.vehicleLicensePlate} | ${searchResult.vehicleVin}`}
       <br/>
       {searchResult.vehicleAdditionalProperties.split('\n').map((b: string) => <>{b}<br/></>)}
</>

          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
        
       </>)
   };

export default ArticleListItem;
