import SeasonSelector from "../components/SeasonSelector";
import { connect } from "react-redux";
import { useEffect } from "react";

function PageSeasons(props) {
  const selectedYear = props.global.year;
  useEffect(() => {
    if (selectedYear) {
      console.log(selectedYear);
    }
  }, [selectedYear]);
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
