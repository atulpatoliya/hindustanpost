export default function Footer() {
  return (
    <footer style={{ padding: '1rem', borderTop: '1px solid #eee', marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>© {new Date().getFullYear()} Hindustanpost</div>
        <div>
          <a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/advertise">Advertise</a>
        </div>
      </div>
    </footer>
  )
}
