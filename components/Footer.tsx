export default function Footer() {
  return (
    <footer className="bg-black text-white" style={{ padding: '1rem', borderTop: '1px solid #eee', marginTop: '2rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>© {new Date().getFullYear()} Hindustanpost</div>
        <div className="flex gap-4 ">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/disclaimer">Disclaimer</a>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}
