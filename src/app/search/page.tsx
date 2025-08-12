import { Suspense } from 'react';
import SearchContent from '@/components/SearchContent';

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Searching...</h1>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}