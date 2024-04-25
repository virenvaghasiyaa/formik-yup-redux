import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser, fetchUsers } from "../../features/usersSlice";
import { Button, Modal, Table } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.users?.users);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isEditMode, setIsEditMode] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required!"),
    username: Yup.string().required("username is required!"),
    email: Yup.string()
      .email("enter valid email!")
      .required("email is required!"),
    phone: Yup.number().required("phone is required!"),
    address: Yup.object().shape({
      city: Yup.string().required("address is required!"),
    }),
  });

  const initialValues = {
    name: "",
    username: "",
    email: "",
    phone: "",
    address: {
      city: "",
    },
  };

  const { values, errors, touched, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        console.log("values", values);
        handleSubmission(values);
        action.resetForm();
      },
    });

  const handleEdit = (usr) => {
    setIsEditMode("edit");
    handleShow();
    setValues(usr);
  };

  const handleSubmission = (fields) => {
    console.log("fields", fields);
    if (isEditMode === "edit") {
      // edit
      dispatch(editUser({ userId: fields.id, editedUser: fields }));
      handleClose();
      return;
    }
    console.log("mode", isEditMode)
    // add
    dispatch(addUser(fields));
    handleClose();
  };

  console.log("users", users, values);

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => {
          setIsEditMode("add");
          setValues(initialValues);
          handleShow();
        }}
      >
        Add User
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Use Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>User Email</th>
            <th>User Phone</th>
            <th>User Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.length !== 0 ? (
            users.map((usr) => (
              <tr key={usr?.id}>
                <td>{usr?.id}</td>
                <td>{usr?.name}</td>
                <td>{usr?.username}</td>
                <td>{usr?.email}</td>
                <td>{usr?.phone}</td>
                <td>{usr?.address?.city}</td>
                <td>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleEdit(usr)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    // onClick={() => handleDelete(emp.emp_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center">
                No data found!
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* add/edit modal */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode === "edit" ? "Edit" : "Add"} User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form noValidate onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                type="text"
                className={`form-control ${
                  errors.name && touched.name ? "is-invalid" : ""
                }`}
              />
              {touched.name && errors.name ? (
                <small className="invalid-feedback">{errors.name}</small>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                type="text"
                className={`form-control ${
                  errors.username && touched.username ? "is-invalid" : ""
                }`}
              />
              {touched.username && errors.username ? (
                <small className="invalid-feedback">{errors.username}</small>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                type="email"
                className={`form-control ${
                  errors.email && touched.email ? "is-invalid" : ""
                }`}
              />
              {touched.email && errors.email ? (
                <small className="invalid-feedback">{errors.email}</small>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                type="tel"
                className={`form-control ${
                  errors.phone && touched.phone ? "is-invalid" : ""
                }`}
              />
              {touched.phone && errors.phone ? (
                <small className="invalid-feedback">{errors.phone}</small>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={values?.address?.city}
                onChange={handleChange}
                className={`form-control ${
                  errors?.address?.city && touched?.address?.city
                    ? "is-invalid"
                    : ""
                }`}
              />
              {touched?.address?.city && errors?.address?.city ? (
                <small className="invalid-feedback">
                  {errors?.address?.city}
                </small>
              ) : null}
            </div>

            <button type="submit" className="mt-3">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserList;
