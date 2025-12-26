"use client"

import Link from 'next/link'
import { useState } from 'react'

const sections = [
  {
    title: 'Skincare',
    items: ['Cleansers', 'Serums', 'Moisturizers', 'Masks', 'Eye Care', 'Oils'],
  },
  {
    title: 'Makeup',
    items: ['Foundation', 'Eyeliner', 'Mascara', 'Lip Balm', 'Compact Powder', 'Concealer', 'Highlighter'],
  },
  {
    title: 'Haircare',
    items: ['Shampoo', 'Conditioner', 'Treatments'],
  },
]

export function MegaMenu() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <button
          onMouseEnter={() => setOpen('categories')}
          onMouseLeave={() => setOpen(null)}
          onFocus={() => setOpen('categories')}
          onBlur={() => setOpen(null)}
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
          aria-haspopup="menu"
          aria-expanded={open === 'categories'}
        >
          Categories
        </button>

        {open === 'categories' && (
          <div
            onMouseEnter={() => setOpen('categories')}
            onMouseLeave={() => setOpen(null)}
            onFocus={() => setOpen('categories')}
            onBlur={() => setOpen(null)}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[800px] bg-white border rounded-md shadow-lg p-6 z-50"
            role="menu"
          >
            <div className="space-y-8">
              {sections.map((s) => (
                <div key={s.title} className="flex items-start gap-8 border-b pb-6 last:border-0 last:pb-0">
                  <h4 className="text-base font-semibold text-gray-900 w-32 shrink-0">{s.title}</h4>
                  <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {s.items.map((item) => (
                      <li key={item}>
                        <Link 
                          href={`/category/${item.toLowerCase().replace(/ /g, '-')}`} 
                          className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Link href="/gifts" className="text-sm font-medium text-gray-700 hover:text-gray-900">
        Gifts
      </Link>

      <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-gray-900">
        All Products
      </Link>
    </div>
  )
}
