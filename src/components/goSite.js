import React, { useState } from "react";
import { Button } from "react-bootstrap";

const GoSite = ({ style }) => {
  return (
    <Button
      style={{ ...style, zIndex: 3, display: "flex" }}
      className="goSite"
      icon={
        <img width={18} style={{ marginRight: 7 }} src="/images/logow2.png" />
      }
      type="primary"
    >
      <a
        target="blank"
        style={{ color: "#fff", alignSelf: "center" }}
        href="https://www.uniatlantico.edu.co/uatlantico/node/3080"
      >
        <img width={18} style={{ marginRight: 7 }} src="/images/logow2.png" />
        <span style={{fontWeight: 700}}>Ir al sitio institucional</span>
      </a>
    </Button>
  );
};

export default GoSite;
