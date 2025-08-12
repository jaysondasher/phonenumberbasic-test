'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PhoneListing } from '@/types';
import { DataObfuscator } from '@/lib/obfuscation';

interface ListingsTableProps {
  listings: PhoneListing[];
}

export default function ListingsTable({ listings }: ListingsTableProps) {
  const [displayedListings, setDisplayedListings] = useState<PhoneListing[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const listingsPerPage = 8;

  useEffect(() => {
    loadMoreListings();
  }, []);

  const loadMoreListings = () => {
    const startIndex = currentPage * listingsPerPage;
    const endIndex = startIndex + listingsPerPage;
    const newListings = listings.slice(startIndex, endIndex);
    
    if (currentPage === 0) {
      setDisplayedListings(newListings);
    } else {
      setDisplayedListings(prev => [...prev, ...newListings]);
    }
    
    setCurrentPage(prev => prev + 1);
  };

  const hasMoreListings = currentPage * listingsPerPage < listings.length;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Latest Phone Number Listings</h2>
          <p className="text-gray-600">Recent additions to our database</p>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone Number</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Business</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedListings.map((listing, index) => {
                const displayData = DataObfuscator.getDisplayData(listing);
                return (
                  <tr key={`${listing.phone}-${index}`} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link 
                        href={`/phone-number/${listing.phone}`}
                        className="text-purple-600 hover:text-purple-800 font-medium"
                      >
                        {listing.phone}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{displayData.name}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {displayData.businessName || 'Personal'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {displayData.city}, {displayData.state}
                    </td>
                    <td className="px-6 py-4">
                      <Link 
                        href={`/phone-number/${listing.phone}`}
                        className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {hasMoreListings && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreListings}
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Load More Listings
            </button>
          </div>
        )}
      </div>
    </section>
  );
}