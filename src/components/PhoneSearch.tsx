'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { formatPhoneInput } from '@/lib/search';

export default function PhoneSearch() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length >= 10) {
      router.push(`/search?phone=${phoneNumber}`);
    } else {
      alert('Please enter a valid phone number');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    setPhoneNumber(formatted);
  };

  return (
    <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Out Who&apos;s Calling</h1>
          <p className="text-xl opacity-90">Search millions of phone numbers to identify unknown callers</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="tel"
                value={phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number (e.g., 555-123-4567)"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-400"
                maxLength={14}
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>🔍</span>
                <span>Search</span>
              </button>
            </div>
            <p className="text-sm mt-4 text-center opacity-80">
              Enter any US phone number format: (555) 123-4567, 555-123-4567, or 5551234567
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}