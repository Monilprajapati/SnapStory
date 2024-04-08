import React from "react";
import { LineWave } from "react-loader-spinner";

const Spinner = () => {
  return (
    <LineWave
      visible={true}
      height="100"
      width="100"
      color="#000000"
      ariaLabel="line-wave-loading"
      wrapperStyle={{}}
      wrapperClass=""
      firstLineColor=""
      middleLineColor=""
      lastLineColor=""
    />
  );
};

export default Spinner;
