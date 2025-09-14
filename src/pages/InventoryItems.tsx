import { useState } from 'react';

export default function InventoryItems() {
  const [items] = useState([
    { id: 1, name: 'Protein Powder - Whey', category: 'Supplements', stock: 45, price: 2500, status: 'In Stock' },
    { id: 2, name: 'Resistance Bands Set', category: 'Equipment', stock: 12, price: 1200, status: 'Low Stock' },
    { id: 3, name: 'Yoga Mats - Premium', category: 'Equipment', stock: 8, price: 3500, status: 'Low Stock' },
    { id: 4, name: 'Pre-Workout Supplements', category: 'Supplements', stock: 0, price: 1800, status: 'Out of Stock' },
    { id: 5, name: 'Water Bottles - 1L', category: 'Accessories', stock: 25, price: 500, status: 'In Stock' },
  ]);

  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: '#f3f4f6',
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#1f2937',
    },
    addButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#059669',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
    },
    table: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    },
    th: {
      padding: '1rem',
      backgroundColor: '#f9fafb',
      textAlign: 'left' as const,
      fontWeight: '600',
      color: '#374151',
      borderBottom: '1px solid #e5e7eb',
    },
    td: {
      padding: '1rem',
      borderBottom: '1px solid #e5e7eb',
      color: '#1f2937',
    },
    statusBadge: (status: string) => ({
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500',
      backgroundColor: 
        status === 'In Stock' ? '#dcfce7' :
        status === 'Low Stock' ? '#fef3c7' : '#fee2e2',
      color: 
        status === 'In Stock' ? '#166534' :
        status === 'Low Stock' ? '#92400e' : '#991b1b',
    }),
    actionButton: {
      padding: '0.5rem 1rem',
      marginRight: '0.5rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.75rem',
      fontWeight: '500',
    },
    editButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Inventory Items</h1>
        <button style={styles.addButton}>Add New Item</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Item Name</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Stock</th>
            <th style={styles.th}>Price (PKR)</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.category}</td>
              <td style={styles.td}>{item.stock}</td>
              <td style={styles.td}>₹{item.price.toLocaleString()}</td>
              <td style={styles.td}>
                <span style={styles.statusBadge(item.status)}>
                  {item.status}
                </span>
              </td>
              <td style={styles.td}>
                <button style={{...styles.actionButton, ...styles.editButton}}>
                  Edit
                </button>
                <button style={{...styles.actionButton, ...styles.deleteButton}}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


