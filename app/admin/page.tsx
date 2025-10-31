import { redirect } from 'next/navigation'

export default function AdminIndex() {
  // Redirect /admin -> /admin/login for the demo admin panel
  redirect('/admin/login')
}
