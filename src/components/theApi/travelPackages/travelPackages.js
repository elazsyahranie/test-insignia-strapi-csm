import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Form, Image, Button, Modal } from "react-bootstrap";
import style from "./travelPackages.module.css";

import axios from "axios";

function TravelPackages(props) {
  const [columnIndex, setColumnIndex] = useState("");
  const [columnData, setColumnData] = useState([]);
  // const maxNumber = 69;

  const [showImageModal, setShowImageModal] = useState(false);
  const [theImage, setTheImage] = useState("");
  const [showUploadImageButton, setShowUploadImageButton] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    desription: "",
    price: "",
    image: "",
  });
  const [temporaryData, setTemporaryData] = useState({
    id: "",
    name: "",
    desription: "",
    price: "",
    image: "",
  });

  const [createForm, setCreateForm] = useState({
    name: "",
    desription: "",
    price: "",
    image: "",
  });
  const [createTemporaryData, setCreateTemporaryData] = useState({
    name: "",
    desription: "",
    price: "",
    image: "",
  });

  const [deleteTemporaryData, setDeleteTemporaryData] = useState("");

  const theToken = localStorage.getItem("token");

  const handleEditForm = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const submitEditForm = (id) => {
    axios
      .put(
        `http://localhost:1337/travel-packages/${id}`,
        { ...editForm },
        {
          headers: {
            Authorization: `Bearer ${theToken}`,
          },
        }
      )
      .then((res) => {
        const theData = res.data;
        setTemporaryData({
          ...theData,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setTheImage(event.target.files[0]);
      setShowUploadImageButton(true);
    }
  };

  // console.log(image);

  const submitImage = (id) => {
    // console.log("Submit image!");
    // const fd = new FormData();
    // fd.append("image", theImage);
    // for (var pair of fd.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    axios
      .put(
        `http://localhost:1337/travel-packages/${id}`,
        { image: theImage },
        {
          headers: {
            Authorization: `Bearer ${theToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(id);
  };

  const handleDeleteTemporaryData = (data) => {
    setDeleteTemporaryData(data.id);
    axios
      .delete(`http://localhost:1337/travel-packages/${data.id}`, {
        headers: {
          Authorization: `Bearer ${theToken}`,
        },
      })
      .then((res) => {
        const theData = res.data.id;
        setDeleteTemporaryData(theData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const enterColumnIndex = (value) => {
    setColumnIndex(value);
  };

  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setColumnData(data);
    setShowImageModal(true);
    setEditForm(data);
    setShow(true);
  };

  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => {
    setShowCreate(true);
  };

  console.log(columnData);

  return (
    <>
      <Modal {...columnData} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>Edit Travel Packages</h3>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder={columnData.name}
                onChange={(event) => handleEditForm(event)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                placeholder={columnData.description}
                onChange={(event) => handleEditForm(event)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder={columnData.price}
                onChange={(event) => handleEditForm(event)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              {/* {showImageModal && (
                <Image
                  src={`${process.env.REACT_APP_BASE_URL}${columnData.image.formats.thumbnail.url}`}
                  className="me-2"
                />
              )} */}
              {/* <Button variant="info" size="sm">
                Add image
              </Button> */}
              <h4>Upload Image</h4>
              <input type="file" name="myImage" onChange={handleUpdateImage} />
            </Form.Group>
            {showUploadImageButton && (
              <Form.Group src="mb-2">
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => submitImage(columnData.id)}
                >
                  Add image
                </Button>
              </Form.Group>
            )}
            <Button
              variant="primary"
              onClick={() => submitEditForm(columnData.id)}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <FontAwesomeIcon
        icon={faDeleteLeft}
        onClick={() => props.travel(false, true)}
      />
      <div className="d-flex">
        <h2>Travel Packages</h2>
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
            </tr>
          </thead>
          <tbody>
            {props.travelPackagesData &&
              props.travelPackagesData.map((item, index) => {
                return (
                  <>
                    <tr
                      key={index}
                      onMouseEnter={() => enterColumnIndex(index)}
                      onMouseLeave={() => enterColumnIndex("")}
                    >
                      <th scope="row">
                        {item.id !== deleteTemporaryData && index + 1}
                      </th>
                      <td>
                        {item.id === temporaryData.id &&
                        item.id !== deleteTemporaryData
                          ? temporaryData.name
                          : item.id !== temporaryData.id &&
                            item.id !== deleteTemporaryData
                          ? item.name
                          : item.id !== temporaryData.id &&
                            item.id === deleteTemporaryData
                          ? null
                          : null}
                      </td>
                      <td>
                        {item.id === temporaryData.id &&
                        item.id !== deleteTemporaryData
                          ? temporaryData.description
                          : item.id !== temporaryData.id &&
                            item.id !== deleteTemporaryData
                          ? item.description
                          : item.id !== temporaryData.id &&
                            item.id === deleteTemporaryData
                          ? null
                          : null}
                      </td>
                      <td>
                        {item.id === temporaryData.id &&
                        item.id !== deleteTemporaryData
                          ? temporaryData.price
                          : item.id !== temporaryData.id &&
                            item.id !== deleteTemporaryData
                          ? item.price
                          : item.id !== temporaryData.id &&
                            item.id === deleteTemporaryData
                          ? null
                          : null}
                      </td>
                      <td>
                        {item.id === temporaryData.id &&
                        item.id !== deleteTemporaryData ? (
                          <Image
                            src={`${process.env.REACT_APP_BASE_URL}${temporaryData.image.formats.thumbnail.url}`}
                            responsive
                          />
                        ) : item.id !== temporaryData.id &&
                          item.id !== deleteTemporaryData ? (
                          <Image
                            src={`${process.env.REACT_APP_BASE_URL}${item.image.formats.thumbnail.url}`}
                            responsive
                          />
                        ) : item.id !== temporaryData.id &&
                          item.id === deleteTemporaryData ? null : null}
                      </td>
                      <td
                        className={
                          index === columnIndex
                            ? style.editAndDeleteShow
                            : style.editAndDeleteHide
                        }
                      >
                        <span className="pe-3" onClick={() => handleShow(item)}>
                          <FontAwesomeIcon icon={faPencil} />
                        </span>
                        <span onClick={() => handleDeleteTemporaryData(item)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TravelPackages;
