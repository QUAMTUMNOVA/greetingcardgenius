import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="flex justify-between items-center px-6 pt-6">
      <h1 className="text-2xl font-bold text-yellow-400">Greeting Card Genius</h1>
      <div className="space-x-4 text-sm">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">Instagram</a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">Facebook</a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">X</a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0c0c1d] text-gray-400 text-sm py-6 px-4 text-center border-t border-gray-800">
      <div className="max-w-4xl mx-auto space-y-2">
        <div className="space-x-4">
          <Link to="/terms" className="hover:underline text-white">Terms</Link>
          <Link to="/privacy" className="hover:underline text-white">Privacy</Link>
          <Link to="/refunds" className="hover:underline text-white">Refunds</Link>
          <a href="mailto:admin@quantumnova.com.au" className="hover:underline text-white">Contact</a>
        </div>
        <p className="mt-2">&copy; 2025 QUANTUMNOVA PTY LTD — All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0c0c1d] text-white px-6 py-12">
      <Helmet>
        <title>Greeting Card Genius – AI-Designed Cards</title>
        <meta name="description" content="AI-generated greeting cards for every occasion — sweet, savage, or hilarious. Drop your message. We'll handle the magic." />
        <meta property="og:image" content="/og-greetingcardgenius.jpg" />
      </Helmet>

      <Header />

      <div className="max-w-4xl mx-auto text-center space-y-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500">
          🧠 Greeting Card Genius
        </h1>
        <p className="text-lg text-gray-300">
          AI-designed greeting cards for every occasion — sweet, savage, or hilarious. Drop your message. We'll handle the magic.
        </p>

        <div className="rounded-xl border border-yellow-400 p-6 bg-[#1c1c2b] text-left shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-300 mb-3">Coming Soon</h2>
          <p className="text-gray-400">We're finalizing the collection and testing direct checkout. Be first in line for exclusive drops, discounts, and early access.</p>

          <form className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-md w-full sm:w-80 text-black"
            />
            <button
              type="submit"
              disabled
              className="bg-yellow-500 text-black px-5 py-2 rounded-md cursor-not-allowed"
            >
              Notify Me
            </button>
          </form>
        </div>

        <div className="pt-10 text-sm text-gray-500">
          Powered by <strong>QUANTUMNOVA</strong> · Custom Airwallex checkout coming soon
        </div>
      </div>

      <Footer />
    </main>
  );
}
