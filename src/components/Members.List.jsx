import React, { useState } from 'react';

const MembersList = () => {
  const [members] = useState([
    { id: 1, name: "Branice Nashilu", status: "Active", plan: "Gold" },
    { id: 2, name: "John Doe", status: "Expired", plan: "Silver" },
    { id: 3, name: "Jane Smith", status: "Active", plan: "Platinum" }
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin: Member Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Plan</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{member.name}</td>
                <td className="py-2 px-4 border-b">{member.plan}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded text-sm ${
                    member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersList;
