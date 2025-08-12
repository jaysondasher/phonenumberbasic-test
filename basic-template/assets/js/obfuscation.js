// Obfuscation utilities for hiding sensitive information
class DataObfuscator {
    
    // Obfuscate name: "John Smith" -> "J**n S***h"
    static obfuscateName(firstName, lastName) {
        if (!firstName && !lastName) return "Unknown";
        
        const obfuscateWord = (word) => {
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
    
    // Obfuscate email: "john@email.com" -> "j***@e***l.com"
    static obfuscateEmail(email) {
        if (!email || !email.includes('@')) return "Hidden";
        
        const [username, domain] = email.split('@');
        
        const obfuscateUsername = (user) => {
            if (user.length <= 2) return user;
            return user[0] + '*'.repeat(Math.max(user.length - 2, 1)) + (user.length > 1 ? user[user.length - 1] : '');
        };
        
        const obfuscateDomain = (dom) => {
            const parts = dom.split('.');
            if (parts.length < 2) return dom;
            
            const domainName = parts[0];
            const extension = parts.slice(1).join('.');
            
            if (domainName.length <= 2) return dom;
            return domainName[0] + '*'.repeat(Math.max(domainName.length - 2, 1)) + domainName[domainName.length - 1] + '.' + extension;
        };
        
        return `${obfuscateUsername(username)}@${obfuscateDomain(domain)}`;
    }
    
    // Obfuscate address: "1245 Oak Street" -> "1*** Oak Street"
    static obfuscateAddress(address) {
        if (!address) return "Hidden";
        
        // Extract street number and street name
        const parts = address.trim().split(' ');
        if (parts.length < 2) return address;
        
        const streetNumber = parts[0];
        const streetName = parts.slice(1).join(' ');
        
        // Obfuscate street number
        let obfuscatedNumber = streetNumber;
        if (streetNumber.length > 2 && /^\d+$/.test(streetNumber)) {
            obfuscatedNumber = streetNumber[0] + '*'.repeat(streetNumber.length - 1);
        }
        
        return `${obfuscatedNumber} ${streetName}`;
    }
    
    // Obfuscate business name (show full for businesses as they're public)
    static obfuscateBusinessName(businessName) {
        return businessName || "";
    }
    
    // Obfuscate age: "34" -> "3*"
    static obfuscateAge(age) {
        if (!age) return "Hidden";
        if (age.length <= 1) return age;
        return age[0] + '*';
    }
    
    // Obfuscate relatives info
    static obfuscateRelatives(relatives) {
        if (!relatives) return "Hidden";
        
        // Split by semicolon and obfuscate each relative
        const relativesList = relatives.split(';').map(rel => {
            const trimmed = rel.trim();
            if (!trimmed) return trimmed;
            
            // Extract name before parentheses if exists
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
    
    // Check if user is registered (mock registration system)
    static isUserRegistered() {
        return localStorage.getItem('phonelookup_registered') === 'true';
    }
    
    // Mock registration
    static registerUser() {
        localStorage.setItem('phonelookup_registered', 'true');
        return true;
    }
    
    // Get revealed or obfuscated data based on registration status
    static getDisplayData(listing) {
        const isRegistered = this.isUserRegistered();
        
        return {
            phone: listing.phone,
            name: isRegistered ? 
                `${listing.firstName} ${listing.lastName}` : 
                this.obfuscateName(listing.firstName, listing.lastName),
            email: isRegistered ? 
                listing.email : 
                this.obfuscateEmail(listing.email),
            businessName: this.obfuscateBusinessName(listing.businessName),
            address: isRegistered ? 
                `${listing.streetAddress}, ${listing.city}, ${listing.state} ${listing.zip}` : 
                this.obfuscateAddress(listing.streetAddress),
            city: listing.city,
            state: listing.state,
            zip: listing.zip,
            age: isRegistered ? listing.age : this.obfuscateAge(listing.age),
            occupation: isRegistered ? listing.occupation : "Hidden",
            relatives: isRegistered ? listing.relatives : this.obfuscateRelatives(listing.relatives),
            previousAddresses: isRegistered ? listing.previousAddresses : "Hidden",
            socialProfiles: isRegistered ? listing.socialProfiles : "Hidden",
            isRegistered: isRegistered
        };
    }
}

// Export for use in other scripts
window.DataObfuscator = DataObfuscator;