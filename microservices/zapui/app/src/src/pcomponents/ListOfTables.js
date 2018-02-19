
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import Button from 'material-ui/Button';
import AddTable from './AddTable';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 2,
    overflow: 'auto'
  },
  head: {
    'font-weight': 'bold',

  },
  selected: {
    'backgroundColor': 'silver',
  },

  addtable: {

    width: 110,
    float: 'right',
    margin: 5,


  }
});

class ListOfTables extends React.Component {

  state = {
    openAddTable: false
  }


  closeAddTable() {
    this.setState({
      openAddTable: false
    })
  }

  render() {
    const { classes, tables, onChangeTable, selectedTable } = this.props;
    return (
      <div className={classes.root}>

        {
          this.state.openAddTable && <AddTable
            closeAddTable={this.closeAddTable}
            onAddTableResult={(res)=>{

  
    this.closeAddTable();
    this.props.onAddTableResult(res);
  
            }}
            openAddTable={this.state.openAddTable}
            closeAddTable={
              () =>
                this.setState({
                  openAddTable: false
                })
            }
          > </AddTable>
        }

        <List>
          <ListItem className={classes.head}>
            <ListItemText primary="Tables" className={classes.head} />
          </ListItem>
        </List>

        <Divider />



        <List>

          {tables.map(function (value, i) {

            console.log(value);

            return <ListItem button component="a" href="#simple-list" className={value.table_id === selectedTable ? classes.selected : ""} onClick={() => { onChangeTable(value) }}>
              <ListItemText primary={value.table_name} />
            </ListItem>

          })}

          <Button color="accent" className={classes.addtable} onClick={() => {
            this.setState({
              openAddTable: true
            })
          }} > Add table </Button>

        </List>
      </div>
    );
  }
}

ListOfTables.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListOfTables);

/**
 * What should this component receive
 * tables[]
 * onAddTable(data)
 * onRemoveTable(tableID)
 * onTableClicked(tableID)
 */