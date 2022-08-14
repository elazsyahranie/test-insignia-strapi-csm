import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

function TravelPackages(props) {
  return (
    <>
      <FontAwesomeIcon
        icon={faDeleteLeft}
        onClick={() => props.travel(false, true)}
      />
      <div className="d-flex">
        <h2>Travel Packages</h2>
      </div>
    </>
  );
}

export default TravelPackages;
