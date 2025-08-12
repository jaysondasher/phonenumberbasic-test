// Search functionality for phone number lookup
class PhoneSearch {
    
    constructor() {
        this.currentListingsPage = 0;
        this.listingsPerPage = 8;
        this.initializeEventListeners();
        this.loadLatestListings();
    }
    
    initializeEventListeners() {
        // Search form submission
        const searchForm = document.getElementById('phone-search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.performSearch();
            });
        }
        
        // Phone input formatting
        const phoneInput = document.getElementById('phone-input');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                this.formatPhoneInput(e.target);
            });
        }
        
        // Load more listings button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreListings();
            });
        }
    }
    
    // Format phone input as user types
    formatPhoneInput(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{0,4})/, '$1-$2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '$1-$2');
        }
        
        input.value = value;
    }
    
    // Perform phone number search
    performSearch() {
        const phoneInput = document.getElementById('phone-input');
        const searchResults = document.getElementById('search-results');
        const noResults = document.getElementById('no-results');
        
        if (!phoneInput || !searchResults) return;
        
        const phoneNumber = phoneInput.value.trim();
        if (!phoneNumber) {
            alert('Please enter a phone number');
            return;
        }
        
        // Clean the phone number for searching
        const cleanedPhone = this.cleanPhoneNumber(phoneNumber);
        
        // Find exact match
        const exactMatch = findListingByPhone(phoneNumber);
        
        if (exactMatch) {
            // Redirect to phone number page
            const formattedPhone = formatPhoneNumber(exactMatch.phone);
            window.location.href = `phone-number/${formattedPhone}.html`;
            return;
        }
        
        // Show no results with similar results
        this.showNoResults(cleanedPhone);
    }
    
    // Show no results found with similar suggestions
    showNoResults(searchedPhone) {
        const searchResults = document.getElementById('search-results');
        const noResults = document.getElementById('no-results');
        const similarResults = document.getElementById('similar-results');
        
        if (!searchResults || !noResults || !similarResults) return;
        
        // Find similar results (same area code)
        const areaCode = searchedPhone.substring(0, 3);
        const similarListings = getPhoneListings().filter(listing => {
            const listingAreaCode = this.cleanPhoneNumber(listing.phone).substring(0, 3);
            return listingAreaCode === areaCode;
        }).slice(0, 5); // Show up to 5 similar results
        
        // Build similar results HTML
        let similarHTML = '';
        if (similarListings.length > 0) {
            similarHTML = `
                <h4>Similar listings in the ${areaCode} area code:</h4>
                <div class="similar-listings">
                    ${similarListings.map(listing => {
                        const displayData = DataObfuscator.getDisplayData(listing);
                        return `
                            <div class="similar-listing">
                                <a href="phone-number/${listing.phone}.html" class="similar-link">
                                    <strong>${listing.phone}</strong> - ${displayData.name}
                                    ${displayData.businessName ? ` (${displayData.businessName})` : ''}
                                </a>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }
        
        similarResults.innerHTML = similarHTML;
        searchResults.style.display = 'block';
        noResults.style.display = 'block';
        
        // Scroll to results
        searchResults.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Load latest listings for homepage
    loadLatestListings() {
        const listingsBody = document.getElementById('latest-listings-body');
        if (!listingsBody) return;
        
        const listings = getPhoneListings();
        const startIndex = this.currentListingsPage * this.listingsPerPage;
        const endIndex = startIndex + this.listingsPerPage;
        const pageListings = listings.slice(startIndex, endIndex);
        
        const listingsHTML = pageListings.map(listing => {
            const displayData = DataObfuscator.getDisplayData(listing);
            return `
                <tr class="listing-row">
                    <td class="phone-cell" data-label="Phone Number">
                        <a href="phone-number/${listing.phone}.html" class="phone-link">
                            ${listing.phone}
                        </a>
                    </td>
                    <td class="name-cell" data-label="Name">${displayData.name}</td>
                    <td class="business-cell" data-label="Business">${displayData.businessName || 'Personal'}</td>
                    <td class="location-cell" data-label="Location">${displayData.city}, ${displayData.state}</td>
                    <td class="action-cell" data-label="Action">
                        <a href="phone-number/${listing.phone}.html" class="view-btn">View Details</a>
                    </td>
                </tr>
            `;
        }).join('');
        
        if (this.currentListingsPage === 0) {
            listingsBody.innerHTML = listingsHTML;
        } else {
            listingsBody.innerHTML += listingsHTML;
        }
        
        // Hide load more button if no more listings
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn && endIndex >= listings.length) {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    // Load more listings when button is clicked
    loadMoreListings() {
        this.currentListingsPage++;
        this.loadLatestListings();
    }
    
    // Clean phone number for comparison
    cleanPhoneNumber(phone) {
        return phone.replace(/\D/g, '');
    }
}

// Initialize search functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PhoneSearch();
});

// Export for global use
window.PhoneSearch = PhoneSearch;