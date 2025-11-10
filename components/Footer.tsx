export default function Footer() {
  return (
    <footer className="bg-black text-white" style={{ padding: '1rem', borderTop: '1px solid #eee', marginTop: '2rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>© {new Date().getFullYear()} Hindustanpost</div>
        <div className="flex gap-4 ">
          <a href="/about" className="text-white hover:text-gray-300 font-normal text-[13px]">About</a>
          <a href="/contact" className="text-white hover:text-gray-300 font-normal text-[13px]">Contact</a>
          <a href="/disclaimer" className="text-white hover:text-gray-300 font-normal text-[13px]">Disclaimer</a>
          <a href="/terms" className="text-white hover:text-gray-300 font-normal text-[13px]">Terms of Service</a>
          <a href="/privacy" className="text-white hover:text-gray-300 font-normal text-[13px]">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}
