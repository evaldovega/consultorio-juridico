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
      <Card>
        <Card.Body className="d-flex justify-content-start align-items-center">
          {Icon({ hover })}
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ItemModule;
