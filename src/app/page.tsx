import PhoneSearch from '@/components/PhoneSearch';
import ListingsTable from '@/components/ListingsTable';
import FeatureCards from '@/components/FeatureCards';
import { getPhoneListings } from '@/lib/data';

export default function Home() {
  const listings = getPhoneListings();

  return (
    <>
      <PhoneSearch />
      <ListingsTable listings={listings} />
      <FeatureCards />
    </>
  );
}