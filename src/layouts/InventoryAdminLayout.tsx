import { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthSelector } from '@/appRedux/reducers';

// Chart.js imports
declare global {
  interface Window {
    Chart: any;
  }
}

export default function InventoryAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector(AuthSelector);

  console.log('InventoryAdminLayout: Component rendered');
  console.log('InventoryAdminLayout: Location:', location.pathname);
  console.log('InventoryAdminLayout: User:', user);
  console.log('InventoryAdminLayout: IsAuthenticated:', isAuthenticated);

  // Initialize Chart.js
  useEffect(() => {
    const initChart = () => {
      // Load Chart.js dynamically
      if (!window.Chart) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => createChart();
        document.head.appendChild(script);
      } else {
        createChart();
      }
    };

    const createChart = () => {
      // Revenue Chart
      const revenueCtx = document.getElementById('revenueChart') as HTMLCanvasElement;
      if (revenueCtx) {
        if ((revenueCtx as any).chart) {
          (revenueCtx as any).chart.destroy();
        }

        const revenueData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          datasets: [{
            label: 'Monthly Revenue (PKR)',
            data: [25000, 32000, 28000, 45000, 52000, 38000, 62000, 48000, 45000],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#10b981',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
          }]
        };

        (revenueCtx as any).chart = new window.Chart(revenueCtx, {
          type: 'line',
          data: revenueData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#1f2937',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: '#10b981',
                borderWidth: 1,
                callbacks: {
                  label: function(context: any) {
                    return 'Revenue: PKR ' + context.parsed.y.toLocaleString();
                  }
                }
              }
            },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#6b7280' } },
              y: { 
                grid: { color: '#f3f4f6' }, 
                ticks: { 
                  color: '#6b7280',
                  callback: function(value: any) { return 'PKR ' + (value / 1000) + 'K'; }
                } 
              }
            }
          }
        });
      }

      // Payment Methods Chart (Doughnut)
      const paymentCtx = document.getElementById('paymentChart') as HTMLCanvasElement;
      if (paymentCtx) {
        if ((paymentCtx as any).chart) {
          (paymentCtx as any).chart.destroy();
        }

        const paymentData = {
          labels: ['Card Payments', 'Cash Payments'],
          datasets: [{
            data: [61, 39],
            backgroundColor: ['#3b82f6', '#f59e0b'],
            borderColor: ['#1d4ed8', '#d97706'],
            borderWidth: 2,
            hoverOffset: 4
          }]
        };

        (paymentCtx as any).chart = new window.Chart(paymentCtx, {
          type: 'doughnut',
          data: paymentData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: '#374151',
                  font: { size: 12 },
                  padding: 15
                }
              },
              tooltip: {
                backgroundColor: '#1f2937',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                callbacks: {
                  label: function(context: any) {
                    return context.label + ': ' + context.parsed + '%';
                  }
                }
              }
            }
          }
        });
      }

      // Sales Comparison Chart (Bar)
      const salesCtx = document.getElementById('salesComparisonChart') as HTMLCanvasElement;
      if (salesCtx) {
        if ((salesCtx as any).chart) {
          (salesCtx as any).chart.destroy();
        }

        const salesData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          datasets: [
            {
              label: 'Card Sales (PKR)',
              data: [15000, 19000, 17000, 27000, 32000, 23000, 38000, 29000, 27000],
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              borderColor: '#3b82f6',
              borderWidth: 1
            },
            {
              label: 'Cash Sales (PKR)',
              data: [10000, 13000, 11000, 18000, 20000, 15000, 24000, 19000, 18000],
              backgroundColor: 'rgba(245, 158, 11, 0.8)',
              borderColor: '#f59e0b',
              borderWidth: 1
            }
          ]
        };

        (salesCtx as any).chart = new window.Chart(salesCtx, {
          type: 'bar',
          data: salesData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: '#374151',
                  font: { size: 12 }
                }
              },
              tooltip: {
                backgroundColor: '#1f2937',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                callbacks: {
                  label: function(context: any) {
                    return context.dataset.label + ': PKR ' + context.parsed.y.toLocaleString();
                  }
                }
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: '#6b7280' }
              },
              y: {
                grid: { color: '#f3f4f6' },
                ticks: {
                  color: '#6b7280',
                  callback: function(value: any) {
                    return 'PKR ' + (value / 1000) + 'K';
                  }
                }
              }
            }
          }
        });
      }
    };

    // Delay to ensure DOM is ready
    setTimeout(initChart, 100);

    return () => {
      const revenueCtx = document.getElementById('revenueChart') as HTMLCanvasElement;
      if (revenueCtx && (revenueCtx as any).chart) {
        (revenueCtx as any).chart.destroy();
      }
      
      const paymentCtx = document.getElementById('paymentChart') as HTMLCanvasElement;
      if (paymentCtx && (paymentCtx as any).chart) {
        (paymentCtx as any).chart.destroy();
      }
      
      const salesCtx = document.getElementById('salesComparisonChart') as HTMLCanvasElement;
      if (salesCtx && (salesCtx as any).chart) {
        (salesCtx as any).chart.destroy();
      }
    };
  }, []);

  const handleLogout = () => {
    window.location.href = '/login';
  };

  const navigateTo = (path: string) => {
    navigate(`/inventory-admin${path}`);
  };

  const styles = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#1f2937', // Dark theme to match CRM
      color: 'white',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column' as const,
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      textAlign: 'center' as const,
    },
    nav: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
      flex: 1,
    },
    navItem: {
      padding: '0.75rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      fontSize: '0.875rem',
      fontWeight: '500',
    },
    activeNavItem: {
      backgroundColor: '#374151', // Lighter gray for active state
    },
    navItemHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    userSection: {
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: '1rem',
      marginTop: '1rem',
    },
    userInfo: {
      fontSize: '0.875rem',
      marginBottom: '1rem',
      textAlign: 'center' as const,
    },
    logoutButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#dc2626',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'background-color 0.2s',
      width: '100%',
    },
    main: {
      flex: 1,
      backgroundColor: '#f3f4f6',
    }
  };

  const navigationItems = [
    { path: '', label: '📊 Dashboard', id: 'dashboard' },
    { path: '/add-inventory', label: '➕ Add Inventory', id: 'add-inventory' },
    { path: '/pos', label: '🛒 Point of Sale', id: 'pos' },
  ];

  return (
    <div style={styles.layout}>
      <nav style={styles.sidebar}>
        <div style={styles.logo}>
          📦 Inventory Admin
        </div>
        
        <div style={styles.nav}>
          {navigationItems.map((item) => {
            const isActive = location.pathname === `/inventory-admin${item.path}`;
            return (
              <div
                key={item.id}
                style={{
                  ...styles.navItem,
                  ...(isActive ? styles.activeNavItem : {})
                }}
                onClick={() => navigateTo(item.path)}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>

        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            <div>{user?.first_name} {user?.last_name}</div>
            <div style={{ opacity: 0.7, fontSize: '0.75rem' }}>
              {user?.organization} Admin
            </div>
          </div>
          <button
            style={styles.logoutButton}
            onClick={handleLogout}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
          >
            Logout
          </button>
        </div>
      </nav>
      
      <main style={styles.main}>
        {location.pathname === '/inventory-admin' ? (
          <div style={{ padding: '2rem' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1f2937' }}>
              Welcome to Inventory Management, {user?.first_name}!
            </h1>
          
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontSize: '2.5rem' }}>📦</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937' }}>156</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Items</div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontSize: '2.5rem' }}>💰</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937' }}>PKR 45,000</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Monthly Sales</div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontSize: '2.5rem' }}>⚠️</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937' }}>23</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Low Stock Items</div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontSize: '2.5rem' }}>❌</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937' }}>5</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Out of Stock</div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontSize: '2.5rem' }}>💎</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937' }}>PKR 3,45,000</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Worth of Items</div>
            </div>
            
                      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ fontSize: '2.5rem' }}>🏛️</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937' }}>PKR 2,89,000</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Worth in Stock</div>
          </div>
          </div>

          {/* Sales Analytics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', border: '2px solid #10b981' }}>
              <div style={{ fontSize: '2.5rem' }}>📊</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937' }}>PKR 85,000</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Sales Made</div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.5rem' }}>125 transactions</div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', border: '2px solid #3b82f6' }}>
              <div style={{ fontSize: '2.5rem' }}>💳</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937' }}>PKR 52,000</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Card Payments</div>
              <div style={{ fontSize: '0.75rem', color: '#3b82f6', marginTop: '0.5rem' }}>78 transactions (61%)</div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', border: '2px solid #f59e0b' }}>
              <div style={{ fontSize: '2.5rem' }}>💵</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937' }}>PKR 33,000</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Cash Payments</div>
              <div style={{ fontSize: '0.75rem', color: '#f59e0b', marginTop: '0.5rem' }}>47 transactions (39%)</div>
            </div>
          </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              {/* Revenue Trend Chart */}
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  📈 Monthly Revenue Trend
                </h2>
                <div style={{ width: '100%', height: '300px', position: 'relative' }}>
                  <canvas 
                    id="revenueChart" 
                    style={{ width: '100%', height: '100%' }}
                  ></canvas>
                </div>
              </div>

              {/* Payment Methods Chart */}
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  💳 Payment Methods Distribution
                </h2>
                <div style={{ width: '100%', height: '300px', position: 'relative' }}>
                  <canvas 
                    id="paymentChart" 
                    style={{ width: '100%', height: '100%' }}
                  ></canvas>
                </div>
              </div>
            </div>

            {/* Sales Comparison Chart */}
            <div style={{ marginTop: '2rem' }}>
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  💰 Sales by Payment Method (Monthly)
                </h2>
                <div style={{ width: '100%', height: '400px', position: 'relative' }}>
                  <canvas 
                    id="salesComparisonChart" 
                    style={{ width: '100%', height: '100%' }}
                  ></canvas>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
