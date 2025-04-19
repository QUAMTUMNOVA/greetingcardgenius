import { useEffect, useState } from 'react';

export default function Success() {
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (!token) {
      setValid(false);
      setLoading(false);
      return;
    }

    fetch(`/.netlify/functions/validate-token?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        setValid(data.valid);
        setLoading(false);
      })
      .catch(() => {
        setValid(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white text-center mt-20">🔐 Verifying your purchase...</div>;

  if (!valid) {
    return (
      <div className="text-white text-center mt-20">
        ❌ Invalid or expired access link. Please complete your purchase first.<br />
        <a href="/" className="underline text-blue-400 mt-4 inline-block">Return to Homepage</a>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white bg-[#0c0c1d] px-6 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-400">🎉 Thank you for your purchase!</h1>
      <p className="mb-6 max-w-xl">
        Your AI-generated greeting card is ready. Click below to download it instantly:
      </p>
      <a
        href="/cards/sample_greeting_card.png"
        download
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        Download Your Card
      </a>
    </main>
  );
}
