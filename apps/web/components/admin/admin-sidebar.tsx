"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Add Product",
    href: "/admin/products/new",
    icon: PlusCircle,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r h-screen fixed left-0 top-0 overflow-y-auto z-40">
      <div className="p-6 border-b">
        <Link href="/admin" className="text-2xl font-serif tracking-tight text-gray-900">
          AURA Admin
        </Link>
      </div>
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href || pathname.startsWith(item.href + "/")
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
