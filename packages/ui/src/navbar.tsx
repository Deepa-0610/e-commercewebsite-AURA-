"use client"

import Link from 'next/link'
import { MegaMenu } from './mega-menu'
import { SearchBar } from './search-bar'
import { ShoppingBag, Heart, User, Menu } from 'lucide-react'

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md border-b bg-white/70 border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-6 h-16 lg:h-20">
          <div className="flex items-center gap-4">
            <button aria-label="Open menu" className="lg:hidden p-2 text-gray-700">
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="text-2xl lg:text-3xl font-serif tracking-tight text-gray-900">
              AURA
            </Link>
          </div>

          <nav className="hidden lg:flex flex-1 items-center justify-center">
            <MegaMenu />
          </nav>

          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden md:block w-[520px]">
              <SearchBar />
            </div>

            <Link href="/wishlist" aria-label="Wishlist" className="p-2 text-gray-700 hover:text-gray-900">
              <Heart className="w-5 h-5" />
            </Link>

            <Link href="/cart" aria-label="Cart" className="p-2 text-gray-700 hover:text-gray-900">
              <ShoppingBag className="w-5 h-5" />
            </Link>

            <Link href="/account" aria-label="Account" className="p-2 text-gray-700 hover:text-gray-900 hidden sm:inline-flex">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
