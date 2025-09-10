import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  vendor: string;
  image: string;
  dateAdded: string;
}

export default function InventoryAddInventory() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Protein Powder',
      price: 3500,
      quantity: 50,
      vendor: 'SupplementCorp',
      image: '/api/placeholder/50/50',
      dateAdded: '01/15/2025'
    },
    {
      id: '2', 
      name: 'Dumbbells (10kg)',
      price: 2800,
      quantity: 25,
      vendor: 'FitnessGear Ltd',
      image: '/api/placeholder/50/50',
      dateAdded: '01/10/2025'
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    vendor: '',
    image: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });

    if (editingProduct) {
      // Update existing product
      const updatedProduct: Product = {
        ...editingProduct,
        name: formData.name,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        vendor: formData.vendor,
        image: formData.image || editingProduct.image
      };

      setProducts(prev => prev.map(product => 
        product.id === editingProduct.id ? updatedProduct : product
      ));
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        vendor: formData.vendor,
        image: formData.image || '/api/placeholder/50/50',
        dateAdded: currentDate
      };

      setProducts(prev => [...prev, newProduct]);
    }

    // Reset form
    setFormData({
      name: '',
      price: '',
      quantity: '',
      vendor: '',
      image: ''
    });
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      vendor: product.vendor,
      image: product.image
    });
    setIsModalOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(product => product.id !== productId));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      quantity: '',
      vendor: '',
      image: ''
    });
  };

  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: '#f3f4f6',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#1f2937'
    },
    addButton: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    tableContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const
    },
    tableHeader: {
      backgroundColor: '#f9fafb',
      borderBottom: '1px solid #e5e7eb'
    },
    th: {
      padding: '1rem',
      textAlign: 'left' as const,
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em'
    },
    td: {
      padding: '1rem',
      borderBottom: '1px solid #f3f4f6',
      color: '#1f2937'
    },
    productImage: {
      width: '50px',
      height: '50px',
      borderRadius: '8px',
      objectFit: 'cover' as const
    },
    modal: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1f2937'
    },
    closeButton: {
      backgroundColor: '#f3f4f6',
      border: 'none',
      borderRadius: '8px',
      width: '36px',
      height: '36px',
      cursor: 'pointer',
      fontSize: '1.4rem',
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      fontWeight: 'bold'
    },
    formGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '1rem',
      color: '#1f2937',
      backgroundColor: 'white'
    },
    submitButton: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      width: '100%',
      marginTop: '1rem'
    },
    cancelButton: {
      backgroundColor: '#6b7280',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      width: '100%',
      marginTop: '0.5rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📦 Inventory Management</h1>
        <button 
          style={styles.addButton}
          onClick={() => setIsModalOpen(true)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
        >
          + Add Product
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Product Name</th>
              <th style={styles.th}>Price (PKR)</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Vendor</th>
              <th style={styles.th}>Date Added</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={styles.td}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={styles.productImage}
                  />
                </td>
                <td style={styles.td}>{product.name}</td>
                <td style={styles.td}>PKR {product.price.toLocaleString()}</td>
                <td style={styles.td}>{product.quantity}</td>
                <td style={styles.td}>{product.vendor}</td>
                <td style={styles.td}>{product.dateAdded}</td>
                <td style={styles.td}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleEdit(product)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                      title="Edit this product"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                      title="Delete this product"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button 
                style={styles.closeButton}
                onClick={handleCloseModal}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                  e.currentTarget.style.color = '#374151';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Price (PKR)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter quantity"
                  min="0"
                  step="1"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Vendor Name</label>
                <input
                  type="text"
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter vendor name"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={styles.input}
                />
              </div>

              <button type="submit" style={styles.submitButton}>
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button 
                type="button" 
                style={styles.cancelButton}
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
