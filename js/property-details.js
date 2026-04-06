document.addEventListener('DOMContentLoaded', () => {
    // Image Gallery Functionality
    const mainImage = document.getElementById('main-property-image');
    const thumbnails = document.querySelectorAll('.gallery-thumbnails .thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));

            // Add active class to the clicked thumbnail
            this.classList.add('active');

            // Change the main image source
            mainImage.src = this.dataset.fullSrc;
        });
    });

    // Automatically activate the first thumbnail if any exist
    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
    }

    // Agent Contact Form Validation
    const contactAgentForm = document.getElementById('contact-agent-form');

    if (contactAgentForm) {
        contactAgentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            const phone = document.getElementById('contact-phone').value.trim(); // Optional

            let isValid = true;

            // Simple validation
            if (name === '') {
                alert('Please enter your name.');
                isValid = false;
            } else if (email === '' || !validateEmail(email)) {
                alert('Please enter a valid email address.');
                isValid = false;
            } else if (message === '') {
                alert('Please enter your message.');
                isValid = false;
            }

            if (isValid) {
                // In a real application, you would send this data to a backend server
                console.log('Agent Contact Form Data:', { name, email, phone, message });
                alert('Your message has been sent to the agent!');
                contactAgentForm.reset();
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Dynamic content for a single property details page (simulated)
    // In a real app, this would fetch data based on URL parameter (e.g., property-details.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');

    const mockPropertyData = {
        '1': {
            title: 'Modern Villa with Pool in Miami',
            location: '123 Ocean Drive, Miami, FL 33139',
            price: '$1,200,000',
            description: `Experience luxury living in this stunning modern villa located in the heart of Miami.
                          Boasting 4 spacious bedrooms, 3 luxurious bathrooms, and an expansive open-concept
                          living area, this home is perfect for entertaining and family life. Enjoy the beautiful
                          Florida weather in your private backyard oasis featuring a sparkling swimming pool,
                          lush landscaping, and a covered patio for al fresco dining. High ceilings, designer finishes,
                          and state-of-the-art appliances are just a few of the features that make this property truly exceptional.
                          Conveniently located near top-rated schools, pristine beaches, and vibrant dining and shopping destinations.
                          Don't miss this opportunity to own a piece of paradise!`,
            images: [
                'https://via.placeholder.com/800x500/FFDDC1/808080?text=Main+Villa+Image',
                'https://via.placeholder.com/800x500/CCE0FF/808080?text=Villa+Living+Room',
                'https://via.placeholder.com/800x500/D2F9D2/808080?text=Villa+Kitchen',
                'https://via.placeholder.com/800x500/FFDDC1/808080?text=Villa+Bedroom',
                'https://via.placeholder.com/800x500/CCE0FF/808080?text=Villa+Pool'
            ],
            amenities: [
                '4 Bedrooms', '3 Bathrooms', '2500 Sqft', '2 Car Garage', 'Private Pool',
                'Lush Garden', 'Modern Kitchen', 'Open Concept Layout', 'Central AC', 'Security System'
            ],
            agent: {
                name: 'Sarah Johnson',
                title: 'Lead Real Estate Agent',
                photo: 'https://via.placeholder.com/100x100/FFDDC1/808080?text=Agent',
                phone: '+11234567890'
            },
            mapEmbed: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.42550186591!2d-80.1384074239276!3d25.75704170889982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b4b08c90ad73%3A0xc3924f0c43666b6e!2sOcean%20Dr%2C%20Miami%20Beach%2C%20FL%2033139!5e0!3m2!1sen!2sus!4v1701041680105!5m2!1sen!2sus`
        },
        '2': {
            title: 'Luxury Apartment Downtown New York',
            location: '456 Broadway, New York, NY 10012',
            price: '$850,000',
            description: `Live in the heart of the city in this exquisite luxury apartment.
                          Featuring 2 bedrooms, 2 bathrooms, and breathtaking views of the Manhattan skyline.
                          The building offers premium amenities including a doorman, fitness center, and rooftop access.
                          Perfect for urban professionals seeking convenience and style.`,
            images: [
                'https://via.placeholder.com/800x500/CCE0FF/808080?text=Apt+Main',
                'https://via.placeholder.com/800x500/D2F9D2/808080?text=Apt+Living',
                'https://via.placeholder.com/800x500/FFDDC1/808080?text=Apt+Bedroom'
            ],
            amenities: [
                '2 Bedrooms', '2 Bathrooms', '1200 Sqft', 'City View', 'Fitness Center',
                'Doorman', 'Rooftop Access', 'Modern Appliances'
            ],
            agent: {
                name: 'Mark Taylor',
                title: 'Senior Real Estate Agent',
                photo: 'https://via.placeholder.com/100x100/CCE0FF/808080?text=Agent',
                phone: '+19876543210'
            },
            mapEmbed: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.0847259047246!2d-73.99969168459424!3d40.71969247933151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25988e0018f6d%3A0x6b4c2b9a1c2a1e0!2sBroadway%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1701042502690!5m2!1sen!2sus`
        }
        // Add more mock properties as needed for other IDs
    };

    const property = mockPropertyData[propertyId] || mockPropertyData['1']; // Default to ID 1 if not found

    document.getElementById('property-title').textContent = property.title;
    document.querySelector('.property-header .location').textContent = property.location;
    document.querySelector('.property-header .price').textContent = property.price;
    document.getElementById('property-description').textContent = property.description;

    // Update image gallery
    mainImage.src = property.images[0];
    const thumbnailContainer = document.querySelector('.gallery-thumbnails');
    thumbnailContainer.innerHTML = '';
    property.images.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc.replace('800x500', '150x100'); // Use smaller thumbnail version
        thumb.alt = `Thumbnail ${index + 1}`;
        thumb.classList.add('thumbnail');
        thumb.dataset.fullSrc = imgSrc;
        if (index === 0) {
            thumb.classList.add('active');
        }
        thumbnailContainer.appendChild(thumb);
    });
    // Re-attach event listeners for newly created thumbnails
    document.querySelectorAll('.gallery-thumbnails .thumbnail').forEach(t => {
        t.addEventListener('click', function() {
            document.querySelectorAll('.gallery-thumbnails .thumbnail').forEach(t2 => t2.classList.remove('active'));
            this.classList.add('active');
            mainImage.src = this.dataset.fullSrc;
        });
    });

    // Update amenities
    const amenitiesList = document.querySelector('.amenities-list');
    amenitiesList.innerHTML = '';
    const amenityIcons = {
        'Bedrooms': 'fas fa-bed', 'Bathrooms': 'fas fa-bath', 'Sqft': 'fas fa-ruler-combined',
        'Garage': 'fas fa-car', 'Pool': 'fas fa-water', 'Garden': 'fas fa-leaf',
        'Kitchen': 'fas fa-kitchen-set', 'Layout': 'fas fa-door-open', 'AC': 'fas fa-snowflake',
        'System': 'fas fa-shield-alt', 'View': 'fas fa-mountain', 'Center': 'fas fa-dumbbell',
        'Doorman': 'fas fa-bell-concierge', 'Access': 'fas fa-building', 'Appliances': 'fas fa-blender'
    };
    property.amenities.forEach(amenity => {
        const li = document.createElement('li');
        let iconClass = 'fas fa-info-circle'; // Default icon
        for (const keyword in amenityIcons) {
            if (amenity.includes(keyword)) {
                iconClass = amenityIcons[keyword];
                break;
            }
        }
        li.innerHTML = `<i class="${iconClass}"></i> ${amenity}`;
        amenitiesList.appendChild(li);
    });

    // Update agent info
    document.querySelector('.agent-photo').src = property.agent.photo;
    document.querySelector('.agent-name').textContent = property.agent.name;
    document.querySelector('.agent-title').textContent = property.agent.title;
    document.querySelector('.agent-contact-form .btn-secondary').href = `tel:${property.agent.phone}`;

    // Update map embed
    document.querySelector('.map-placeholder iframe').src = property.mapEmbed;
});