export default function Success() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white bg-[#0c0c1d] px-6 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-400">🎉 Thank you for your purchase!</h1>
      <p className="mb-6 max-w-xl">
        Your AI-generated greeting card is ready. Click below to download it instantly:
      </p>
      <a
        href="/cards/sample_greeting_card.png"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        Download Your Card
      </a>
    </main>
  );
}
