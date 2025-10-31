import Link from 'next/link'

export default function AdminLogin() {
  return (
    <section>
      <h2>Admin login (demo)</h2>
      <p>This demo has a simple link to the dashboard. Implement real auth (NextAuth) for production.</p>
      <Link href="/admin/dashboard">Go to dashboard</Link>
    </section>
  )
}
