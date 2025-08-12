'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PhoneListing } from '@/types';
import { DataObfuscator } from '@/lib/obfuscation';

interface PhoneDetailsProps {
  listing: PhoneListing;
}

export default function PhoneDetails({ listing }: PhoneDetailsProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  useEffect(() => {
    setIsRegistered(DataObfuscator.isUserRegistered());
  }, []);

  const handleRegister = () => {
    DataObfuscator.registerUser();
    setIsRegistered(true);
    setShowRegistrationModal(false);
    window.location.reload();
  };

  const displayData = DataObfuscator.getDisplayData(listing);

  return (
    <>
      <div className="bg-gray-50 py-4 border-b">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link href="/" className="text-purple-600 hover:text-purple-800">
              Home
            </Link>
            <span className="mx-2 text-gray-500">›</span>
            <span className="text-gray-700">{listing.phone}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
              <h1 className="text-3xl font-bold mb-2">{listing.phone}</h1>
              <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                Active Number
              </span>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Contact Information</h2>
                {!isRegistered && (
                  <button
                    onClick={() => setShowRegistrationModal(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Register to View Full Details
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Full Name</label>
                    <p className="text-lg font-medium">{displayData.name}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Email Address</label>
                    <p className="text-lg">{displayData.email}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Business Name</label>
                    <p className="text-lg">{displayData.businessName || 'Personal'}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Age</label>
                    <p className="text-lg">{displayData.age}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Address</label>
                    <p className="text-lg">{displayData.address}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Location</label>
                    <p className="text-lg">{displayData.city}, {displayData.state} {displayData.zip}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Occupation</label>
                    <p className="text-lg">{displayData.occupation}</p>
                  </div>
                </div>
              </div>

              {isRegistered && (
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-xl font-semibold">Additional Information</h3>
                  
                  <div>
                    <label className="text-sm text-gray-600">Previous Addresses</label>
                    <p className="text-lg">{listing.previousAddresses || 'None available'}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Relatives</label>
                    <p className="text-lg">{listing.relatives || 'None available'}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Social Profiles</label>
                    <p className="text-lg">{listing.socialProfiles || 'None available'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {!isRegistered && (
            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Want to see complete details?</h3>
              <p className="text-gray-700 mb-4">
                Register for free to unlock full access to phone number information including previous addresses, 
                relatives, and social profiles.
              </p>
              <button
                onClick={() => setShowRegistrationModal(true)}
                className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Register Now - It's Free
              </button>
            </div>
          )}
        </div>
      </div>

      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Quick Registration</h2>
            <p className="text-gray-700 mb-6">
              This is a demo registration. Click register to unlock full details.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleRegister}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Register
              </button>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}