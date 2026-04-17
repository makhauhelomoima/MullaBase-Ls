export default function Privacy() {
  return (
    <div style={{backgroundColor: '#fffbeb', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <header style={{padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '900px', margin: '0 auto'}}>
        <a href="/" style={{color: '#9a3412', fontWeight: '800', fontSize: '22px', textDecoration: 'none'}}>
          Mulla<span style={{color: '#ea580c'}}>Base</span>
        </a>
        <a href="/" style={{fontSize: '14px', color: '#c2410c', textDecoration: 'none', fontWeight: '600'}}>← Back Home</a>
      </header>

      <section style={{padding: '40px 24px', maxWidth: '900px', margin: '0 auto'}}>
        <h1 style={{fontSize: '32px', fontWeight: '900', color: '#7c2d12', marginBottom: '8px'}}>Privacy Policy</h1>
        <p style={{fontSize: '14px', color: '#9a3412', marginBottom: '32px'}}>Last updated: April 17, 2026</p>

        <div style={{backgroundColor: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #fed7aa', lineHeight: '1.7', color: '#7c2d12', fontSize: '15px'}}>
          
          <h2 style={{fontSize: '20px', fontWeight: '800', marginTop: '0', marginBottom: '12px'}}>1. What We Collect</h2>
          <p>To run MullaBase, we collect:</p>
          <ul style={{paddingLeft: '20px', margin: '12px 0'}}>
            <li><strong>Account info:</strong> Email, phone number, country, password</li>
            <li><strong>Payout info:</strong> M-Pesa number or bank details for redemptions only</li>
            <li><strong>Activity data:</strong> Votes, clicks, purchases via partner links to credit points</li>
            <li
