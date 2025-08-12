'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { searchPhoneNumber, getSimilarListings } from '@/lib/search';
import { PhoneListing } from '@/types';
import { DataObfuscator } from '@/lib/obfuscation';

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const phoneNumber = searchParams.get('phone') || '';
  const [similarListings, setSimilarListings] = useState<PhoneListing[]>([]);

  useEffect(() => {
    if (phoneNumber) {
      const result = searchPhoneNumber(phoneNumber);
      if (result) {
        router.replace(`/phone-number/${result.phone}`);
      } else {
        const similar = getSimilarListings(phoneNumber);
        setSimilarListings(similar);
      }
    }
  }, [phoneNumber, router]);

  if (!phoneNumber) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No phone number provided</h1>
          <Link href="/" className="text-purple-600 hover:text-purple-800">
            Return to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">No Record Found</h1>
          <p className="text-gray-700 mb-6">
            We couldn&apos;t find any information for <strong>{phoneNumber}</strong>
          </p>

          {similarListings.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">
                Similar listings in the same area code:
              </h2>
              <div className="space-y-3">
                {similarListings.map((listing) => {
                  const displayData = DataObfuscator.getDisplayData(listing);
                  return (
                    <Link
                      key={listing.phone}
                      href={`/phone-number/${listing.phone}`}
                      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <strong className="text-purple-600">{listing.phone}</strong>
                          <span className="mx-2">-</span>
                          <span>{displayData.name}</span>
                          {displayData.businessName && (
                            <span className="text-gray-600"> ({displayData.businessName})</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {displayData.city}, {displayData.state}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Another Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}