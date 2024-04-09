import { FallingLines } from "react-loader-spinner";

const Falling = () => {
  return (
    <FallingLines
      color="#000000"
      width="50"
      visible={true}
      ariaLabel="falling-circles-loading"
    />
  );
};

export default Falling;
