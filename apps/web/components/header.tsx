"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ShoppingBag, Heart, User, Menu } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, usePathname } from "next/navigation"
import { MegaMenu, SearchBar, MobileDrawer } from "../../../packages/ui/src"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // You can add your email here to bypass the database role check
        const ADMIN_EMAILS = ["admin@example.com", "deepalinges06@gmail.com"]
        
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single()
        
        setIsAdmin(profile?.role === "admin" || (!!user.email && ADMIN_EMAILS.includes(user.email)))

        const { count: cartCount } = await supabase
          .from("cart_items")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
        setCartCount(cartCount || 0)

        const { count: wishlistCount } = await supabase
          .from("wishlist")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
        setWishlistCount(wishlistCount || 0)
      }
    }

    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user) {
        setCartCount(0)
        setWishlistCount(0)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (pathname?.startsWith("/admin")) return null

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${
        isScrolled ? "bg-white/80 border-gray-200" : "bg-white/70 border-transparent"
      }`}
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center h-16 lg:h-20 gap-6">
          <button
            className="lg:hidden p-2 -ml-2 text-gray-700"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="text-2xl lg:text-3xl font-serif tracking-tight text-gray-900">
            AURA
          </Link>

          <nav className="hidden lg:flex flex-1 items-center justify-center">
            <MegaMenu />
          </nav>

          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden md:block w-[520px]">
              <SearchBar />
            </div>

            <Link href="/wishlist" className="relative p-2 text-gray-700 hover:text-gray-900" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-[10px] bg-indigo-600 text-white rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-gray-900" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-[10px] bg-indigo-600 text-white rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">Orders</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Sign in">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </motion.header>
  )
}
