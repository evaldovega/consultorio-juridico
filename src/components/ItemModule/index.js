import { useState } from "react";
import { Breadcrumb, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ItemModule = ({ Icon, title, link }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={link}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Card style={{
        height: "60px",
        boxShadow: "4px 4px 4px 4px rgba(194, 194, 194, 0.1)",
        borderRadius: "6px",
        border: 0
      }}>
        <Card.Body
          className="d-flex justify-content-start align-items-center"
        >
          {Icon({ hover })}
          <Card.Title level={5} style={{ margin: 0, color: "#000", fontSize: "18px", fontWeight: 600 }}>{title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ItemModule;
