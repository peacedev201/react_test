import { connect } from "react-redux";

function DriverInfo(props) {
  return <div></div>;
}

const mapStateToProps = (state) => ({
  global: state.global,
});

export default connect(mapStateToProps, null)(DriverInfo);
