import { Container, Row, Col } from "react-bootstrap";
import style from "./listOfApi.module.css";

function ListOfApi(props) {
  return (
    <>
      <Container>
        <div className={style.listOfSquares}>
          <div className={style.squareContainer}>
            <div className={style.squareCard} onClick={() => props.travel()}>
              <div>
                <h3 className={style.squareMenu}>Customer</h3>
              </div>
            </div>
          </div>
          <div className={style.squareContainer}>
            <div className={style.squareCard}>
              <h3 className={style.squareMenu}>Travel Package</h3>
            </div>
          </div>
          <div className={style.squareContainer}>
            <div className={style.squareCard}>
              <h3 className={style.squareMenu}>Create Order</h3>
            </div>
          </div>
          <div className={style.squareContainer}>
            <div className={style.squareCard}>
              <h5 className={style.squareMenu}>Show Ordered Travel Package</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ListOfApi;
