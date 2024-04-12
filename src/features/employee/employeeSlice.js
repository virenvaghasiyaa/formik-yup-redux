import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: JSON.parse(localStorage.getItem("employee_list")) || [],
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee(state, action) {
      const newEmployee = {
        ...action.payload,
        emp_id: new Date().getTime(),
        emp_dob: new Date(action.payload.emp_dob).getTime(),
      };
      state.employees = [...state.employees, newEmployee];
      localStorage.setItem("employee_list", JSON.stringify(state.employees));
    },
    editEmployee(state, action) {
      const { emp_id, editedEmployee } = action.payload;
      const existingEmpIndex = state.employees.findIndex(
        (emp) => emp.emp_id === emp_id
      );
      if (existingEmpIndex !== -1) {
        let updatedEmployee = {
          ...state.employees[existingEmpIndex],
          ...editedEmployee,
        };
        if (
          action.payload.emp_dob &&
          !isNaN(new Date(action.payload.emp_dob))
        ) {
          updatedEmployee.emp_dob = new Date(action.payload.emp_dob).getTime();
        }
        state.employees[existingEmpIndex] = updatedEmployee;
        localStorage.setItem("employee_list", JSON.stringify(state.employees));
      }
    },
    deleteEmployee(state, action) {
      const emp_id = action.payload;
      state.employees = state.employees.filter(
        (emp) => emp.emp_id !== emp_id
      );
      localStorage.setItem("employee_list", JSON.stringify(state.employees));
    },
  },
});

export const { addEmployee, editEmployee, deleteEmployee } =
  employeesSlice.actions;

export default employeesSlice.reducer;
