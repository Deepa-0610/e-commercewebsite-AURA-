"use client"

import { useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function SearchBar() {
  const [q, setQ] = useState('')
  const router = useRouter()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const encoded = encodeURIComponent(q.trim())
    if (encoded) router.push(`/products?search=${encoded}`)
  }

  return (
    <form onSubmit={onSubmit} role="search" className="flex items-center">
      <label htmlFor="site-search" className="sr-only">Search products</label>
      <div className="flex items-center w-full rounded-md border bg-white/70 border-gray-200 px-3 py-2">
        <Search className="w-4 h-4 text-gray-500 mr-3" />
        <input
          id="site-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search skincare, makeup, brands, e.g. 'hydrating serum'"
          className="w-full text-sm bg-transparent placeholder-gray-400 outline-none"
        />
      </div>
    </form>
  )
}
