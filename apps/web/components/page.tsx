export default function ContactPage() {
  return (
    <main className="container-custom py-16 lg:py-20">
      <div className="prose lg:prose-xl max-w-none">
        <h1>Contact Us</h1>
        <p>Have a question or some feedback? We'd love to hear from you!</p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Email Us</h2>
          <p>For customer service inquiries, please email us at <a href="mailto:support@aura.com">support@aura.com</a>.</p>
          <p>For press and media inquiries, please email us at <a href="mailto:press@aura.com">press@aura.com</a>.</p>
        </div>
        {/* You can add a contact form component here later */}
      </div>
    </main>
  );
}