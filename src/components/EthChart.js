import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    Title,
    Legend
} from '@devexpress/dx-react-chart-material-ui';
import {
    ValueScale,
    Stack,
    Animation,
    EventTracker,
    HoverState,
} from '@devexpress/dx-react-chart';
import { makeStyles } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

// style chart
const useStyles = makeStyles((theme) => ({
    paperContainer: {
        backgroundColor: "rgb(34, 43, 54)",
        height: "100%",
        borderRadius: "12px"
    },
    chart: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}));

// format ticks
const format = () => (tick) => {
    const date = new Date(tick * 1000);
    const dateStrings = date.toLocaleDateString('DE-at').slice(0, -4);
    return dateStrings;
};

// styled legend
const legendStyles = () => ({
    root: {
        display: "flex",
        margin: "auto",
        flexDirection: "row"
    }
});
const legendLabelStyles = (theme) => ({
    label: {
        paddingTop: theme.spacing(1),
        whiteSpace: "nowrap"
    }
});
const legendItemStyles = () => ({
    item: {
        flexDirection: "column"
    }
});
const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
    <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
    legendLabelBase
);
const Item = withStyles(legendItemStyles, { name: "LegendItem" })(
    legendItemBase
);

// y-axis labels
const makeLabel = (symbol, color) => ({ text, style, ...restProps }) => (
    <ValueAxis.Label
        text={`${text} ${symbol}`}
        style={{
            fill: color,
            ...style
        }}
        {...restProps}
    />
);

const usdColor = "#42A5F5";
const UsdLabel = makeLabel("", usdColor);

const ethColor = "#FF7043";
const EthLabel = makeLabel("", ethColor);

// domain from 0 - max element
const customDomain = (max) => [0, max];

// render chart
const EthChart = ({ data }) => {
    const classes = useStyles();

    const chartData = getChartData(data);
    return (
        <Paper className={classes.paperContainer} elevation={3}>
            <Chart
                data={chartData}
                className={classes.chart}
            >
                <Title text="ETH vs USD" />
                <Animation />
                <Legend
                    position="bottom"
                    rootComponent={Root}
                    itemComponent={Item}
                    labelComponent={Label}
                />

                <ValueScale name="usdScale" modifyDomain={() => customDomain(Math.max.apply(Math, chartData.map(x => x.usdPerHour))
                )} />
                <ValueAxis scaleName="usdScale" showGrid={false} labelComponent={UsdLabel} />

                <ValueScale name="ethScale" modifyDomain={() => customDomain(Math.max.apply(Math, chartData.map(x => x.coinsPerHour)))} />
                <ValueAxis scaleName="ethScale" showGrid={false} position="right" labelComponent={EthLabel} />

                <ArgumentAxis tickFormat={format} />

                <LineSeries key="ETH" name="ETH per hour" valueField="coinsPerHour" argumentField="time" scaleName="ethScale" color={ethColor} />
                <LineSeries key="usd" name="USD per hour" valueField="usdPerHour" argumentField="time" scaleName="usdScale" color={usdColor} />

            </Chart>
        </Paper>
    );
};

// map data to chartData
const getChartData = (data) => {
    if (!data?.stats?.length > 0) {
        return [];
    }

    const result = data.stats.map(stat => {
        return {
            time: stat.time,
            usdPerHour: stat.usdPerHour,
            coinsPerHour: stat.coinsPerHour
        };
    });
    return result;
};

export default EthChart;