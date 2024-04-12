import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../../features/employee/employeeSlice";

const EmployeesList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state?.employees?.employees);

  const navigate = useNavigate();

  const handleEdit = (emp) => {
    navigate(`/${emp?.emp_id}`);
  };

  const handleDelete = (emp_id) => {
    dispatch(deleteEmployee(emp_id));
  };

  return (
    <div>
      {/* <Button variant="secondary" onClick={handleFilterModalShow}>
        Filter
      </Button> */}
      <Button variant="primary" onClick={() => navigate(`/create`)}>
        Add Product
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>EMP ID</th>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Employee Phone</th>
            <th>Employee Address</th>
            <th>Employee Birth date</th>
            <th>Employee Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees?.length !== 0 ? (
            employees.map((emp) => (
              <tr key={emp?.emp_id}>
                <td>{emp?.emp_id}</td>
                <td>{emp?.emp_name}</td>
                <td>{emp?.emp_email}</td>
                <td>{emp?.emp_phone}</td>
                <td>{emp?.emp_address}</td>
                <td>{new Date(emp?.emp_dob).toISOString().split("T")[0]}</td>
                <td>{emp?.emp_role}</td>
                <td>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(emp.emp_id)}
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
    </div>
  );
};

export default EmployeesList;
