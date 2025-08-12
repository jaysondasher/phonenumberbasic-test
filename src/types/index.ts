export interface PhoneListing {
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  businessName?: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  age: string;
  occupation: string;
  previousAddresses: string;
  relatives: string;
  socialProfiles: string;
}

export interface ObfuscatedDisplay {
  name: string;
  email: string;
  businessName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  age: string;
  occupation: string;
}

export interface SearchResult {
  found: boolean;
  listing?: PhoneListing;
  similarListings?: PhoneListing[];
}