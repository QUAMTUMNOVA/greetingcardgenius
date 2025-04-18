export default function Home() {
  return (
    <div className="min-h-screen bg-[#fefefe] text-[#1a1a1a] px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Greeting Card Genius</h1>
          <p className="text-lg text-gray-600">AI-generated cards for every moment — sarcastic, sweet, or just plain weird.</p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">🎉 Featured Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <img src="/cards/funny-birthday-1.png" alt="Funny Birthday Card" className="rounded mb-2" />
              <h3 className="font-bold text-lg">Funny Birthday Card</h3>
              <p className="text-sm text-gray-500">AU$2.00</p>
              <button className="mt-2 px-4 py-1 bg-black text-white rounded">Buy Now</button>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <img src="/cards/breakup-sarcasm.png" alt="Breakup Card" className="rounded mb-2" />
              <h3 className="font-bold text-lg">Breakup Sarcasm</h3>
              <p className="text-sm text-gray-500">AU$2.00</p>
              <button className="mt-2 px-4 py-1 bg-black text-white rounded">Buy Now</button>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <img src="/cards/pet-love.png" alt="Pet Love Card" className="rounded mb-2" />
              <h3 className="font-bold text-lg">Pet Love</h3>
              <p className="text-sm text-gray-500">AU$2.00</p>
              <button className="mt-2 px-4 py-1 bg-black text-white rounded">Buy Now</button>
            </div>
          </div>
        </section>

        <section className="bg-[#fffae6] text-center p-6 rounded-xl border border-yellow-300">
          <h2 className="text-2xl font-semibold mb-2">🚀 More Cards Dropping Weekly</h2>
          <p className="text-gray-700">From sarcastic roast packs to heartfelt originals — we’ve got AI-powered greetings for whatever life throws at you.</p>
        </section>
      </div>
    </div>
  );
}