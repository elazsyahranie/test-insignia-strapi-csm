import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

function OrderedTravelPackages(props) {
  return (
    <>
      <FontAwesomeIcon
        icon={faDeleteLeft}
        onClick={() => props.orderedTravelPackage(false, true)}
      />
      <div className="d-flex">
        <h2>Ordered Travel Packages</h2>
      </div>
    </>
  );
}

export default OrderedTravelPackages;
