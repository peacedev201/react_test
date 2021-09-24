import SeasonSelector from "../components/SeasonSelector";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

import axios from "../utils/axios";
import { useHistory } from "react-router";

function PageSeasons(props) {
  const selectedYear = props.global.year;

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

  useEffect(() => {
    if (selectedYear && total.result) {
      getDriverInfo();
    }
  }, [selectedYear, total]);

  const getDriverInfo = async () => {
    try {
      const result = (await axios.get(`/${selectedYear}/results.json?limit=${total.result}&offset=0`)).data.MRData
        .RaceTable.Races;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>
        Standings for <SeasonSelector />
      </h1>
    </div>
  );
}

const mapStateToProps = (state) => ({
  global: state.global,
});

export default connect(mapStateToProps, null)(PageSeasons);
