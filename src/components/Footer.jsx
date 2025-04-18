import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0c0c1d] text-gray-400 text-sm py-6 px-4 text-center border-t border-gray-800">
      <div className="max-w-4xl mx-auto space-y-2">
        <div className="space-x-4">
          <Link to="/terms" className="hover:underline text-white">Terms</Link>
          <Link to="/privacy" className="hover:underline text-white">Privacy</Link>
          <Link to="/refunds" className="hover:underline text-white">Refunds</Link>
          <a href="mailto:admin@quantumnova.com.au" className="hover:underline text-white">Contact</a>
        </div>

        <p className="text-gray-400">ABN: 43 686 016 526</p>

        <p className="mt-2">&copy; 2025 QUANTUMNOVA PTY LTD — All rights reserved.</p>
      </div>
    </footer>
  );
}
