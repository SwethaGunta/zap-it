
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import { lighten } from 'material-ui/styles/colorManipulator';
// import index from 'jss';





class EnhancedTableHead extends React.Component {
    createSortHandler = (property) => (event) => {
        this.props.onRequestSort(event, property);
    };

    render = () => {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {this.props.columnData.map(column => {
                        return (
                            <TableCell
                                key={column}
                                // numeric={column.numeric}
                                // padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                     placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column}
                                        direction={order}
                                        onClick={this.createSortHandler(column)}
                                    >
                                        {column}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: 2,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.dark,
                backgroundColor: lighten(theme.palette.secondary.light, 0.4),
            }
            : {
                color: lighten(theme.palette.secondary.light, 0.4),
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },


});

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    function onDeleteRow(){
        props.onDeleteRow();
    }

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography type="subheading">{numSelected} selected</Typography>
                ) : (
                        <Typography type="title">{props.tableName}</Typography>
                    )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon onClick={ onDeleteRow }/>
                        </IconButton>
                    </Tooltip>
                ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        margin: theme.spacing.unit,
    },
    table: {
        minWidth: 800,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    addrow: {

        width: 100,
        float: 'right',
        marginLeft: '80%',


    },
    textField: {
        width: '100%',
    }
});

class EnhancedTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
           // orderBy: 'calories',
            selected: [],
           // data:this.props.rows
            // .sort((a, b) => (a.calories < b.calories ? -1 : 1))
            //,
            page: 0,
            rowsPerPage: 5,
            newRow : {}
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.props.rows.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.props.rows.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

      //  this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.props.rows.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const {  order, orderBy, selected, rowsPerPage, page } = this.state;
        const data=this.props.rows;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <div>
                <Paper className={classes.root}>
                    <EnhancedTableToolbar 
                    numSelected={selected.length} 
                    onDeleteRow= { ()=> {this.props.onDeleteRows(this.state.selected)}} 

                    tableName={this.props.tableName} />

                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <EnhancedTableHead
                                columnData={this.props.columnData}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>

                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    let rows = [];
                                    this.props.columnData.forEach((value, index) => {
                                        rows.push(
                                            {
                                                label: n[value],
                                               
                                            }
                                        );
                                    })
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>

                                            {rows.map(value =>

                                                <TableCell numeric={value.numeric} padding={value.disablePadding ? 'none' : undefined}

                                                >

                                                    {value.label}

                                                </TableCell>

                                            )}

                                        </TableRow>
                                    );
                                })}

                                <TableRow
                                    hover
                                    tabIndex={-1}
                                >
                                    <TableCell padding="checkbox">

                                    </TableCell>

                                    {this.props.columnData.map((value, i) =>

                                        <TableCell style={{

                                            width: 'auto'

                                        }}>

                                            <TextField
                                                className={classes.textField}
                                                 className={classes.textField}
                                                margin="normal"
                                                value={this.state.newRow[value]}
                                                onChange = {
                                                    (e)=>{
                                                    var newState=Object.assign({},this.state);
                                                    newState.newRow[value]=e.target.value
                                                    this.setState(newState)
                                                }}
                                            />
                                        </TableCell>
                                    )}
                                </TableRow>
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                >
                                    {this.props.columnData.map((value, index) =>
                                        <TableCell style={{
                                            width: 'auto'
                                        }}>
                                        </TableCell>
                                    )}
                                    <TableCell style={{
                                        width: 'auto'
                                    }}>
                                        {<Button className={classes.addrow} color="accent" onClick = {
                                            ()=>{
                                               
                                               
                                                   this.props.addNewRow(Object.assign({},this.state.newRow));
                                                    this.setState({
                                                        newRow :{}
                                                    })
                                             

                                            }
                                        }> Add row </Button>
                                        }
                                    </TableCell>
                                </TableRow>
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        colSpan={6}
                                        count={data.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        backIconButtonProps={{
                                            'aria-label': 'Previous Page',
                                        }}
                                        nextIconButtonProps={{
                                            'aria-label': 'Next Page',
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);

/**
 * What this component should recive 
 * Rows
 * Columns
 * onAddRow(row)
 * onDeleteRow(rows[])
 */