import React from "react";
import Footer from "components/Footer";
import HeaderPage from "components/Header";
import { Container } from "react-bootstrap";

const Page = ({ children, fullWidth = false }) => {
  return (
    <>
      <HeaderPage />
      <div style={{ marginTop: 100, paddingBottom: 100 }}>
        {!fullWidth && <Container>{children}</Container>}
        {fullWidth && <Container fluid>{children}</Container>}
      </div>
      <Footer />
    </>
  );
};

export default Page;
