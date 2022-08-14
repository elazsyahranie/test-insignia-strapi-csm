import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

function CreateOrder(props) {
  return (
    <>
      <FontAwesomeIcon
        icon={faDeleteLeft}
        onClick={() => props.order(false, true)}
      />
      <div className="d-flex">
        <h2>Create Order</h2>
      </div>
    </>
  );
}

export default CreateOrder;
