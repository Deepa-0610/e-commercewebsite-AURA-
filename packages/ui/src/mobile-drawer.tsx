"use client"

import Link from 'next/link'
import { X } from 'lucide-react'
import { useEffect } from 'react'

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <aside className="absolute left-0 top-0 h-full w-80 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between ">
          <div className="text-xl font-serif">AURA</div>
          <button onClick={onClose} aria-label="Close menu" className="p-2">
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <nav className="space-y-4">
          <Link href="/products" onClick={onClose} className="block text-sm text-gray-700">All Products</Link>
          <Link href="/gifts" onClick={onClose} className="block text-sm text-gray-700">Gifts</Link>
          <Link href="/category/skincare" onClick={onClose} className="block text-sm text-gray-700">Skincare</Link>
          <Link href="/category/makeup" onClick={onClose} className="block text-sm text-gray-700">Makeup</Link>
          <Link href="/brand/aura" onClick={onClose} className="block text-sm text-gray-700">Brands</Link>
        </nav>

      </aside>
    </div>
  )
}
