// Array to store products
const products = [
    { id: 1, name: "T-shirt", price: 29.99, image: "https://images.bewakoof.com/t640/men-s-navy-blue-venom-graphic-printed-oversized-t-shirt-651227-1735623006-1.gif" },
    { id: 2, name: "HODDIE", price: 49.99, image: "https://images.bewakoof.com/t640/men-s-black-deathstroke-graphic-printed-oversized-t-shirt-568082-1737106438-1.jpg" },
    { id: 3, name: "TSHIRT", price: 89.99, image: "https://images.bewakoof.com/t1080/keep-listening-full-sleeve-t-shirt-465256-1669184838-1.jpg" },
    { id: 4, name: "BLACK-TSHIRT", price: 69.99, image: "https://images.bewakoof.com/t640/men-s-black-vibes-graphic-printed-t-shirt-298518-1720094654-1.jpg" },
    { id: 5, name: "TSHIRT", price: 39.99, image: "https://images.bewakoof.com/t640/men-s-white-oversized-t-shirt-439420-1734427665-1.jpg" },
    { id: 7, name: "JACKET", price: 19.99, image: "https://images.bewakoof.com/t640/men-s-baby-lavender-serenity-graphic-printed-oversized-t-shirt-645977-1735904396-1.jpg" },
    {id: 8, name: "JACKET", price: 19.99, image: "https://images.bewakoof.com/t640/men-s-black-zipper-sweatshirt-363696-1734417639-1.jpg" },
    {id: 9, name: "JACKET", price: 19.99, image: "https://images.bewakoof.com/t640/men-s-brown-its-monday-again-graphic-printed-oversized-t-shirt-585808-1716887378-1.jpg" },
    { id: 10, name: "JACKET", price: 19.99, image: "https://images.bewakoof.com/t640/men-s-black-nasa-graphic-printed-oversized-bomber-jacket-642558-1734342774-1.jpg" },
    {id: 11, name: "JACKET", price: 19.99, image: "https://images.bewakoof.com/t640/men-s-black-printed-contrast-sleeve-oversized-bomber-jacket-498981-1736146885-1.jpg" },
    {id: 12, name: "JACKET", price: 19.99, image: "https://images.bewakoof.com/t640/men-s-black-printed-contrast-sleeve-oversized-bomber-jacket-498981-1736146885-1.jpg" },
    {id: 13, name: "JACKET", price: 19.99, image: "https://images.bewakoof.com/t640/men-s-black-error-typography-oversized-bomber-jacket-498953-1707215656-1.jpg" },
    {id: 14, name: "JACKET", price: 19.99, image: "https://images.bewakoof.com/t640/men-s-black-zipper-sweatshirt-363696-1734417639-1.jpg" },
    {id: 15, name: "JACKET", price: 19.99, image: "https://images.bewakoof.com/t640/men-s-black-zipper-sweatshirt-363696-1734417639-1.jpg" },
    {id: 16, name: "JACKET", price: 19.99, image: "https://images.bewakoof.com/t640/men-s-black-zipper-sweatshirt-363696-1734417639-1.jpg" },
    {id: 17, name: "JACKET", price: 19.99, image: "https://images.bewakoof.com/t640/men-s-black-zipper-sweatshirt-363696-1734417639-1.jpg" },
    {id: 18, name: "JACKET", price: 19.99, image: "https://images.bewakoof.com/t640/men-s-black-zipper-sweatshirt-363696-1734417639-1.jpg" },
    {id: 6, name: "JACKET", price: 19.99, image: "https://images.bewakoof.com/t640/men-s-black-zipper-sweatshirt-363696-1734417639-1.jpg" },

];

// Array to store items in the cart
let cartItems = [];

// Function to toggle the cart modal visibility
function toggleCartModal() {
    const modal = document.getElementById('cartModal');
    modal.style.display = modal.style.display === 'none' || modal.style.display === '' ? 'block' : 'none';
}

// Function to update the cart modal contents
function updateCart() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartItemCount = document.getElementById('cartItemCount');
    cartItemsContainer.innerHTML = ''; // Clear current cart items

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">$${item.price}</span>
            </div>
            <button class="remove-item" onclick="removeItemFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update the cart item count
    cartItemCount.textContent = `(${cartItems.length})`;
}

// Function to add an item to the cart
function addToCart(productId) {
    // Find the product by ID
    const product = products.find(item => item.id === productId);

    if (product) {
        // Add the product to the cart
        cartItems.push(product);
        updateCart();

        // Show success popup
        const successPopup = document.getElementById('successPopup');
        successPopup.style.display = 'block';
        setTimeout(() => successPopup.style.display = 'none', 2000); // Hide after 2 seconds
    }
}

// Function to remove an item from the cart
function removeItemFromCart(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    updateCart();
}

// Function to load products dynamically
function loadProducts() {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Call the function to load products when the page loads
window.onload = function() {
    loadProducts();
};
