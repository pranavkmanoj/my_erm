import React, { useState } from "react";

const DeleteEmployeePanel = () => {
    const [search, setSearch] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const employees = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
        { id: 3, name: "Alice Johnson", email: "alice@example.com" },
    ];

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Delete Employee Account</h2>
            <input
                type="text"
                placeholder="Search employees..."
                className="border p-2 w-full mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {employees
                    .filter((emp) =>
                        emp.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((emp) => (
                        <div
                            key={emp.id}
                            className={`border p-4 rounded-lg shadow ${selectedEmployee && selectedEmployee.id === emp.id ? 'bg-gray-200' : 'cursor-pointer'}`}
                            onClick={() => setSelectedEmployee(emp)}
                        >
                            <h3 className="font-semibold">{emp.name}</h3>
                            <p className="text-gray-500">{emp.email}</p>
                            {selectedEmployee && selectedEmployee.id === emp.id && (
                                <div className="mt-2">
                                    <p><strong>Email:</strong> {selectedEmployee.email}</p>
                                    <button
                                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => setSelectedEmployee(null)}
                                    >
                                        Hide Details
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default DeleteEmployeePanel;
