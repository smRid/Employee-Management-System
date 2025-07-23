import {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    function addNewEmployee(){
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            deleteEmployee(id).then((response) => {
                setEmployees(employees.filter(employee => employee.id !== id));
            }).catch(error => {
                console.error(error);
            });
        }
    }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-6 mb-8">
          <div className="rounded-2xl shadow-xl bg-white p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">List of Employees</h2>
            <div className="flex justify-start mb-4 sm:mb-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 sm:py-3 sm:px-4 rounded shadow transition duration-150 text-sm sm:text-base"
                onClick={addNewEmployee}
              >
                Add Employee
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl overflow-hidden border border-gray-300 text-xs sm:text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-900 text-white text-base sm:text-lg">
                    <th className="py-2 sm:py-3 px-1 sm:px-2 text-left border-r border-b border-gray-300">Employee Id</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left border-r  border-b border-gray-300">First Name</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left border-r  border-b border-gray-300">Last Name</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left border-r  border-b border-gray-300">Email</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left border-b border-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-6 sm:py-8 text-gray-400 border-b border-gray-200">No employees found.</td>
                    </tr>
                  ) : (
                    employees.map(employee => (
                      <tr key={employee.id} className="hover:bg-gray-100 transition border-b border-gray-200">
                        <td className="py-2 sm:py-3 px-2 sm:px-4 border-r border-gray-300">{employee.id}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 border-r border-gray-300">{employee.firstName}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 border-r border-gray-300">{employee.lastName}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 border-r border-gray-300">{employee.email}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">{/* No border on last cell */}
                          <div className="flex gap-1 sm:gap-2 flex-wrap">
                            <button
                              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-2 sm:py-2 sm:px-4 rounded transition duration-150 text-xs sm:text-sm"
                              onClick={() => updateEmployee(employee.id)}
                            >
                              Update
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 sm:py-2 sm:px-4 rounded transition duration-150 text-xs sm:text-sm"
                              onClick={() => removeEmployee(employee.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListEmployeeComponent