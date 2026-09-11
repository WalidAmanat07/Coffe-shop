// Cart State
let cart = [];

// DOM Elements
const cartToggleBtn = document.getElementById('cartToggleBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

const orderModal = document.getElementById('orderModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const orderForm = document.getElementById('orderForm');
const modalTotal = document.getElementById('modalTotal');

// Open/Close Cart Sidebar
cartToggleBtn.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
});

const closeCart = () => {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
};

closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Add item to cart
function addToCart(title, price) {
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ title, price, quantity: 1 });
    }
    updateCartUI();
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
}

// Adjust Item Quantity
function changeQuantity(title, delta) {
    const item = cart.find(item => item.title === title);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.title !== title);
        }
    }
    updateCartUI();
}

// Update Cart Rendering and Totals
function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is currently empty.</p>';
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div>
                    <strong>${item.title}</strong><br>
                    <small>$${item.price.toFixed(2)}</small>
                </div>
                <div class="item-qty-controls">
                    <button onclick="changeQuantity('${item.title}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.title}', 1)">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartCount.textContent = totalCount;
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    modalTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

// Modal Toggle Logic
checkoutBtn.addEventListener('click', () => {
    closeCart();
    orderModal.classList.add('open');
});

closeModalBtn.addEventListener('click', () => {
    orderModal.classList.remove('open');
});

// Handle Order Submission
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    
    alert(`Thank you for your order, ${name}! Your coffee will be prepared shortly.`);
    
    // Reset Cart and Form
    cart = [];
    updateCartUI();
    orderForm.reset();
    orderModal.classList.remove('open');
});
