import { useState } from "react";
import { Trash2, Edit } from "lucide-react";

const recruiters = [
    { id: 1, name: "John Doe", email: "john@example.com", approved: true },
    { id: 2, name: "Jane Smith", email: "jane@example.com", approved: false },
];

export default function RecruiterManagement() {
    const [data, setData] = useState(recruiters);

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recruiter Management</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-2">Name</th>
                            <th className="text-left p-2">Email</th>
                            <th className="text-left p-2">Approved</th>
                            <th className="text-left p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((recruiter) => (
                            <tr key={recruiter.id} className="border-b">
                                <td className="p-2">{recruiter.name}</td>
                                <td className="p-2">{recruiter.email}</td>
                                <td className="p-2">
                                    <input type="checkbox" checked={recruiter.approved} className="w-4 h-4" />
                                </td>
                                <td className="p-2 flex gap-2">
                                    <button className="p-2 border rounded hover:bg-gray-200">
                                        <Edit size={16} />
                                    </button>
                                    <button className="p-2 border rounded bg-red-500 text-white hover:bg-red-600">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}