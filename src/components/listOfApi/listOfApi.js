import { Container, Button } from "react-bootstrap";
import style from "./listOfApi.module.css";

function ListOfApi(props) {
  return (
    <>
      <Container className="pt-5">
        <div className={style.listOfSquares}>
          <div className="mb-3">
            <Button
              className={style.insideSquareButton}
              onClick={() => props.customer(true, false)}
            >
              Customer
            </Button>
          </div>
          <div className="mb-3">
            <Button
              className={style.insideSquareButton}
              onClick={() => props.order(true, false)}
            >
              Create Order
            </Button>
          </div>
          <div className="mb-3">
            <Button
              className={style.insideSquareButton}
              onClick={() => props.travel(true, false)}
            >
              Travel Packages
            </Button>
          </div>
          <div className="mb-3">
            <Button
              className={style.insideSquareButton}
              onClick={() => props.orderedTravelPackage(true, false)}
            >
              Ordered Travel Packages
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ListOfApi;
