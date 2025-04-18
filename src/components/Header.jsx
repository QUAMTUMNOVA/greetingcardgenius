export default function Header() {
  return (
    <header className="text-center py-6 space-y-2">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500">
        🧠 Greeting Card Genius
      </h1>
      <div className="space-x-4 text-sm flex justify-center">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">Instagram</a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">Facebook</a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">X</a>
      </div>
    </header>
  );
}
