import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    paperContainer: {
        minWidth: '60%',
        backgroundColor: "rgb(34, 43, 54)"
    },
    secondaryText: {
        color: "textSecondary"
    },
    table: {
        margi: theme.spacing(1)
    },
    tableHead: {
        fontWeight: "600"
    },
    header: {
        padding: theme.spacing(1)
    }
}));

const StatList = ({ data, filter, title }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paperContainer} elevation={3}>
            <Typography variant="h5" className={classes.header} gutterBottom>
                {title}
            </Typography>
            <TableContainer >
                <Table aria-label="simple table" size='small' className={classes.table}>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>Stat</TableCell>
                            <TableCell align="right">Daily</TableCell>
                            <TableCell align="right">Weekly</TableCell>
                            <TableCell align="right">Monthly</TableCell>
                            <TableCell align="right">All</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getRows(data, filter).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.Daily}</TableCell>
                                <TableCell align="right">{row.Weekly}</TableCell>
                                <TableCell align="right">{row.Monthly}</TableCell>
                                <TableCell align="right">{row.All}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

const getRows = (data, description) => {
    if (!data || !data.Daily) return [];

    const rows = [];
    const dataToPutInRow = ['Daily', 'Monthly', 'Weekly', 'All'];
    const dataToPutInRows = ['reportedHashrate', 'currentHashrate', 'validShares', 'btcPerHour', 'coinsPerHour', 'usdPerHour'];

    dataToPutInRows.forEach(stats => {
        const row = {};
        row.name = mapping[stats].name;
        dataToPutInRow.forEach(filter => {
            row[filter] = data[filter][description][stats];
            const roundVal = 10 ** mapping[stats].rounding;
            row[filter] = (Math.round(data[filter][description][stats] * roundVal) / roundVal).toFixed(mapping[stats].rounding);

        });
        rows.push(row);
    });

    return rows;

};

const mapping = {
    'reportedHashrate': {
        name: 'MH/s reported',
        rounding: 2,
    },
    'currentHashrate': {
        name: 'MH/s received',
        rounding: 2
    },
    'validShares': {
        name: 'Shares/h',
        rounding: 2
    },
    'coinsPerHour': {
        name: 'ETH/h',
        rounding: 6
    },
    'btcPerHour': {
        name: 'BTC/h',
        rounding: 6
    },
    'usdPerHour': {
        name: 'USD/h',
        rounding: 6
    }
};

export default StatList;