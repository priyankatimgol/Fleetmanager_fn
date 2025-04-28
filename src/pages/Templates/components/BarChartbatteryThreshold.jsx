import { formatNumber } from "pages/common-components/AgGridUtility/ColumnHeaderWithAsterick";
import ReactApexChart from "react-apexcharts";

function BarChartBatteryThreshold({
    data,
    bar1,
    bar2,
}) {
    // Extracting state names, consumption quantity, and return quantity from the data
    const dataColumn = data.map(item => item.state);
    const dataPowers = data.map(item => item.ConsumptionQty);
    const dataWinds = data.map(item => item.ThresholdQTY);

    const chartData = {
        series: [
            {
                name: bar1,
                type: 'column',
                data: dataPowers
            },
            {
                name: bar2,
                type: 'column',
                data: dataWinds
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false,
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '70%',
                    endingShape: 'rounded',
                    dataLabels: {
                        orientation: 'horizontal',
                        position: 'top',
                        formatter: function (val) {
                            return formatNumber(val);
                        }
                    },
                },
            },
            dataLabels: {
                position: 'top',
                enabled: true,
                style: {
                    fontSize: '10pt',
                    colors: ['#000']
                },
                offsetX: 0,
                offsetY: -20,
                horizontal: true,
                formatter: function (val, opts) {
                    return formatNumber(val, 0);
                }
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: dataColumn,
            },
            yaxis: {
                title: {
                    text: 'Quantity'
                }
            },
            fill: {
                opacity: 1,
                colors: ['#30A4FC', '#FEBF44'],
            },
            tooltip: {
                enabled: true,
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    const seriesData = w.config.series[seriesIndex]?.data;
                    const seriesName = w.config.series[seriesIndex]?.name;
    
                    if (seriesData && seriesData[dataPointIndex] !== undefined) {
                        return '<div style="font-size: 12px; padding: 5px; background-color:#F9F9F9;font-weight:600">' +
                            '<span>' + seriesName + ': ' + formatNumber(seriesData[dataPointIndex], 0) + '</span>' +
                            '</div>';
                    }
    
                    return '';
                },
            },
            toolbar: {
                show: false
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'right',
                markers: {
                    width: 12,
                    height: 12,
                    radius: 5,
                    fillColors: ['#30A4FC', '#FEBF44'],
                },
            },
        },
    };
    
    return (
        <div style={{ width: '100%', marginTop: 0 }} >
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={308}
                width="100%"
            />
            <div id="html-dist"></div>
        </div >
    );
}

export default BarChartBatteryThreshold;
