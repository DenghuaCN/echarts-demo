import React from 'react';

import headerBg from '../../assets/images/header.png'
import './home.scss';
import ChartBar from '../components/ChartBar';
import ChartBarVertical from '../components/ChartBarVertical';
import ChartLine from '../components/ChartLine';
import ChartLineArea from '../components/ChartLineArea';
import ChartTable from '../components/ChartTable';
import ChartMap from '../components/ChartMap';
import Chart7 from '../components/Chart7';
import Chart8 from '../components/Chart8';
import Chart9 from '../components/Chart9';
import Chart10 from '../components/Chart10';
import Chart11 from '../components/Chart11';
import Chart12 from '../components/Chart12';
import Chart13 from '../components/Chart13';
import Chart14 from '../components/Chart14';
import Chart15 from '../components/Chart15';

export const Home = () => {

  return (
    <div className='home'>
      <header style={{ backgroundImage: `url(${headerBg})` }} >Data Dashboard</header>
      <main>
        <section className="section1">
          <ChartBar />
          <ChartBarVertical />
        </section>

        <section className="section2">
          <ChartLine />
          <ChartLineArea />
        </section>

        <section className="bordered section3">
          <ChartTable />
        </section>

        <section className="section4">
          <ChartMap />
          <div className="bordered chart-bottom">
            <h2>Group1</h2>
            <div className="charts">
              <Chart7 />
              <Chart8 />
              <Chart9 />
            </div>
          </div>
        </section>

        <section className="section5">
        <div className="bordered row1 chart-right-group1">
            <h2>Group2</h2>
            <div className="charts">
              <Chart10 />
              <Chart11 />
            </div>
          </div>
          <div className="bordered row2 chart-right-group2">
            <h2>Group3</h2>
            <div className="charts">
              <Chart12 />
              <Chart13 />
            </div>
          </div>
          <div className="bordered row3 chart-right-group3">
            <h2>Group4</h2>
            <div className="charts">
              <Chart14 />
              <Chart15 />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
