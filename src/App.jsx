import "./App.css";
import { Routes, Route } from "react-router-dom";
import EmployeeAddEdit from "./pages/employees/EmployeeAddEdit";
import EmployeesList from "./pages/employees/EmployeesList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EmployeesList />} />
      <Route path="/:id" element={<EmployeeAddEdit />} />
      <Route path="/create" element={<EmployeeAddEdit />} />
    </Routes>
  );
}

export default App;
