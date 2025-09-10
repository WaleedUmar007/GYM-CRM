import React, { useState, useEffect, useRef } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  vendor: string;
  image: string;
}

interface CartItem extends Product {
  cartQuantity: number;
}

interface Sale {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card';
  receiptNumber: string;
}

export default function InventoryPoS() {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Protein Shake',
      price: 800,
      quantity: 50,
      vendor: 'SupplementCorp',
      image: '/api/placeholder/50/50'
    },
    {
      id: '2', 
      name: 'Energy Bar',
      price: 250,
      quantity: 100,
      vendor: 'NutriSnacks',
      image: '/api/placeholder/50/50'
    },
    {
      id: '3',
      name: 'Protein Powder',
      price: 3500,
      quantity: 25,
      vendor: 'SupplementCorp',
      image: '/api/placeholder/50/50'
    },
    {
      id: '4',
      name: 'Pre-Workout',
      price: 2200,
      quantity: 30,
      vendor: 'FitnessBoost',
      image: '/api/placeholder/50/50'
    }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [sales, setSales] = useState<Sale[]>([]);
  const [showReceipt, setShowReceipt] = useState<Sale | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const receiptRef = useRef<HTMLDivElement>(null);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.cartQuantity < product.quantity) {
        setCart(cart.map(item => 
          item.id === product.id 
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        ));
      }
    } else {
      setCart([...cart, { ...product, cartQuantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, cartQuantity: quantity }
        : item
    ));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);
  const total = subtotal - discount;

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completeSale = () => {
    if (cart.length === 0) return;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const sale: Sale = {
      id: Date.now().toString(),
      date: `${formattedDate}, ${formattedTime}`,
      items: [...cart],
      subtotal,
      discount,
      total,
      paymentMethod,
      receiptNumber: `RCP-${Date.now().toString().slice(-6)}`
    };

    setSales([...sales, sale]);
    setShowReceipt(sale);
    setCart([]);
    setDiscount(0);
  };

  const printReceipt = () => {
    if (receiptRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Receipt</title>
              <style>
                body { 
                  font-family: monospace; 
                  margin: 20px; 
                  color: #000000 !important;
                  background-color: #ffffff;
                }
                .receipt { 
                  max-width: 300px; 
                  margin: 0 auto; 
                  color: #000000 !important;
                }
                .header { 
                  text-align: center; 
                  border-bottom: 2px solid #000; 
                  padding-bottom: 10px; 
                  margin-bottom: 10px; 
                  color: #000000 !important;
                }
                .item { 
                  display: flex; 
                  justify-content: space-between; 
                  margin: 5px 0; 
                  color: #000000 !important;
                }
                .total { 
                  border-top: 2px solid #000; 
                  padding-top: 10px; 
                  margin-top: 10px; 
                  font-weight: bold; 
                  color: #000000 !important;
                }
                .footer { 
                  text-align: center; 
                  margin-top: 20px; 
                  font-size: 12px; 
                  color: #000000 !important;
                }
                * {
                  color: #000000 !important;
                  background-color: transparent !important;
                }
              </style>
            </head>
            <body>
              ${receiptRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: '#f3f4f6',
      minHeight: '100vh'
    },
    header: {
      marginBottom: '2rem'
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1rem'
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '2rem'
    },
    productsSection: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    sectionTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1rem'
    },
    searchContainer: {
      marginBottom: '1.5rem'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '1rem',
      color: '#111827',
      backgroundColor: '#ffffff',
      transition: 'border-color 0.2s ease',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1rem'
    },
    productCard: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: '#fafafa'
    },
    productImage: {
      width: '60px',
      height: '60px',
      borderRadius: '8px',
      objectFit: 'cover' as const,
      marginBottom: '0.5rem'
    },
    productName: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    productPrice: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#10b981',
      marginBottom: '0.25rem'
    },
    productStock: {
      fontSize: '0.75rem',
      color: '#6b7280'
    },
    cartSection: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      height: 'fit-content'
    },
    cartItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 0',
      borderBottom: '1px solid #f3f4f6'
    },
    cartItemInfo: {
      flex: 1
    },
    cartItemName: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#111827'
    },
    cartItemPrice: {
      fontSize: '0.75rem',
      color: '#374151'
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      margin: '0 1rem'
    },
    quantityButton: {
      width: '32px',
      height: '32px',
      borderRadius: '6px',
      border: '2px solid #d1d5db',
      backgroundColor: '#f9fafb',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#374151',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    quantityDisplay: {
      fontSize: '0.875rem',
      fontWeight: '500',
      minWidth: '20px',
      textAlign: 'center' as const
    },
    removeButton: {
      width: '36px',
      height: '36px',
      borderRadius: '6px',
      border: '2px solid #ef4444',
      backgroundColor: '#fef2f2',
      color: '#ef4444',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    summarySection: {
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '2px solid #f3f4f6'
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0.5rem 0',
      fontSize: '1rem',
      color: '#111827'
    },
    discountSection: {
      margin: '1rem 0'
    },
    discountInput: {
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      marginTop: '0.5rem',
      fontSize: '1rem',
      color: '#111827',
      backgroundColor: '#ffffff'
    },
    paymentSection: {
      margin: '1rem 0'
    },
    paymentOptions: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '0.5rem'
    },
    paymentButton: {
      flex: 1,
      padding: '0.75rem',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      backgroundColor: '#f9fafb',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#374151',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    paymentButtonActive: {
      backgroundColor: '#10b981',
      color: 'white',
      borderColor: '#10b981',
      boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
    },
    checkoutButton: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#10b981',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '1rem'
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
    receiptModal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      maxWidth: '400px',
      width: '90%',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    receiptHeader: {
      textAlign: 'center' as const,
      borderBottom: '2px solid #000',
      paddingBottom: '10px',
      marginBottom: '15px'
    },
    receiptTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: '0',
      color: '#000000'
    },
    receiptSubtitle: {
      fontSize: '0.875rem',
      color: '#000000',
      margin: '5px 0'
    },
    receiptItem: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '8px 0',
      fontSize: '0.875rem',
      color: '#000000'
    },
    receiptTotal: {
      borderTop: '2px solid #000',
      paddingTop: '10px',
      marginTop: '15px',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#000000'
    },
    receiptButtons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1.5rem'
    },
    printButton: {
      flex: 1,
      padding: '0.75rem',
      backgroundColor: '#10b981',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    },
    closeButton: {
      flex: 1,
      padding: '0.75rem',
      backgroundColor: '#6b7280',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🛒 Point of Sale System</h1>
        <p style={styles.subtitle}>Select products and complete customer transactions</p>
      </div>

      <div style={styles.mainContent}>
        {/* Products Section */}
        <div style={styles.productsSection}>
          <h2 style={styles.sectionTitle}>Available Products</h2>
          
          {/* Search Input */}
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="🔍 Search products by name or vendor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => e.currentTarget.style.borderColor = '#10b981'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              color: '#6b7280', 
              padding: '3rem',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '2px dashed #d1d5db'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                No products found
              </div>
              <div style={{ fontSize: '0.875rem' }}>
                Try searching with different keywords
              </div>
            </div>
          ) : (
            <div style={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  style={styles.productCard}
                  onClick={() => addToCart(product)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f9ff';
                    e.currentTarget.style.borderColor = '#10b981';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#fafafa';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <img src={product.image} alt={product.name} style={styles.productImage} />
                  <div style={styles.productName}>{product.name}</div>
                  <div style={styles.productPrice}>PKR {product.price}</div>
                  <div style={styles.productStock}>Stock: {product.quantity}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Section */}
        <div style={styles.cartSection}>
          <h2 style={styles.sectionTitle}>Shopping Cart</h2>
          
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
              Cart is empty. Click on products to add them.
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <div style={styles.cartItemInfo}>
                    <div style={styles.cartItemName}>{item.name}</div>
                    <div style={styles.cartItemPrice}>PKR {item.price} each</div>
                  </div>
                  
                  <div style={styles.quantityControls}>
                    <button
                      style={styles.quantityButton}
                      onClick={() => updateCartQuantity(item.id, item.cartQuantity - 1)}
                      title="Decrease quantity by 1"
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#ef4444';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = '#ef4444';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                        e.currentTarget.style.color = '#374151';
                        e.currentTarget.style.borderColor = '#d1d5db';
                      }}
                    >
                      ➖
                    </button>
                    <div style={{ 
                      ...styles.quantityDisplay, 
                      fontSize: '1rem', 
                      fontWeight: 'bold', 
                      padding: '0 0.75rem',
                      backgroundColor: '#f0f9ff',
                      border: '2px solid #10b981',
                      borderRadius: '6px',
                      minWidth: '40px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#065f46'
                    }}>
                      {item.cartQuantity}
                    </div>
                    <button
                      style={{
                        ...styles.quantityButton,
                        opacity: item.cartQuantity >= item.quantity ? 0.5 : 1,
                        cursor: item.cartQuantity >= item.quantity ? 'not-allowed' : 'pointer'
                      }}
                      onClick={() => updateCartQuantity(item.id, item.cartQuantity + 1)}
                      disabled={item.cartQuantity >= item.quantity}
                      title={item.cartQuantity >= item.quantity ? "No more stock available" : "Increase quantity by 1"}
                      onMouseOver={(e) => {
                        if (item.cartQuantity < item.quantity) {
                          e.currentTarget.style.backgroundColor = '#10b981';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.borderColor = '#10b981';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (item.cartQuantity < item.quantity) {
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                          e.currentTarget.style.color = '#374151';
                          e.currentTarget.style.borderColor = '#d1d5db';
                        }
                      }}
                    >
                      ➕
                    </button>
                  </div>
                  
                  <button
                    style={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                    title="Remove this item from cart completely"
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#ef4444';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#fef2f2';
                      e.currentTarget.style.color = '#ef4444';
                    }}
                  >
                    🗑️
                  </button>
                </div>
              ))}

              <div style={styles.summarySection}>
                <div style={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span>PKR {subtotal}</span>
                </div>

                <div style={styles.discountSection}>
                  <label style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '0.5rem' }}>
                    💸 Discount Amount (PKR):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={subtotal}
                    value={discount}
                    onChange={(e) => setDiscount(Math.min(parseFloat(e.target.value) || 0, subtotal))}
                    style={styles.discountInput}
                    placeholder="Enter discount amount"
                  />
                </div>

                <div style={styles.paymentSection}>
                  <label style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '0.5rem' }}>
                    💳 Payment Method:
                  </label>
                  <div style={styles.paymentOptions}>
                    <button
                      style={{
                        ...styles.paymentButton,
                        ...(paymentMethod === 'cash' ? styles.paymentButtonActive : {})
                      }}
                      onClick={() => setPaymentMethod('cash')}
                    >
                      <span style={{ fontSize: '1.2rem' }}>💵</span>
                      <span>CASH</span>
                    </button>
                    <button
                      style={{
                        ...styles.paymentButton,
                        ...(paymentMethod === 'card' ? styles.paymentButtonActive : {})
                      }}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <span style={{ fontSize: '1.2rem' }}>💳</span>
                      <span>CARD</span>
                    </button>
                  </div>
                </div>

                <div style={styles.summaryRow}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Total:</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>PKR {total}</span>
                </div>

                <button
                  style={{
                    ...styles.checkoutButton,
                    opacity: cart.length === 0 ? 0.5 : 1,
                    cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
                  }}
                  onClick={completeSale}
                  disabled={cart.length === 0}
                >
                  Complete Sale
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <div style={styles.modal}>
          <div style={styles.receiptModal}>
            <div ref={receiptRef}>
              <div style={styles.receiptHeader}>
                <h2 style={styles.receiptTitle}>Revive Fitness GYM</h2>
                <p style={styles.receiptSubtitle}>Receipt #{showReceipt.receiptNumber}</p>
                <p style={styles.receiptSubtitle}>{showReceipt.date}</p>
                <p style={styles.receiptSubtitle}>Payment: {showReceipt.paymentMethod.toUpperCase()}</p>
              </div>

              {showReceipt.items.map((item) => (
                <div key={item.id} style={styles.receiptItem}>
                  <span>{item.name} x {item.cartQuantity}</span>
                  <span>PKR {item.price * item.cartQuantity}</span>
                </div>
              ))}

              <div style={styles.receiptTotal}>
                <div style={styles.receiptItem}>
                  <span>Subtotal:</span>
                  <span>PKR {showReceipt.subtotal}</span>
                </div>
                {showReceipt.discount > 0 && (
                  <div style={styles.receiptItem}>
                    <span>Discount:</span>
                    <span>-PKR {showReceipt.discount}</span>
                  </div>
                )}
                <div style={{ ...styles.receiptItem, fontSize: '1.1rem', fontWeight: 'bold' }}>
                  <span>Total:</span>
                  <span>PKR {showReceipt.total}</span>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.75rem', color: '#000000' }}>
                <p style={{ margin: '5px 0', color: '#000000' }}>Thank you for your business!</p>
                <p style={{ margin: '5px 0', color: '#000000' }}>Visit us again soon!</p>
              </div>
            </div>

            <div style={styles.receiptButtons}>
              <button style={styles.printButton} onClick={printReceipt}>
                🖨️ Print Receipt
              </button>
              <button style={styles.closeButton} onClick={() => setShowReceipt(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
