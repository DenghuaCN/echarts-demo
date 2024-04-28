import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import baseEChartOptions from '../common/baseEChartOptions';
import px from '../utils/px';


const originData = [
  { value: 0.30, name: '20-30' },
  { value: 0.40, name: '30-40' },
  { value: 0.30, name: '40-50' },
]
const colors = ['#F38E1C', '#1CDB7C', '#33A4FA'];

export default () => {
  const myChart = useRef(null);
  const divRef = useRef(null);
  const [data, setData] = useState(originData);

  const getRandom = () => Number(Math.random().toFixed(2))

  /**
   * @description 使用setInterval模拟数据变化
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((prev) => [
        { value: getRandom(), name: prev[0].name },
        { value: getRandom(), name: prev[1].name },
        { value: getRandom(), name: prev[2].name },
      ])

      return () => clearInterval(intervalId)
    }, 2500);
  }, [])

  useEffect(() => {
    myChart.current = echarts.init(divRef.current);
    myChart.current.setOption({
      ...baseEChartOptions,
      color: colors,
      xAxis: { show: false },
      yAxis: { show: false },
      legend: { // 图例标记
        show: true,
        bottom: '5%',
        width: px(270),
        itemWidth: px(30), // 图例标记的图形宽度
        itemHeight: px(18), // 图例标记的图形高度
        itemGap: px(5), // 图例标记之间的间隔
        textStyle: {
          color: '#fff',
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['75%', '90%'],
          avoidLabelOverlap: false,
          top: '-15%',
          label: {
            show: true, position: 'inside', textStyle: { color: 'white', fontSize: px(20) },
            formatter(options) {
              return (options.value * 100).toFixed(0) + '%';
            }
          },
          labelLine: { show: false },
          itemStyle: {
            borderColor: '#0F113A',
            borderWidth: px(4)
          },
          data: originData
        }
      ]
    });
  }, []);

  /**
   * 跟踪data变化，重新set数据
   */
  useEffect(() => {
    myChart.current.setOption({
      series: {
        data: data
      },
    })
  }, [data])

  return (
    <div className="chart-bottom-group2">
      <div className="chart">
        <div className="main" ref={divRef} />
        <div className="text">年龄</div>
      </div>
    </div>
  )
}