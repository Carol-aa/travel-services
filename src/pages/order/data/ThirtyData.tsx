/* eslint-disable prefer-const */

import React from 'react';
import { connect } from 'dva';
import ReactEchartsCore from 'echarts-for-react/lib/core';

import * as echarts from 'echarts';
import _ from 'lodash';
import { Empty } from 'antd';

function ThirtyData(props: any) {
  const { thirtyDataTrend } = props || {};
  type EChartsOption = echarts.EChartOption;
  // const [main, setMain] = useState('');
  // let myChart: string | echarts.ECharts | null | undefined;
  let option: EChartsOption;
  // let chartDom: HTMLElement | null = null;
  const getValue = () => {
    const valueObj: { value: Array<number>; stat_date: Array<string> } = {
      value: [],
      stat_date: [],
    };
    thirtyDataTrend?.map((val: { stat_date: string; value: number }) => {
      valueObj?.value.push(val?.value >= 0 ? val?.value : 0);
      valueObj?.stat_date.push(val?.stat_date);
    });
    return valueObj;
  };
  option = {
    tooltip: {},
    legend: {},
    xAxis: {
      type: 'category',
      data: getValue().stat_date,
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        formatter(value: any) {
          return value.slice(5);
        },
        // rotate: 20
        fontSize: 11,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: getValue().value,
        label: {
          show: true,
          position: 'top',
        },
        labelLine: {
          show: false,
        },
      },
    ],
    grid: {
      left: 'center',
      width: '95%',
    },
  };
  // useEffect(() => {
  // if (!chartDom) {
  //     console.log(document.getElementById('main'), 1)
  //     chartDom = document.getElementById('main');
  // }
  // setMain(chartDom as any);

  // }, [])

  // if (main !== "") {
  //     myChart = echarts.init(main as any);
  //     myChart.setOption(option);
  // }
  return (
    <div className="common-baseInformation baseInformation-charts">
      {_.isEmpty(thirtyDataTrend) ? (
        <Empty description="暂无数据" />
      ) : (
        <ReactEchartsCore
          option={option}
          style={{ height: 500 }}
          echarts={echarts}
          notMerge
        />
      )}
      {/* <div id='main' style={{ height: 400 }} /> */}
    </div>
  );
}

const mapStateToProps = (state: { baseInformation: any }) => ({
  ...state.baseInformation,
});

export default connect(mapStateToProps)(ThirtyData);
