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
      <Card
        style={{
          boxShadow: "4px 4px 4px 4px rgba(194, 194, 194, 0.1)",
          borderRadius: "6px",
          border: 0,
        }}
      >
        <Card.Body style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <span style={{fontSize: "60px"}}>
            <Icon />
          </span>
          <Card.Title
            level={5}
            className="menu-title-card"
          >
            {title}
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ItemModule;
