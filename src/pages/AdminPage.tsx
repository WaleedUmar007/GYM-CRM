import { useState } from 'react';
import AdminLayout from './AdminLayout';

const initialCustomers = [
  {
    name: 'waleed',
    email: 'admin@example.com',
    phone: '03215847395',
    membership: 'Gold',
    amount: 'PKR 9,999',
    status: 'Cleared',
    lastPayment: '2025-05-27',
    addedBy: 'Admin',
  },
];

export default function AdminPage() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [customers, setCustomers] = useState(initialCustomers);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState('Cleared');
  const [editDate, setEditDate] = useState('');

  function openEditModal(index: number) {
    setEditIndex(index);
    setEditStatus(customers[index].status);
    setEditDate(customers[index].lastPayment);
    setShowEditModal(true);
  }

  function saveEdit() {
    if (editIndex !== null) {
      const updated = [...customers];
      updated[editIndex] = {
        ...updated[editIndex],
        status: editStatus,
        lastPayment: editDate,
      };
      setCustomers(updated);
      setShowEditModal(false);
    }
  }

  return (
    <AdminLayout active="customers">
      <div className="flex justify-between items-center mb-6 w-full">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <div className="text-gray-500 text-sm">Add and manage gym members</div>
        </div>
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm"
          onClick={() => setShowModal(true)}
        >
          Add Customer
        </button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <div className="text-gray-500 text-sm mb-1">Total Amount</div>
          <div className="text-2xl font-bold text-gray-900">PKR 9,999</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <div className="text-gray-500 text-sm mb-1">Pending Amount</div>
          <div className="text-2xl font-bold text-red-500">PKR 0</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <div className="text-gray-500 text-sm mb-1">Cleared Amount</div>
          <div className="text-2xl font-bold text-green-500">PKR 9,999</div>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-lg shadow p-0 overflow-x-auto w-full">
        <table className="min-w-full text-sm w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Contact Info</th>
              <th className="px-4 py-3 text-left font-semibold">Membership</th>
              <th className="px-4 py-3 text-left font-semibold">Amount</th>
              <th className="px-4 py-3 text-left font-semibold">Payment Status</th>
              <th className="px-4 py-3 text-left font-semibold">Last Payment</th>
              <th className="px-4 py-3 text-left font-semibold">Added By</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                <td className="px-4 py-3 text-gray-700">
                  {c.email}
                  <br />
                  {c.phone}
                </td>
                <td className="px-4 py-3">{c.membership}</td>
                <td className="px-4 py-3">{c.amount}</td>
                <td className={`px-4 py-3 font-semibold flex items-center gap-1 ${c.status === 'Cleared' ? 'text-green-600' : 'text-red-500'}`}>{c.status} <span>✔</span></td>
                <td className="px-4 py-3">{c.lastPayment}</td>
                <td className="px-4 py-3">{c.addedBy}</td>
                <td className="px-4 py-3 text-blue-500 cursor-pointer">
                  <span className="material-icons text-base" onClick={() => openEditModal(i)}>edit</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add Customer Modal (UI only) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-black">Add Customer</h3>
            <form className="space-y-4">
              <input className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-600" placeholder="Name" />
              <input className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-600" placeholder="Email" />
              <input className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-600" placeholder="Phone" />
              <input className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-600" placeholder="Membership" />
              <input className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-600" placeholder="Amount" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" className="px-4 py-2 rounded bg-red-600 text-white" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="px-4 py-2 rounded bg-blue-600 text-white">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Payment Status Modal */}
      {showEditModal && editIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-black">Edit Payment Status</h3>
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); saveEdit(); }}>
              <label className="block text-gray-700 font-medium">Payment Status</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black"
                value={editStatus}
                onChange={e => setEditStatus(e.target.value)}
              >
                <option value="Cleared">Cleared</option>
                <option value="Pending">Pending</option>
              </select>
              <label className="block text-gray-700 font-medium">Last Payment Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black"
                value={editDate}
                onChange={e => setEditDate(e.target.value)}
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" className="px-4 py-2 rounded bg-red-600 text-white" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
} 