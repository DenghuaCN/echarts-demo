import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

import px from "../utils/px";
import baseEChartOptions from "../common/baseEChartOptions";

export default function ChartLineArea() {
  const divRef = useRef(null);

  useEffect(() => {
    let myChart = echarts.init(divRef.current);

    myChart.setOption({
      ...baseEChartOptions,
      grid: {
        ...baseEChartOptions.grid,
        left: px(50),
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [2018, 2019, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        splitLine: { show: true, lineStyle: { color: "#073E78" } },
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          interval: 1,
          fontSize: px(12),
        },
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: "#073E78" } },
        axisLabel: {
          fontSize: px(12),
          formatter(val: number) {
            return val * 100 + "%";
          },
        },
      },
      series: [
        {
          name: "故意伤人",
          type: "line",
          data: [null, 0.13, 0.11, 0.13, 0.14, 0.19, 0.17, 0.16, null],
          symbol: "circle",
          symbolSize: px(12),
          lineStyle: { width: px(2) },
          areaStyle: {
            // 区域填充样式
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#414a9f",
              },
              {
                offset: 1,
                color: "#1b1d52",
              },
            ]),
          },
        },
      ],
    });
  }, []);

  return (
    <div className="bordered chart4-box">
      <h2>折线图2</h2>
      <div ref={divRef} className="chart" />
    </div>
  );
};
