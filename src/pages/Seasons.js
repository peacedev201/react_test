import SeasonSelector from "../components/SeasonSelector";
import { connect } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import axios from "../utils/axios";
import { useHistory } from "react-router";
import { selectDriver } from "../state/actions";

function PageSeasons(props) {
  const history = useHistory();
  const selectedYear = props.global.year;

  const [drivers, setDrivers] = useState([]);
  const [constructors, setConstructors] = useState([]);

  const [total, setTotal] = useState({
    result: 0,
  });

  useEffect(() => {
    setDrivers([]);
    setConstructors([]);
    const fetchTotal = async () => {
      let resultNum = (await axios.get(`/${selectedYear}/results.json`)).data.MRData.total;
      setTotal({
        result: resultNum,
      });
    };
    if (!total.result && selectedYear) {
      fetchTotal();
    }
  }, [total, selectedYear]);

  const getDriverInfo = useCallback(async () => {
    try {
      const result = (await axios.get(`/${selectedYear}/results.json?limit=${total.result}&offset=0`)).data.MRData
        .RaceTable.Races;

      let temp_driver = {};
      let temp_constructor = {};

      for (const iterator of result) {
        for (const item of iterator.Results) {
          if (temp_driver[item.Driver.driverId]) {
            let temp = {
              ...item.Driver,
              point: parseInt(item.points) + parseInt(temp_driver[item.Driver.driverId].point),
              constructor: item.Constructor.name,
            };
            temp_driver = { ...temp_driver, [item.Driver.driverId]: temp };
          } else {
            temp_driver = {
              ...temp_driver,
              [item.Driver.driverId]: {
                ...item.Driver,
                point: parseInt(item.points),
                constructor: item.Constructor.name,
              },
            };
          }

          if (temp_constructor[item.Constructor.constructorId]) {
            let temp = {
              ...item.Constructor,
              point: parseInt(item.points) + parseInt(temp_constructor[item.Constructor.constructorId].point),
            };
            temp_constructor = { ...temp_constructor, [item.Constructor.constructorId]: temp };
          } else {
            temp_constructor = {
              ...temp_constructor,
              [item.Constructor.constructorId]: {
                ...item.Constructor,
                point: parseInt(item.points),
              },
            };
          }
        }
      }

      setDrivers(
        Object.values(temp_driver).sort((a, b) => {
          return b.point - a.point;
        })
      );

      setConstructors(
        Object.values(temp_constructor).sort((a, b) => {
          return b.point - a.point;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [selectedYear, total]);

  useEffect(() => {
    if (selectedYear && total.result) {
      getDriverInfo();
    }
  }, [selectedYear, total, getDriverInfo]);

  return (
    <div>
      <h1>
        Standings for <SeasonSelector />
      </h1>
      <div className="result">
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Driver Name</th>
              <th>Constructor</th>
              <th>Point</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td
                    className="drivername"
                    onClick={() => {
                      history.push(`/driver/${item.driverId}`);
                      props.selectDriver({
                        driver: item,
                      });
                    }}
                  >
                    {item.givenName + " " + item.familyName}
                  </td>
                  <td>{item.constructor}</td>
                  <td>{item.point}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Constructor Name</th>
              <th>Point</th>
            </tr>
          </thead>
          <tbody>
            {constructors.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.point}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  global: state.global,
});

const mapDispatchToProps = (dispatch) => ({
  selectDriver: (payload) => dispatch(selectDriver(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageSeasons);
