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
    driver: 0,
    constructor: 0,
  });

  useEffect(() => {
    setDrivers([]);
    setConstructors([]);
    const fetchTotal = async () => {
      let driverNum = (await axios.get(`/${selectedYear}/driverStandings.json`)).data.MRData.total;
      let constructorNum = (await axios.get(`/${selectedYear}/constructorStandings.json`)).data.MRData.total;
      setTotal({
        driver: parseInt(driverNum),
        constructor: parseInt(constructorNum),
      });
    };
    fetchTotal();
  }, [selectedYear]);

  const getDriverInfo = useCallback(async () => {
    try {
      if (total.driver) {
        const driverResult = (await axios.get(`/${selectedYear}/driverStandings.json?limit=${total.driver}&offset=0`))
          .data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings;
        setDrivers(driverResult);
      }
      if (total.constructor) {
        const constructorResult = (
          await axios.get(`/${selectedYear}/constructorStandings.json?limit=${total.constructor}&offset=0`)
        ).data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings;
        setConstructors(constructorResult);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedYear, total]);

  useEffect(() => {
    if (selectedYear && total.driver) {
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
                  <td>{item.position}</td>
                  <td
                    className="drivername"
                    onClick={() => {
                      history.push(`/driver`);
                      props.selectDriver({
                        driver: item,
                      });
                    }}
                  >
                    {item.Driver.givenName + " " + item.Driver.familyName}
                  </td>
                  <td>
                    {item.Constructors.map((i) => {
                      return i.name;
                    }).join()}
                  </td>
                  <td>{item.points}</td>
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
                  <td>{item.position}</td>
                  <td>{item.Constructor.name}</td>
                  <td>{item.points}</td>
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
