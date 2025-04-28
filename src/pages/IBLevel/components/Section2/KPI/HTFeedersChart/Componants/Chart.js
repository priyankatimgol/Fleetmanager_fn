import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const Charts = ({ dataLabels, dataValues, data }) => {
    const dataModify = (labels, values) => {
        return {
            "category": labels,
            "value1": values,
            "value2":  100-values,
        }
    }
    const modifyData = data?.map((d) => dataModify(d.Colname, d.Value));
    useEffect(() => {
        // Chart code
        am4core.useTheme(am4themes_animated);

        // Create chart instance
        let chart = am4core.create("chartdiv", am4charts.XYChart3D);

        // Add data
        chart.data = modifyData;

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.grid.template.strokeOpacity = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.strokeOpacity = 0;
         valueAxis.min = -10;
         valueAxis.max = 110;
        valueAxis.strictMinMax = true;
        valueAxis.renderer.baseGrid.disabled = true;
        valueAxis.renderer.labels.template.adapter.add("text", function (text) {
            if (text > 100 || text < 0) {
                return "";
            } else {
                return text ;
            }
        });

        // Create series
        let series1 = chart.series.push(new am4charts.ConeSeries());
        series1.dataFields.valueY = "value1";
        series1.dataFields.categoryX = "category";
        series1.columns.template.width = am4core.percent(80);
        series1.columns.template.fillOpacity = 0.9;
        series1.columns.template.strokeOpacity = 1;
        series1.columns.template.strokeWidth = 2;

        // Add tooltip to series1
        series1.columns.template.tooltipText = "{categoryX}: [bold]{valueY}%[/]";

        let series2 = chart.series.push(new am4charts.ConeSeries());
        series2.dataFields.valueY = "value2";
        series2.dataFields.categoryX = "category";
        series2.stacked = true;
        series2.columns.template.width = am4core.percent(80);
        series2.columns.template.fill = am4core.color("#000");
        series2.columns.template.fillOpacity = 0.1;
        series2.columns.template.stroke = am4core.color("#000");
        series2.columns.template.strokeOpacity = 0.2;
        series2.columns.template.strokeWidth = 2;

        // Add tooltip to series2
        series2.columns.template.tooltipText = "{categoryX}: [bold]{valueY}%[/]";

        return () => {
            chart.dispose();
        };
    }, [modifyData]);

    return <div id="chartdiv" style={{ width: "100%", height: "250px" }} />;
};

export default Charts;
