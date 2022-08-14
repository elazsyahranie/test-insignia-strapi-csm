import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ListOfApi from "../../components/listOfApi/listOfApi";

import axios from "axios";

import Customer from "../../components/theApi/customer/customer";
import CreateOrder from "../../components/theApi/createOrder/createOrder";
import OrderedTravelPackages from "../../components/theApi/orderedTravelPackages/orderedTravelPackages";
import TravelPackages from "../../components/theApi/travelPackages/travelPackages";

function Home() {
  const [listOfApi, setListOfApi] = useState(true);

  const [customer, setCustomer] = useState(false);
  const [travel, setTravel] = useState(false);
  const [order, setOrder] = useState(false);
  const [orderedTravelPackage, setOrderedTravelPackage] = useState(false);

  const [customerData, setCustomerData] = useState([]);

  const [hoverData, setHoverData] = useState();

  const theToken = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  const ListOfApiPanel = (value) => {
    setListOfApi(value);
  };

  const customerPanel = (value, value2) => {
    console.log(theToken);
    if (value) {
      axios
        .get(`http://localhost:1337/customers`, {
          headers: {
            Authorization: `Bearer ${theToken}`,
          },
        })
        .then((res) => {
          setCustomerData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCustomerData([]);
    }
    setCustomer(value);
    setListOfApi(value2);
  };

  // console.log(customerData);

  const travelPanel = (value, value2) => {
    setTravel(value);
    setListOfApi(value2);
  };

  const orderPanel = (value, value2) => {
    setOrder(value);
    setListOfApi(value2);
  };

  console.log(order);

  const orderedTravelPackagePanel = (value, value2) => {
    setOrderedTravelPackage(value);
    setListOfApi(value2);
  };

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
      {listOfApi && (
        <Container>
          <Row>
            <ListOfApi
              listOfApi={ListOfApiPanel}
              customer={customerPanel}
              travel={travelPanel}
              order={orderPanel}
              orderedTravelPackage={orderedTravelPackagePanel}
            />
          </Row>
        </Container>
      )}
      <Customer
        customer={customerPanel}
        listOfApi={ListOfApiPanel}
        customerData={customerData}
      />
      {order && (
        <Container>
          <CreateOrder listOfApi={ListOfApiPanel} order={orderPanel} />
        </Container>
      )}
      {travel && (
        <Container>
          <TravelPackages listOfApi={ListOfApiPanel} travel={travelPanel} />
        </Container>
      )}
      {orderedTravelPackage && (
        <Container>
          <OrderedTravelPackages
            listOfApi={ListOfApiPanel}
            orderedTravelPackage={orderedTravelPackagePanel}
          />
        </Container>
      )}
    </>
  );
}

export default Home;
