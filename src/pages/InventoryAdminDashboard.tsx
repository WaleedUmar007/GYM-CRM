import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AuthSelector } from '@/appRedux/reducers';

export default function InventoryAdminDashboard() {
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('localUser');
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser));
    }
  }, []);

  console.log('InventoryAdminDashboard: Component rendered');
  console.log('InventoryAdminDashboard: Local User:', localUser);

  // Mock data for inventory items
  const lowStockItems = [
    { id: 1, name: "Protein Powder - Whey", currentStock: 8, minStock: 15 },
    { id: 2, name: "Resistance Bands Set", currentStock: 5, minStock: 12 },
    { id: 3, name: "Yoga Mats - Premium", currentStock: 3, minStock: 10 },
    { id: 4, name: "Pre-Workout Supplements", currentStock: 7, minStock: 20 },
    { id: 5, name: "Water Bottles - 1L", currentStock: 12, minStock: 25 },
  ];

  const outOfStockItems = [
    { id: 1, name: "Dumbbells - 15kg", currentStock: 0, lastOrdered: "2024-12-20" },
    { id: 2, name: "Gym Towels", currentStock: 0, lastOrdered: "2024-12-18" },
    { id: 3, name: "Energy Bars - Mixed", currentStock: 0, lastOrdered: "2024-12-25" },
    { id: 4, name: "Lifting Straps", currentStock: 0, lastOrdered: "2024-12-22" },
    { id: 5, name: "Shaker Bottles", currentStock: 0, lastOrdered: "2024-12-15" },
  ];

  const inventoryStats = [
    {
      label: "Total Items",
      value: 156,
      change: "+8%",
      icon: "📦",
      color: "text-green-600",
      clickable: false,
    },
    {
      label: "Monthly Sales",
      value: "₹45,000",
      change: "+12%",
      icon: "💰",
      color: "text-green-600",
      clickable: false,
    },
    {
      label: "Low Stock Items",
      value: 23,
      change: "+3%",
      icon: "⚠️",
      color: "text-yellow-600",
      clickable: true,
      onClick: () => setShowLowStockModal(true),
    },
    {
      label: "Out of Stock",
      value: 5,
      change: "-1%",
      icon: "❌",
      color: "text-red-600",
      clickable: true,
      onClick: () => setShowOutOfStockModal(true),
    },
    {
      label: "Total Worth of Items",
      value: "₹3,45,000",
      change: "+6%",
      icon: "💎",
      color: "text-blue-600",
      clickable: false,
    },
    {
      label: "Total Worth in Stock",
      value: "₹2,89,000",
      change: "+4%",
      icon: "🏛️",
      color: "text-purple-600",
      clickable: false,
    },
  ];

  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: '#f3f4f6',
      minHeight: '100vh',
    },
    welcome: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      color: '#1f2937',
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem',
    },
    statCard: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      transition: 'all 0.2s',
    },
    clickableCard: {
      cursor: 'pointer',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      }
    },
    statIcon: {
      fontSize: '2.5rem',
    },
    statContent: {
      flex: 1,
    },
    statNumber: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem',
    },
    statLabel: {
      color: '#6b7280',
      fontSize: '0.875rem',
    },
    statChange: {
      fontSize: '0.875rem',
      fontWeight: '600',
    },
    quickActions: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    sectionTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#1f2937',
    },
    actionButtons: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap' as const,
    },
    actionButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#059669',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'background-color 0.2s',
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', fontSize: '20px', marginBottom: '20px' }}>
        🚨 INVENTORY ADMIN DASHBOARD - THIS IS THE CORRECT COMPONENT 🚨
      </div>
      <h1 style={styles.welcome}>
        Welcome to Inventory Management, {localUser?.first_name}!
      </h1>
      
      <div style={styles.stats}>
        {inventoryStats.map((stat, index) => (
          <div 
            key={index} 
            style={{
              ...styles.statCard,
              ...(stat.clickable ? { cursor: 'pointer' } : {}),
            }}
            onClick={stat.onClick || (() => {})}
            onMouseEnter={(e) => {
              if (stat.clickable) {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (stat.clickable) {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            <div style={styles.statIcon}>{stat.icon}</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
            <div 
              style={{
                ...styles.statChange,
                color: stat.change.startsWith('+') ? '#059669' : '#dc2626'
              }}
            >
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.quickActions}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.actionButtons}>
          <button 
            style={styles.actionButton}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#047857'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#059669'}
          >
            Add New Item
          </button>
          <button 
            style={styles.actionButton}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#047857'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#059669'}
          >
            Update Stock
          </button>
          <button 
            style={styles.actionButton}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#047857'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#059669'}
          >
            Generate Report
          </button>
          <button 
            style={styles.actionButton}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#047857'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#059669'}
          >
            View Low Stock
          </button>
        </div>
      </div>

      {/* Low Stock Modal */}
      {showLowStockModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            width: '100%',
            maxWidth: '32rem',
            maxHeight: '24rem',
            overflowY: 'auto',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
              }}>Low Stock Items</h3>
              <button
                onClick={() => setShowLowStockModal(false)}
                style={{
                  color: '#6b7280',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                }}
              >
                ×
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {lowStockItems.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  backgroundColor: '#fef3c7',
                  borderRadius: '8px',
                  border: '1px solid #fcd34d',
                }}>
                  <div>
                    <p style={{ fontWeight: '500', color: '#1f2937' }}>{item.name}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Minimum required: {item.minStock}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#d97706' }}>
                      {item.currentStock}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>in stock</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowLowStockModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Out of Stock Modal */}
      {showOutOfStockModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            width: '100%',
            maxWidth: '32rem',
            maxHeight: '24rem',
            overflowY: 'auto',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
              }}>Out of Stock Items</h3>
              <button
                onClick={() => setShowOutOfStockModal(false)}
                style={{
                  color: '#6b7280',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                }}
              >
                ×
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {outOfStockItems.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  backgroundColor: '#fee2e2',
                  borderRadius: '8px',
                  border: '1px solid #fca5a5',
                }}>
                  <div>
                    <p style={{ fontWeight: '500', color: '#1f2937' }}>{item.name}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Last ordered: {item.lastOrdered}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#dc2626' }}>
                      0
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>in stock</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowOutOfStockModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
