import { Footer } from '@/components/footer'

export default function AURAPage() {
  return (
    <main className="min-h-screen bg-background">
      
      {/* Hero Section with Gradient */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 opacity-80" />

        <div className="relative container mx-auto px-4 lg:px-8 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-6">
            Careers at AURA
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Join a growing beauty and lifestyle brand where creativity, passion,
            and innovation come together.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* Left */}
          <div className="space-y-6">
            <h2 className="text-3xl font-light">Why AURA?</h2>
            <p className="text-muted-foreground leading-relaxed">
              At <span className="font-medium text-foreground">AURA</span>, we believe
              beauty is personal, inclusive, and constantly evolving. We are building
              a brand that values authenticity, creativity, and customer trust.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you’re passionate about beauty, technology, marketing, or
              customer experience, AURA offers a space to grow and make an impact.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <h2 className="text-3xl font-light">Our Culture</h2>
            <p className="text-muted-foreground leading-relaxed">
              We foster a collaborative and supportive environment where ideas are
              valued and innovation is encouraged.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Creative and inclusive work culture</li>
              <li>• Growth-focused learning environment</li>
              <li>• Opportunity to work on real-world products</li>
              <li>• Passion-driven and customer-first mindset</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl font-light mb-6">
            Open Opportunities
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-4">
            We don’t have any open positions at the moment, but we’re always excited
            to connect with talented individuals who share our vision.
          </p>

          <p className="text-muted-foreground">
            Please check back soon or follow us for future updates.
          </p>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <p className="text-lg text-muted-foreground leading-relaxed">
            At AURA, your work contributes to a brand that helps people feel confident,
            inspired, and empowered every day.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
