// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import style from "./customer.module.css";
import { Container, Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

import axios from "axios";

function Customer(props) {
  const [columnIndex, setColumnIndex] = useState("");
  const [columnData, setColumnData] = useState([]);

  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [temporaryData, setTemporaryData] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [createForm, setCreateForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [createTemporaryData, setCreateTemporaryData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [deleteTemporaryData, setDeleteTemporaryData] = useState("");

  const theToken = localStorage.getItem("token");
  // console.log(theToken);

  const handleEditForm = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const submitEditForm = (id) => {
    axios
      .put(
        `http://localhost:1337/customers/${id}`,
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

  const handleCreateForm = (event) => {
    setCreateForm({ ...createForm, [event.target.name]: event.target.value });
  };

  const submitCreateForm = () => {
    // console.log(createForm);
    axios
      .post(
        "http://localhost:1337/customers",
        { ...createForm },
        {
          headers: {
            Authorization: `Bearer ${theToken}`,
          },
        }
      )
      .then((res) => {
        const theData = res.data;
        setCreateTemporaryData({
          ...theData,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteTemporaryData = (data) => {
    setDeleteTemporaryData(data.id);
    axios
      .delete(`http://localhost:1337/customers/${data.id}`, {
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

  // console.log(deleteTemporaryData);

  const enterColumnIndex = (value) => {
    setColumnIndex(value);
  };

  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setColumnData(data);
    setEditForm(data);
    setShow(true);
  };

  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => {
    setShowCreate(true);
  };

  return (
    <>
      {/* EDIT CUSTOMER Modal */}
      <Modal {...columnData} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>Edit Customer</h3>
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
                placeholder={columnData.phone}
                onChange={(event) => handleEditForm(event)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder={columnData.email}
                onChange={(event) => handleEditForm(event)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder={columnData.address}
                onChange={(event) => handleEditForm(event)}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => submitEditForm(columnData.id)}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* CREATE NEW CUSTOMER Modal */}
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={(event) => handleCreateForm(event)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                onChange={(event) => handleCreateForm(event)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={(event) => handleCreateForm(event)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                onChange={(event) => handleCreateForm(event)}
              />
            </Form.Group>
            <Button variant="primary" onClick={() => submitCreateForm()}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Container className="position-relative">
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => props.customer(false, true)}
          className={style.exitButton}
        />
        <div className="d-flex justify-content-center">
          <h3>Customer</h3>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
              </tr>
            </thead>
            <tbody>
              {props.customerData &&
                props.customerData.map((item, index) => {
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
                            ? temporaryData.phone
                            : item.id !== temporaryData.id &&
                              item.id !== deleteTemporaryData
                            ? item.phone
                            : item.id !== temporaryData.id &&
                              item.id === deleteTemporaryData
                            ? null
                            : null}
                        </td>
                        <td>
                          {item.id === temporaryData.id &&
                          item.id !== deleteTemporaryData
                            ? temporaryData.email
                            : item.id !== temporaryData.id &&
                              item.id !== deleteTemporaryData
                            ? item.email
                            : item.id !== temporaryData.id &&
                              item.id === deleteTemporaryData
                            ? null
                            : null}
                        </td>
                        <td>
                          {item.id === temporaryData.id &&
                          item.id !== deleteTemporaryData
                            ? temporaryData.address
                            : item.id !== temporaryData.id &&
                              item.id !== deleteTemporaryData
                            ? item.address
                            : item.id !== temporaryData.id &&
                              item.id === deleteTemporaryData
                            ? null
                            : null}
                        </td>
                        <td
                          className={
                            index === columnIndex
                              ? style.editAndDeleteShow
                              : style.editAndDeleteHide
                          }
                        >
                          <span
                            className="pe-3"
                            onClick={() => handleShow(item)}
                          >
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
      </Container>
      <Container>
        <Button variant="primary" onClick={() => handleShowCreate()}>
          + Create new customer
        </Button>
      </Container>
    </>
  );
}

export default Customer;
