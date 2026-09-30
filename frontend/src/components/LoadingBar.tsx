import loading from "../assets/loading.gif";

const LoadingBar = () => {
  return (
    <div className="text-center">
      <img src={loading} alt="Loading" />
    </div>
  );
};

export default LoadingBar;
