import { useEffect, useState } from "react";
import { UseWineDataContext } from "../context/WineDataContext";
import { getMean, getMedian, getMode } from "../utility/calculation";

//HighOrder Component for Rendering table for specific data property

export default function RenderTable({ property }) {
  const { dataSet, classes } = UseWineDataContext();

  //statistic data for table
  const [stats, setStats] = useState();

  useEffect(() => {
    //setting stats data using utilties
    let res = getMean(dataSet, {}, property);
    res = { ...res, median: getMedian(dataSet, {}, property) };
    res = { ...res, mode: getMode(dataSet, {}, property) };
    setStats(res);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          {classes?.map((ele) => (
            <th>{`Class ${ele}`}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{`${property} Mean`}</th>

          {stats?.mean
            ? Object.keys(stats?.mean).map((ele) => <td>{stats?.mean[ele]}</td>)
            : null}
        </tr>
        <tr>
          <th>{`${property} Median`}</th>
          {stats?.median
            ? Object.keys(stats?.median).map((ele) => (
                <td>{stats?.median[ele]}</td>
              ))
            : null}
        </tr>
        <tr>
          <th>{`${property} Mode`}</th>
          {stats?.mode
            ? Object.keys(stats?.mode).map((ele) => (
                <td>{(stats?.mode[ele]).map((ele) => `${ele}, `)}</td>
              ))
            : null}
        </tr>
      </tbody>
    </table>
  );
}
