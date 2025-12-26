import { Footer } from '@/components/footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-28 pb-20 border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-6">
            About AURA
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            At AURA, we believe beauty is more than appearance — it’s confidence, care, and self-expression.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14">
          
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-light">Who We Are</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to <span className="font-medium text-foreground">AURA</span>, 
              your trusted destination for premium beauty and lifestyle essentials.
              We curate high-quality skincare, makeup, and wellness products designed
              to enhance your natural beauty and elevate your daily routine.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every product at AURA is thoughtfully selected with a focus on quality,
              authenticity, and results — so you can shop with confidence and ease.
            </p>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-light">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to empower individuals to look and feel their best by
              providing access to effective, safe, and trend-forward beauty solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We aim to create a seamless and inspiring shopping experience that
              blends innovation, elegance, and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-light mb-12 text-center">
            Why Choose AURA
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Curated Quality</h3>
              <p className="text-muted-foreground">
                Handpicked products that meet high standards of performance and safety.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium">Customer First</h3>
              <p className="text-muted-foreground">
                We prioritize transparency, support, and a smooth shopping experience.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium">Modern Beauty</h3>
              <p className="text-muted-foreground">
                AURA reflects modern beauty — inclusive, confident, and evolving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you’re discovering new favorites or restocking essentials, 
            AURA is here to be part of your beauty journey — every step of the way.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
