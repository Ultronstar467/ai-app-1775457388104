document.addEventListener('DOMContentLoaded', () => {
    const propertyListingsContainer = document.getElementById('property-listings');
    const filterForm = document.getElementById('filter-form');
    const sortSelect = document.getElementById('sort-by');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const propertyCountSpan = document.getElementById('property-count');

    let allProperties = Array.from(propertyListingsContainer.children);
    const propertiesPerPage = 6;
    let loadedPropertiesCount = propertiesPerPage;

    // Function to render properties
    const renderProperties = (propertiesToShow) => {
        propertyListingsContainer.innerHTML = '';
        propertiesToShow.forEach(property => {
            propertyListingsContainer.appendChild(property);
            // Re-add fade-in.appear class if it was removed
            setTimeout(() => {
                property.classList.add('appear');
            }, 10);
        });
        updatePropertyCount(propertiesToShow.length);
        toggleLoadMoreButton(propertiesToShow.length, allProperties.length);
    };

    // Function to update the displayed property count
    const updatePropertyCount = (count) => {
        if (propertyCountSpan) {
            propertyCountSpan.textContent = count;
        }
    };

    // Function to toggle Load More button visibility
    const toggleLoadMoreButton = (currentCount, totalCount) => {
        if (loadMoreBtn) {
            if (currentCount < totalCount) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    };

    // Apply Filters & Sort
    const applyFiltersAndSort = () => {
        let filteredProperties = [...allProperties]; // Create a mutable copy

        // 1. Filter by Location
        const locationFilter = document.getElementById('location').value.toLowerCase();
        if (locationFilter) {
            filteredProperties = filteredProperties.filter(property =>
                property.dataset.location && property.dataset.location.toLowerCase().includes(locationFilter)
            );
        }

        // 2. Filter by Property Type
        const typeFilter = document.getElementById('property-type').value.toLowerCase();
        if (typeFilter) {
            filteredProperties = filteredProperties.filter(property =>
                property.dataset.type && property.dataset.type.toLowerCase() === typeFilter
            );
        }

        // 3. Filter by Price Range
        const minPrice = parseFloat(document.getElementById('min-price').value);
        const maxPrice = parseFloat(document.getElementById('max-price').value);

        filteredProperties = filteredProperties.filter(property => {
            const price = parseFloat(property.dataset.price);
            return (!isNaN(minPrice) ? price >= minPrice : true) &&
                   (!isNaN(maxPrice) ? price <= maxPrice : true);
        });

        // 4. Filter by Bedrooms
        const bedroomsFilter = parseFloat(document.getElementById('bedrooms').value);
        if (!isNaN(bedroomsFilter)) {
            filteredProperties = filteredProperties.filter(property => {
                const beds = parseFloat(property.dataset.beds);
                return beds >= bedroomsFilter;
            });
        }

        // 5. Sort
        const sortBy = sortSelect.value;
        filteredProperties.sort((a, b) => {
            if (sortBy === 'price-asc') {
                return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
            } else if (sortBy === 'price-desc') {
                return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
            } else if (sortBy === 'date-new') {
                return new Date(b.dataset.date) - new Date(a.dataset.date);
            }
            return 0; // default
        });

        // Reset loaded count for re-rendering
        loadedPropertiesCount = propertiesPerPage;
        renderProperties(filteredProperties.slice(0, loadedPropertiesCount));
    };

    // Event Listeners
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        applyFiltersAndSort();
    });

    filterForm.addEventListener('reset', () => {
        // Clear all filters, then apply filters (which will now show all)
        setTimeout(applyFiltersAndSort, 50); // Small delay to allow form to reset
    });

    sortSelect.addEventListener('change', applyFiltersAndSort);

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const currentlyDisplayed = propertyListingsContainer.children.length;
            loadedPropertiesCount += propertiesPerPage;

            // Re-apply filters and sort, then render more
            let filteredProperties = [...allProperties];
            // Apply all filters first
            const locationFilter = document.getElementById('location').value.toLowerCase();
            const typeFilter = document.getElementById('property-type').value.toLowerCase();
            const minPrice = parseFloat(document.getElementById('min-price').value);
            const maxPrice = parseFloat(document.getElementById('max-price').value);
            const bedroomsFilter = parseFloat(document.getElementById('bedrooms').value);

            if (locationFilter) filteredProperties = filteredProperties.filter(p => p.dataset.location && p.dataset.location.toLowerCase().includes(locationFilter));
            if (typeFilter) filteredProperties = filteredProperties.filter(p => p.dataset.type && p.dataset.type.toLowerCase() === typeFilter);
            filteredProperties = filteredProperties.filter(p => {
                const price = parseFloat(p.dataset.price);
                return (!isNaN(minPrice) ? price >= minPrice : true) && (!isNaN(maxPrice) ? price <= maxPrice : true);
            });
            if (!isNaN(bedroomsFilter)) filteredProperties = filteredProperties.filter(p => parseFloat(p.dataset.beds) >= bedroomsFilter);

            // Apply sorting
            const sortBy = sortSelect.value;
            filteredProperties.sort((a, b) => {
                if (sortBy === 'price-asc') { return parseFloat(a.dataset.price) - parseFloat(b.dataset.price); }
                else if (sortBy === 'price-desc') { return parseFloat(b.dataset.price) - parseFloat(a.dataset.price); }
                else if (sortBy === 'date-new') { return new Date(b.dataset.date) - new Date(a.dataset.date); }
                return 0;
            });

            // Render up to the new loadedPropertiesCount
            renderProperties(filteredProperties.slice(0, loadedPropertiesCount));
        });
    }

    // Initial load of properties
    const initialProperties = allProperties.slice(0, propertiesPerPage);
    renderProperties(initialProperties);

    // Handle initial search query from homepage
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearchTerm = urlParams.get('search');
    if (initialSearchTerm) {
        document.getElementById('location').value = initialSearchTerm;
        applyFiltersAndSort();
    }
});