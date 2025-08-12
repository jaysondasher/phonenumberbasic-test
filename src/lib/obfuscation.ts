import { PhoneListing, ObfuscatedDisplay } from '@/types';

export class DataObfuscator {
  static obfuscateName(firstName: string, lastName: string): string {
    if (!firstName && !lastName) return "Unknown";
    
    const obfuscateWord = (word: string) => {
      if (!word || word.length <= 2) return word;
      const first = word[0];
      const last = word[word.length - 1];
      const middle = '*'.repeat(word.length - 2);
      return first + middle + last;
    };
    
    const obfuscatedFirst = firstName ? obfuscateWord(firstName) : "";
    const obfuscatedLast = lastName ? obfuscateWord(lastName) : "";
    
    if (obfuscatedFirst && obfuscatedLast) {
      return `${obfuscatedFirst} ${obfuscatedLast}`;
    }
    return obfuscatedFirst || obfuscatedLast;
  }
  
  static obfuscateEmail(email: string): string {
    if (!email || !email.includes('@')) return "Hidden";
    
    const [username, domain] = email.split('@');
    
    const obfuscateUsername = (user: string) => {
      if (user.length <= 2) return user;
      return user[0] + '*'.repeat(Math.max(user.length - 2, 1)) + (user.length > 1 ? user[user.length - 1] : '');
    };
    
    const obfuscateDomain = (dom: string) => {
      const parts = dom.split('.');
      if (parts.length < 2) return dom;
      
      const domainName = parts[0];
      const extension = parts.slice(1).join('.');
      
      if (domainName.length <= 2) return dom;
      return domainName[0] + '*'.repeat(Math.max(domainName.length - 2, 1)) + domainName[domainName.length - 1] + '.' + extension;
    };
    
    return `${obfuscateUsername(username)}@${obfuscateDomain(domain)}`;
  }
  
  static obfuscateAddress(address: string): string {
    if (!address) return "Hidden";
    
    const parts = address.trim().split(' ');
    if (parts.length < 2) return address;
    
    const streetNumber = parts[0];
    const streetName = parts.slice(1).join(' ');
    
    let obfuscatedNumber = streetNumber;
    if (streetNumber.length > 2 && /^\d+$/.test(streetNumber)) {
      obfuscatedNumber = streetNumber[0] + '*'.repeat(streetNumber.length - 1);
    }
    
    return `${obfuscatedNumber} ${streetName}`;
  }
  
  static obfuscateBusinessName(businessName?: string): string {
    return businessName || "";
  }
  
  static obfuscateAge(age: string): string {
    if (!age) return "Hidden";
    if (age.length <= 1) return age;
    return age[0] + '*';
  }
  
  static obfuscateRelatives(relatives: string): string {
    if (!relatives) return "Hidden";
    
    const relativesList = relatives.split(';').map(rel => {
      const trimmed = rel.trim();
      if (!trimmed) return trimmed;
      
      const match = trimmed.match(/^([^(]+)(\(.+\))?$/);
      if (match) {
        const name = match[1].trim();
        const relationship = match[2] || '';
        const nameParts = name.split(' ');
        
        if (nameParts.length >= 2) {
          const obfuscatedName = this.obfuscateName(nameParts[0], nameParts.slice(1).join(' '));
          return `${obfuscatedName} ${relationship}`;
        }
      }
      
      return trimmed;
    });
    
    return relativesList.join('; ');
  }
  
  static isUserRegistered(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('phonelookup_registered') === 'true';
    }
    return false;
  }
  
  static registerUser(): boolean {
    if (typeof window !== 'undefined') {
      localStorage.setItem('phonelookup_registered', 'true');
      return true;
    }
    return false;
  }
  
  static getDisplayData(listing: PhoneListing): ObfuscatedDisplay {
    const isRegistered = this.isUserRegistered();
    
    return {
      name: isRegistered ? 
        `${listing.firstName} ${listing.lastName}` : 
        this.obfuscateName(listing.firstName, listing.lastName),
      email: isRegistered ? 
        listing.email : 
        this.obfuscateEmail(listing.email),
      businessName: this.obfuscateBusinessName(listing.businessName),
      address: isRegistered ? 
        listing.streetAddress : 
        this.obfuscateAddress(listing.streetAddress),
      city: listing.city,
      state: listing.state,
      zip: listing.zip,
      age: isRegistered ? listing.age : this.obfuscateAge(listing.age),
      occupation: isRegistered ? listing.occupation : "Hidden"
    };
  }
}