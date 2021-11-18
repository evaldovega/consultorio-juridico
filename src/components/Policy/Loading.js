import { useEffect, useRef } from "react";

const { default: Slogan } = require("components/Slogan");

const Loading = ({ loading }) => {
  const div = useRef();

  useEffect(() => {
    if (!loading) {
      div.current.className = "animate__animated animate__fadeOut";
    }
  }, [loading]);

  return (
    <div className="loader">
      <div ref={div} className="loader-content">
        <img
          src="/images/logow.png"
          className="animate__animated animate__pulse animate__infinite"
        />
        <Slogan />
      </div>
    </div>
  );
};

export default Loading;
