import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // You can add your email here to bypass the database role check
  const ADMIN_EMAILS = ["admin@example.com", "deepalinges06@gmail.com"] 
  const isEmailAuthorized = user.email && ADMIN_EMAILS.includes(user.email)

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if ((!profile || profile.role !== "admin") && !isEmailAuthorized) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminSidebar />
      <div className="pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
