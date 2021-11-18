import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { animateCSS } from "utils";

const Errors = ({ message = "", children }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [msn, setMsn] = useState("");

  useEffect(() => {
    if (ref.current) {
      if (!message.length) {
        animateCSS(ref.current, "flipOutX").then(() => {
          setMsn("");
        });
      } else {
        setMsn(message);
        animateCSS(ref.current, "flipInX");
      }
    }
  }, [message]);

  return (
    <span
      ref={ref}
      role="alert"
      class="invalid-feedback d-block animate__animated"
    >
      {msn.length ? children : ""}
      {msn}
    </span>
  );
};

export default Errors;
