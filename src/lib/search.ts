import { PhoneListing } from '@/types';
import { phoneListings, cleanPhoneNumber } from './data';

export function searchPhoneNumber(phoneNumber: string): PhoneListing | undefined {
  const cleanPhone = cleanPhoneNumber(phoneNumber);
  return phoneListings.find(listing => cleanPhoneNumber(listing.phone) === cleanPhone);
}

export function getSimilarListings(phoneNumber: string, limit: number = 5): PhoneListing[] {
  const cleanPhone = cleanPhoneNumber(phoneNumber);
  if (cleanPhone.length < 3) return [];
  
  const areaCode = cleanPhone.substring(0, 3);
  
  return phoneListings
    .filter(listing => {
      const listingAreaCode = cleanPhoneNumber(listing.phone).substring(0, 3);
      return listingAreaCode === areaCode && cleanPhoneNumber(listing.phone) !== cleanPhone;
    })
    .slice(0, limit);
}

export function formatPhoneInput(value: string): string {
  let cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length >= 6) {
    cleaned = cleaned.replace(/(\d{3})(\d{3})(\d{0,4})/, '$1-$2-$3');
  } else if (cleaned.length >= 3) {
    cleaned = cleaned.replace(/(\d{3})(\d{0,3})/, '$1-$2');
  }
  
  return cleaned;
}