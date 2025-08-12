import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findListingByPhone, getPhoneListings } from '@/lib/data';
import PhoneDetails from '@/components/PhoneDetails';

interface Props {
  params: Promise<{ phone: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { phone } = await params;
  const listing = findListingByPhone(phone);
  
  if (!listing) {
    return {
      title: 'Phone Number Not Found',
    };
  }

  return {
    title: `${phone} - Phone Number Lookup | PhoneLookup Pro`,
    description: `Get detailed information about ${phone}. Find owner name, address, and more with our reverse phone lookup service.`,
  };
}

export async function generateStaticParams() {
  const listings = getPhoneListings();
  return listings.map(listing => ({
    phone: listing.phone,
  }));
}

export default async function PhoneNumberPage({ params }: Props) {
  const { phone } = await params;
  const listing = findListingByPhone(phone);

  if (!listing) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    telephone: listing.phone,
    name: `${listing.firstName} ${listing.lastName}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.streetAddress,
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PhoneDetails listing={listing} />
    </>
  );
}