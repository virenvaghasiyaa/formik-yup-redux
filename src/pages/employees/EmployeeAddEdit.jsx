import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addEmployee,
  editEmployee,
} from "../../features/employee/employeeSlice";

const EmployeeAddEdit = () => {
  const [isEditMode, setIsEditMode] = useState("");

  const dispatch = useDispatch();
  const employees = useSelector((state) => state?.employees?.employees);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setIsEditMode("edit");
      const getEmployee =
        employees.find((emp) => emp.emp_id === parseInt(params.id)) || {};
      const formattedEmployee = {
        ...getEmployee,
        emp_dob: getEmployee.emp_dob
          ? new Date(getEmployee.emp_dob).toISOString().split("T")[0]
          : "",
      };
      formik.setValues(formattedEmployee);
      return;
    }
  }, [employees, params.id]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    emp_name: Yup.string().required("Name is required!"),
    emp_email: Yup.string()
      .email("Enter valid email!")
      .required("Email is required!"),
    emp_phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid!")
      .required("Phone is required!"),
    emp_dob: Yup.date()
      .max(
        new Date(Date.now() - 567648000000),
        "You must be at least 18 years old!"
      )
      .required("Birth date is required!"),
    emp_address: Yup.string().required("Address is required!"),
    emp_role: Yup.string().required("Role is required!"),
  });

  const handleSubmit = (fields) => {
    console.log("fields", fields);
    if (isEditMode === "edit") {
      dispatch(editEmployee({ emp_id: parseInt(params.id), editedEmployee: fields }));
      navigate("/");
      return;
    }
    dispatch(addEmployee(fields));
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {
      emp_name: "",
      emp_email: "",
      emp_phone: "",
      emp_address: "",
      emp_dob: "",
      emp_role: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      handleSubmit(values);
      action.resetForm();
    },
  });

  // console.log("formik", formik);

  return (
    <div>
      <form noValidate onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="emp_name" className="form-label">
            Employee Name
          </label>
          <input
            id="emp_name"
            name="emp_name"
            value={formik.values.emp_name}
            onChange={formik.handleChange}
            type="text"
            className={`form-control ${
              formik.errors.emp_name && formik.touched.emp_name
                ? "is-invalid"
                : ""
            }`}
          />
          {formik.touched.emp_name && formik.errors.emp_name ? (
            <small className="invalid-feedback">{formik.errors.emp_name}</small>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="emp_email" className="form-label">
            Employee Email
          </label>
          <input
            id="emp_email"
            name="emp_email"
            value={formik.values.emp_email}
            onChange={formik.handleChange}
            type="text"
            className={`form-control ${
              formik.errors.emp_email && formik.touched.emp_email
                ? "is-invalid"
                : ""
            }`}
          />
          {formik.touched.emp_email && formik.errors.emp_email ? (
            <small className="invalid-feedback">
              {formik.errors.emp_email}
            </small>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="emp_phone" className="form-label">
            Employee Phone
          </label>
          <input
            id="emp_phone"
            name="emp_phone"
            value={formik.values.emp_phone}
            onChange={formik.handleChange}
            type="number"
            className={`form-control ${
              formik.errors.emp_phone && formik.touched.emp_phone
                ? "is-invalid"
                : ""
            }`}
          />
          {formik.touched.emp_phone && formik.errors.emp_phone ? (
            <small className="invalid-feedback">
              {formik.touched.emp_phone}
            </small>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="emp_dob" className="form-label">
            Employee date of birth
          </label>
          <input
            id="emp_dob"
            name="emp_dob"
            value={formik.values.emp_dob}
            onChange={formik.handleChange}
            type="date"
            className={`form-control ${
              formik.errors.emp_dob && formik.touched.emp_dob
                ? "is-invalid"
                : ""
            }`}
          />
          {formik.touched.emp_dob && formik.errors.emp_dob ? (
            <small className="invalid-feedback">{formik.errors.emp_dob}</small>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="emp_address" className="form-label">
            Employee Address
          </label>
          <textarea
            id="emp_address"
            name="emp_address"
            value={formik.values.emp_address}
            onChange={formik.handleChange}
            className={`form-control ${
              formik.errors.emp_address && formik.touched.emp_address
                ? "is-invalid"
                : ""
            }`}
          />
          {formik.touched.emp_address && formik.errors.emp_address ? (
            <small className="invalid-feedback">
              {formik.errors.emp_address}
            </small>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="emp_role" className="form-label">
            Employee Role
          </label>
          <select
            id="emp_role"
            name="emp_role"
            value={formik.values.emp_role}
            onChange={formik.handleChange}
            className={`form-control ${
              formik.errors.emp_role && formik.touched.emp_role
                ? "is-invalid"
                : ""
            }`}
          >
            <option value="">Please select an option</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {formik.touched.emp_role && formik.errors.emp_role ? (
            <small className="invalid-feedback">{formik.errors.emp_role}</small>
          ) : null}
        </div>

        <button type="submit" className="mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeAddEdit;
