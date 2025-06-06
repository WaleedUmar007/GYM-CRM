import { useState } from 'react';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

interface GymPackage {
  id: string;
  name: string;
  price: number;
  services: string[];
  duration: string;
}

export default function SuperAdminSettingsPage() {
  const [packages, setPackages] = useState<GymPackage[]>([
    {
      id: '1',
      name: 'Basic',
      price: 2000,
      services: ['Access to gym equipment', 'Locker access'],
      duration: '1 month'
    },
    {
      id: '2',
      name: 'Standard',
      price: 3500,
      services: ['Access to gym equipment', 'Locker access', 'Group fitness classes'],
      duration: '1 month'
    },
    {
      id: '3',
      name: 'Premium',
      price: 5000,
      services: ['Access to gym equipment', 'Locker access', 'Group fitness classes', 'Personal trainer (2 sessions/week)'],
      duration: '1 month'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<GymPackage | null>(null);
  const [newPackage, setNewPackage] = useState<Omit<GymPackage, 'id'>>({
    name: '',
    price: 0,
    services: [''],
    duration: '1 month'
  });

  // Add package
  const handleAddPackage = () => {
    const id = Date.now().toString();
    // Ensure price is not negative
    const safePrice = Math.max(0, newPackage.price);
    setPackages([...packages, { ...newPackage, price: safePrice, id }]);
    setIsAddModalOpen(false);
    setNewPackage({
      name: '',
      price: 0,
      services: [''],
      duration: '1 month'
    });
  };

  // Edit package
  const handleEditPackage = () => {
    if (!currentPackage) return;
    
    // Ensure price is not negative
    const safePrice = Math.max(0, currentPackage.price);
    
    setPackages(packages.map(pkg => 
      pkg.id === currentPackage.id ? {...currentPackage, price: safePrice} : pkg
    ));
    
    setIsEditModalOpen(false);
    setCurrentPackage(null);
  };

  // Delete package
  const handleDeletePackage = () => {
    if (!currentPackage) return;
    
    setPackages(packages.filter(pkg => pkg.id !== currentPackage.id));
    setIsDeleteModalOpen(false);
    setCurrentPackage(null);
  };

  // Add new service field
  const addServiceField = (isEdit: boolean) => {
    if (isEdit && currentPackage) {
      setCurrentPackage({
        ...currentPackage,
        services: [...currentPackage.services, '']
      });
    } else {
      setNewPackage({
        ...newPackage,
        services: [...newPackage.services, '']
      });
    }
  };

  // Update service field
  const updateServiceField = (index: number, value: string, isEdit: boolean) => {
    if (isEdit && currentPackage) {
      const updatedServices = [...currentPackage.services];
      updatedServices[index] = value;
      setCurrentPackage({
        ...currentPackage,
        services: updatedServices
      });
    } else {
      const updatedServices = [...newPackage.services];
      updatedServices[index] = value;
      setNewPackage({
        ...newPackage,
        services: updatedServices
      });
    }
  };

  // Remove service field
  const removeServiceField = (index: number, isEdit: boolean) => {
    if (isEdit && currentPackage) {
      const updatedServices = [...currentPackage.services];
      updatedServices.splice(index, 1);
      setCurrentPackage({
        ...currentPackage,
        services: updatedServices
      });
    } else {
      const updatedServices = [...newPackage.services];
      updatedServices.splice(index, 1);
      setNewPackage({
        ...newPackage,
        services: updatedServices
      });
    }
  };

  return (
    <SuperAdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gym Packages Settings</h1>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
          >
            <span className="text-lg">+</span> Add New Package
          </button>
        </div>

        {/* Packages List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Package Name</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Price (PKR)</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Services</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {packages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-5 whitespace-nowrap text-base font-medium text-gray-900">{pkg.name}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-base text-gray-600">{pkg.price.toLocaleString()}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-base text-gray-600">{pkg.duration}</td>
                    <td className="px-6 py-5 text-base text-gray-600">
                      <ul className="list-disc pl-5 space-y-1">
                        {pkg.services.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium space-x-2">
                      <button 
                        onClick={() => {
                          setCurrentPackage(pkg);
                          setIsEditModalOpen(true);
                        }}
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentPackage(pkg);
                          setIsDeleteModalOpen(true);
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Package Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Package</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Package Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    value={newPackage.name}
                    onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                    placeholder="Enter package name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (PKR)</label>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    value={newPackage.price}
                    onChange={(e) => {
                      const value = Math.max(0, Number(e.target.value));
                      setNewPackage({...newPackage, price: value});
                    }}
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    value={newPackage.duration}
                    onChange={(e) => setNewPackage({...newPackage, duration: e.target.value})}
                  >
                    <option value="1 month">1 Month</option>
                    <option value="3 months">3 Months</option>
                    <option value="6 months">6 Months</option>
                    <option value="12 months">12 Months</option>
                  </select>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Services</label>
                    <button 
                      type="button" 
                      onClick={() => addServiceField(false)}
                      className="text-sm text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1 px-3 py-1 rounded-lg"
                    >
                      <span className="text-base">+</span> Add Service
                    </button>
                  </div>
                  <div className="space-y-3">
                    {newPackage.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input 
                          type="text" 
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                          value={service}
                          onChange={(e) => updateServiceField(index, e.target.value, false)}
                          placeholder="Enter service description"
                        />
                        {newPackage.services.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => removeServiceField(index, false)}
                            className="p-2 text-red-600 hover:text-red-800 bg-white rounded-lg border border-gray-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddPackage}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Add Package
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Package Modal */}
        {isEditModalOpen && currentPackage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Package</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Package Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    value={currentPackage.name}
                    onChange={(e) => setCurrentPackage({...currentPackage, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (PKR)</label>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    value={currentPackage.price}
                    onChange={(e) => {
                      const value = Math.max(0, Number(e.target.value));
                      setCurrentPackage({...currentPackage, price: value});
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    value={currentPackage.duration}
                    onChange={(e) => setCurrentPackage({...currentPackage, duration: e.target.value})}
                  >
                    <option value="1 month">1 Month</option>
                    <option value="3 months">3 Months</option>
                    <option value="6 months">6 Months</option>
                    <option value="12 months">12 Months</option>
                  </select>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Services</label>
                    <button 
                      type="button" 
                      onClick={() => addServiceField(true)}
                      className="text-sm text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1 px-3 py-1 rounded-lg"
                    >
                      <span className="text-base">+</span> Add Service
                    </button>
                  </div>
                  <div className="space-y-3">
                    {currentPackage.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input 
                          type="text" 
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                          value={service}
                          onChange={(e) => updateServiceField(index, e.target.value, true)}
                        />
                        {currentPackage.services.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => removeServiceField(index, true)}
                            className="p-2 text-red-600 hover:text-red-800 bg-white rounded-lg border border-gray-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEditPackage}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && currentPackage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
              <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Delete Package</h2>
                <p className="text-gray-600">Are you sure you want to delete the <span className="font-semibold">"{currentPackage.name}"</span> package? This action cannot be undone.</p>
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeletePackage}
                  className="px-5 py-2.5 bg-red-700 text-white rounded-lg hover:bg-red-800 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SuperAdminLayout>
  );
}
