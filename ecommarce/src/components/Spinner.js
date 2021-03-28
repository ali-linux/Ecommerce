import React from "react";
import { Spinner as Spin } from "react-bootstrap";

function Spinner({ height = 100, width = 100 }) {
  return (
    <Spin
      animation="border"
      role="status"
      style={{
        height: { height },
        width: { width },
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only"> Loading...</span>
    </Spin>
  );
}

export default Spinner;
