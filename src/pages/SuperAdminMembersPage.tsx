import { useState } from 'react';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

const mockMembers = [
  { id: 1, name: 'Ali Raza', email: 'ali.raza@gmail.com', phone: '0300-1234567', status: 'Active', joined: '2023-01-10' },
  { id: 2, name: 'Sara Khan', email: 'sara.khan@gmail.com', phone: '0301-9876543', status: 'Inactive', joined: '2022-11-22' },
  { id: 3, name: 'Bilal Ahmed', email: 'bilal.ahmed@gmail.com', phone: '0321-5555555', status: 'Active', joined: '2023-03-05' },
];
const mockAdmins = [
  { id: 1, name: 'Admin One', email: 'admin1@kotlagymkhana.com', phone: '0300-0000001', status: 'Active', joined: '2022-01-01' },
  { id: 2, name: 'Admin Two', email: 'admin2@kotlagymkhana.com', phone: '0300-0000002', status: 'Active', joined: '2022-06-15' },
];

export default function SuperAdminMembersPage() {
  const [membersFilter, setMembersFilter] = useState<'members' | 'admins'>('members');
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [admins, setAdmins] = useState(mockAdmins);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', phone: '' });

  function handleAddAdmin(e: React.FormEvent) {
    e.preventDefault();
    setAdmins([
      ...admins,
      { id: admins.length + 1, name: newAdmin.name, email: newAdmin.email, phone: newAdmin.phone, status: 'Active', joined: new Date().toISOString().slice(0, 10) },
    ]);
    setShowAddAdmin(false);
    setNewAdmin({ name: '', email: '', phone: '' });
  }

  return (
    <SuperAdminLayout>
      <div className="p-8 bg-[#f6faff] min-h-screen w-full">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full">
          <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
            <div className="text-3xl text-blue-600">👤</div>
            <div>
              <div className="text-gray-500 text-sm mb-1">Total Gym Members</div>
              <div className="text-2xl font-bold text-gray-900">{mockMembers.length}</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
            <div className="text-3xl text-purple-600">🛡️</div>
            <div>
              <div className="text-gray-500 text-sm mb-1">Number of Admins</div>
              <div className="text-2xl font-bold text-gray-900">{admins.length}</div>
            </div>
          </div>
        </div>
        {/* Filter and Add Admin Button */}
        <div className="flex gap-4 mb-4 items-center justify-between w-full">
          <div>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${membersFilter === 'members' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-300'}`}
              onClick={() => setMembersFilter('members')}
            >
              Show Members
            </button>
            <button
              className={`ml-2 px-4 py-2 rounded-lg font-medium transition-colors ${membersFilter === 'admins' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-300'}`}
              onClick={() => setMembersFilter('admins')}
            >
              Show Admins
            </button>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors text-base shadow-sm"
            onClick={() => setShowAddAdmin(true)}
          >
            + Add Admin
          </button>
        </div>
        {/* Table */}
        <div className="bg-white rounded-lg shadow p-6 w-full overflow-x-auto">
          <table className="min-w-full text-left text-black">
            <thead>
              <tr className="text-gray-600 text-sm">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {(membersFilter === 'members' ? mockMembers : admins).map((m) => (
                <tr key={m.id} className="border-b last:border-b-0 hover:bg-blue-50">
                  <td className="py-2 px-4 font-medium">{m.name}</td>
                  <td className="py-2 px-4">{m.email}</td>
                  <td className="py-2 px-4">{m.phone}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${m.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>{m.status}</span>
                  </td>
                  <td className="py-2 px-4">{m.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Add Admin Modal */}
        {showAddAdmin && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
              <form className="space-y-4" onSubmit={handleAddAdmin}>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
                  value={newAdmin.name}
                  onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
                  value={newAdmin.email}
                  onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
                  value={newAdmin.phone}
                  onChange={e => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                  required
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium"
                    onClick={() => setShowAddAdmin(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white font-semibold"
                  >
                    Add Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </SuperAdminLayout>
  );
} 