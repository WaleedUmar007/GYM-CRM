export default function InventorySuppliers() {
  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: '#f3f4f6',
      minHeight: '100vh',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '2rem',
    },
    comingSoon: {
      textAlign: 'center' as const,
      marginTop: '4rem',
    },
    icon: {
      fontSize: '4rem',
      marginBottom: '1rem',
    },
    text: {
      fontSize: '1.2rem',
      color: '#6b7280',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Suppliers</h1>
      <div style={styles.comingSoon}>
        <div style={styles.icon}>🏢</div>
        <p style={styles.text}>Suppliers management features coming soon...</p>
      </div>
    </div>
  );
}


