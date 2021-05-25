import {
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

export function getXData(data, field) {
    console.log('getXData');
    console.log(data);
    if (!data || data?.stats?.length === 0)
        return [];

    const currData = data.stats;
    console.log(currData);
    const result = [];
    currData.forEach(d => {
        const entry = {};
        entry[field] = d[field];
        result.push(entry);
    });
    console.log('xyData');
    console.log(result);
    return result;
}

export const makeLabel = (symbol, color) => ({ text, style, ...restProps }) => (
    <ValueAxis.Label
        text={`${text} ${symbol}`}
        style={{
            fill: color,
            ...style,
        }}
        {...restProps}
    />
);