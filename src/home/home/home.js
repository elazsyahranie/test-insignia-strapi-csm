import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

import ListOfApi from "../../components/listOfApi/listOfApi";

function Home() {
  const [travel, setTravel] = useState("");

  const travelFunction = () => {
    setTravel("Something's good");
  };

  console.log(travel);

  return (
    <>
      <Container fluid>
        <Row className="pt-3 pb-3">
          <Col lg={6} md={6} sm={6}>
            <h5>Insignia CSM</h5>
          </Col>
          <Col lg={6} md={6} sm={6} className="text-end">
            <span>Elazar Ibrahim</span>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg={6} md={6} sm={6}></Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <ListOfApi travel={travelFunction} />
        </Row>
      </Container>
    </>
  );
}

export default Home;
