import axios from "../utils/axios";
import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";

function DriverInfo(props) {
  const history = useHistory();
  const selectedDriver = props.global.driver;

  const [driverInfo, setDriverInfo] = useState([]);

  const getDriverInfo = useCallback(
    async (resultNum) => {
      try {
        const result = (
          await axios.get(`/drivers/${selectedDriver.Driver.driverId}/driverStandings.json?limit=${resultNum}&offset=0`)
        ).data.MRData.StandingsTable.StandingsLists;
        setDriverInfo(result);
      } catch (error) {
        console.log(error);
      }
    },
    [selectedDriver]
  );

  useEffect(() => {
    if (!selectedDriver) {
      history.push("/");
    } else {
      const fetchTotal = async () => {
        let resultNum = (await axios.get(`/drivers/${selectedDriver.Driver.driverId}/driverStandings.json`)).data.MRData
          .total;
        getDriverInfo(resultNum);
      };
      fetchTotal();
    }
  }, [selectedDriver, history, getDriverInfo]);

  return (
    <div>
      <h1>{selectedDriver ? selectedDriver.Driver.givenName + " " + selectedDriver.Driver.familyName : ""}</h1>
      <div className="result">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Position</th>
              <th>Points</th>
              <th>Constructor</th>
            </tr>
          </thead>
          <tbody>
            {driverInfo.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.season}</td>
                  <td>{item.DriverStandings[0].position}</td>
                  <td>{item.DriverStandings[0].points}</td>
                  <td>
                    {item.DriverStandings[0].Constructors.map((i) => {
                      return i.name;
                    }).join(", ")}
                  </td>
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

export default connect(mapStateToProps, null)(DriverInfo);
