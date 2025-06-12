// Sample product data based on maritime theme
console.log('staticBaseUrl from js' + staticBaseUrl);
//const products = [
//    {
//        id: 1,
//        name: 'Satellite Dish',
//        price: 1200,
//        image: staticBaseUrl + 'img/satellite-dish.jpg',
//        description: 'High-performance satellite dish for reliable communication.'
//    },
//    {
//        id: 2,
//        name: 'Maritime Antenna',
//        price: 850,
//        image: staticBaseUrl + 'img/maritime-antenna.jpg',
//        description: 'Durable antenna designed for harsh maritime environments.'
//    },
//    {
//        id: 3,
//        name: 'Industrial Router',
//        price: 300,
//        image: staticBaseUrl + 'img/industrial-router.jpg',
//        description: 'Robust router for reliable network connectivity at sea.'
//    },
//    {
//        id: 4,
//        name: 'Internet Access Plan',
//        price: 150,
//        image: 'img/internet-access-plan.jpg',
//        description: 'Reliable internet access plans tailored for maritime use.'
//    },
//    {
//        id: 5,
//        name: 'Onboard WiFi System',
//        price: 500,
//        image: 'img/onboard-wifi-system.jpg',
//        description: 'Seamless WiFi coverage throughout your vessel.'
//    },
//    {
//        id: 6,
//        name: 'Underwater Modem',
//        price: 750,
//        image: 'img/underwater-modem.jpg',
//        description: 'Specialized modem for underwater communication needs.'
//    },
//    {
//        id: 7,
//        name: 'Satellite Phone',
//        price: 950,
//        image: 'img/satellite-phone.jpg',
//        description: 'Stay connected with a reliable satellite phone.'
//    },
//    {
//        id: 8,
//        name: 'Weather Monitoring System',
//        price: 1500,
//        image: 'img/weather-monitoring-system.jpg',
//        description: 'Advanced system for real-time weather data and forecasts.'
//    },
//    {
//        id: 9,
//        name: 'High-Gain Maritime Antenna',
//        price: 1100,
//        image: staticBaseUrl + 'img/maritime-antenna-hg.jpg',
//        description: 'Enhanced signal reception for critical maritime communications.'
//    },
//    {
//        id: 10,
//        name: 'Compact Satellite Terminal',
//        price: 2500,
//        image: staticBaseUrl + 'img/satellite-terminal.jpg',
//        description: 'Small form factor satellite terminal for easy installation.'
//    },
//    {
//        id: 11,
//        name: 'Marine GPS Receiver',
//        price: 400,
//        image: 'img/marine-gps-receiver.jpg',
//        description: 'Accurate GPS tracking and navigation for marine vessels.'
//    },
//    {
//        id: 12,
//        name: 'Ocean Data Buoy',
//        price: 5000,
//        image: staticBaseUrl + 'img/ocean-data-buoy.jpg',
//        description: 'Collects vital oceanographic data for research and monitoring.'
//    },
//    {
//        id: 13,
//        name: 'Fish Finder Sonar',
//        price: 350,
//        image: staticBaseUrl + 'img/fish-finder-sonar.jpg',
//        description: 'Advanced sonar technology to locate fish schools.'
//    },
//    {
//        id: 14,
//        name: 'Wind Speed Sensor',
//        price: 180,
//        image: staticBaseUrl + 'img/wind-speed-sensor.jpg',
//        description: 'Reliable sensor for measuring wind speed and direction on deck.'
//    }
//];

let products = [];

function fetchProducts() {
    fetch('/api/products/')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(data);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Function to render products on the product page
function renderProducts(products) {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden');
        productElement.innerHTML = `
            <img src="${staticBaseUrl}${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">${product.name}</h3>
                <p class="text-gray-700 mb-4">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-lg font-bold text-green-600">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productList.appendChild(productElement);
    });

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.productId);
            addToCart(productId);
        });
    });
}

// Function to get the current cart from localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Function to save the cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add a product to the cart
function addToCart(productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);

    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart(cart);
        alert(`${product.name} added to cart!`);
        updateCartCount(); // Update cart count in the navbar immediately
    }
}

// Function to render the cart on the cart page
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');

    if (!cartItemsContainer || !cartTotalContainer) return; // Only run on cart page

    const cart = getCart();
    cartItemsContainer.innerHTML = ''; // Clear existing cart items

    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-700 text-center">Your cart is empty.</p>';
        cartTotalContainer.innerHTML = '';
        updateCartCount(); // Update cart count even if empty
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('flex', 'flex-col', 'sm:flex-row', 'justify-between', 'items-start', 'sm:items-center', 'border-b', 'pb-4', 'py-2', 'gap-4');
        itemElement.innerHTML = `
            <div class="flex items-center flex-grow">
                <img src="${staticBaseUrl + item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded mr-4">
                <div>
                    <h3 class="text-lg font-semibold text-gray-900">${item.name}</h3>
                    <p class="text-gray-600">Price: $${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="flex items-center space-x-2">
                    <button class="decrement-item-btn bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition-colors" data-product-id="${item.id}">-</button>
                    <span class="text-gray-900 min-w-[2rem] text-center">${item.quantity}</span>
                    <button class="increment-item-btn bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition-colors" data-product-id="${item.id}">+</button>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-lg font-bold text-green-600">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item-btn text-red-600 hover:text-red-800 transition-colors" data-product-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotalContainer.innerHTML = `Total: $${total.toFixed(2)}`;

    // Add event listeners after rendering
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.productId);
            removeFromCart(productId);
        });
    });

    document.querySelectorAll('.increment-item-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.productId);
            changeQuantity(productId, 1);
        });
    });

    document.querySelectorAll('.decrement-item-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.productId);
            changeQuantity(productId, -1);
        });
    });

    updateCartCount(); // Update cart count after rendering cart
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart(); // Re-render cart after removal
}

function removeAllFromCart() {
    saveCart([]);
    renderCart();
}

// Function to change the quantity of an item in the cart
function changeQuantity(productId, quantityChange) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += quantityChange;

        // Remove item if quantity drops to 0 or less
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart(cart);
        renderCart(); // Re-render cart after quantity change
    }
}

// Function to update the cart count in the navbar
function updateCartCount() {
    const cart = getCart();
    const cartCountSpan = document.getElementById('cart-count');
    const mobileCartCountSpan = document.getElementById('mobile-cart-count');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCountSpan) {
        cartCountSpan.textContent = totalItems;
    }
    if (mobileCartCountSpan) {
        mobileCartCountSpan.textContent = totalItems;
    }
}

// Initialize product-related functionality when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial rendering based on the current page
    if (document.getElementById('product-list')) {
//        renderProducts();
        fetchProducts();
    } else if (document.getElementById('cart-items')) {
        renderCart();
    }

    // Update cart count on every page load
    updateCartCount();
}); 