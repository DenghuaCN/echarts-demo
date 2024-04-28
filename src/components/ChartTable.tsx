import React from 'react';

export default function ChartTable() {
  return (
    <div className="chart5-table">
      <h2>Table</h2>
      <table>
        <thead>
          <tr>
            <th>年份</th><th>field1</th><th>field2</th><th>field3</th><th>field4</th>
            <th>field5</th><th>field6</th><th>合计</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2015</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td>
          </tr>
          <tr>
            <td>2016</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td>
          </tr>
          <tr>
            <td>2017</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td>
          </tr>
          <tr>
            <td>2018</td><td>1</td><td>5</td><td>4</td><td>7</td><td>6</td><td>3</td><td>8</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};