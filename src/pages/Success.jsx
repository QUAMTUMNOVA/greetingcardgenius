// src/pages/Success.jsx
export default function Success() {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-white bg-[#0c0c1d]">
        <h1 className="text-3xl font-bold mb-4">🎉 Thank you for your purchase!</h1>
        <p className="mb-6 text-center px-4">
          Your AI-designed greeting card is ready. Click below to download it.
        </p>
        <a
          href="/cards/sample_greeting_card.png"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Download Your Card
        </a>
      </main>
    );
  }
  