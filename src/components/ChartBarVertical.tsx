import React, { useEffect, useRef, useState } from "react";
import * as echarts from 'echarts';

import px from "../utils/px";
import baseEChartOptions from "../common/baseEChartOptions";

const originData = [[10, 2, 3, 4, 5, 6, 7, 8, 10], [10, 3, 4, 5, 6, 7, 8, 9, 11]]

export default function ChartBarVertical() {
  const myChart = useRef(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState(originData);


  /**
   * @description 使用setInterval模拟数据变化
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((prev) => {
        let newData1 = prev[0].map(() => Math.random() * 10),
            newData2 = prev[1].map(() => Math.random() * 10);
        return [newData1, newData2]
      })

      return () => clearInterval(intervalId)
    }, 3000);
  }, [])

  useEffect(() => {
    myChart.current = echarts.init(divRef.current);
    myChart.current.setOption({
      ...baseEChartOptions,
      grid: {
        ...baseEChartOptions.grid,
        left: px(70), // grid 组件离容器左侧的距离。
        right: px(10),// grid 组件离容器右侧的距离。
        bottom: px(60)
      },
      legend: { // 图例标记
        show: true,
        bottom: px(0),
        right: px(0),
        width: px(270),
        itemWidth: px(40), // 图例标记的图形宽度
        itemHeight: px(20), // 图例标记的图形高度
        itemGap: px(30), // 图例标记之间的间隔
        textStyle: {
          fontSize: px(18),
          color: '#fff',
        }
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01], // 坐标轴两边留白策略
        splitLine: { show: false }, // 是否显示分隔线
        axisLabel: { show: false } // 是否显示刻度标签
      },
      yAxis: {
        axisTick: { show: false },
        type: 'category',
        data: ['城关区', '七里河区', '西固区', '安宁区', '红古区', '永登县', '皋兰县', '榆中县', '新区'],
        axisLabel: {
          fontSize: px(12),
        },
      },
      series: [
        {
          name: '2011年',
          type: 'bar',
          data: data[0],
          // 柱形图添加渐变
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: '#2034f9' // 渐变起始
            }, {
              offset: 1,
              color: '#04a1ff' // 渐变结束
            }]),
          }
        },
        {
          name: '2012年',
          type: 'bar',
          data: data[1],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: '#b92ae8'
            }, {
              offset: 1,
              color: '#6773e7'
            }]),
          }
        }
      ]
    });
  }, []);

  /**
   * 跟踪data变化，重新set数据
   */
  useEffect(() => {
    myChart.current.setOption({
      series: [
        {
          data: data[0]
        },
        {
          data: data[1]
        },
      ],
    })
  }, [data])

  return (
    <div className='bordered chart2-box'>
      <h2>柱状图2</h2>
      <div ref={divRef} className='chart'></div>
      {/* <div className="legend">
        <span className="first"></span> 2022
        <span className="second"></span> 2023
      </div> */}
    </div>
  )
};
