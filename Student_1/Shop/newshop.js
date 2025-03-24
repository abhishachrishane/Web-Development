document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector("#cart-icon");
    const cart = document.querySelector(".cart");
    const closeCart = document.querySelector("#close-cart");

    cartIcon.onclick = () => {
        cart.classList.add("active");
    }

    closeCart.onclick = () => {
        cart.classList.remove("active");
    }

    ready();
});

function ready() {
    const removeCartButtons = document.getElementsByClassName('cart-remove');
    for (let button of removeCartButtons) {
        button.addEventListener('click', removeCartItem);
    }

    const quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let input of quantityInputs) {
        input.addEventListener('change', quantityChanged);
    }

    const addToCartButtons = document.getElementsByClassName('addto-cart');
    for (let button of addToCartButtons) {
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('buy-button')[0].addEventListener('click', buyClicked);
}

function buyClicked() {
    alert('Please fill this form');
    const cartContent = document.querySelector('.cart-content');
    while (cartContent.firstChild) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();

    document.getElementById("buy-button").addEventListener("click", function(){
        window.location.href ="checkout.html";
    });
}

function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.cart-box').remove();
    updateTotal();
}

function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function addToCartClicked(event) {
    const button = event.target;
    const shopItem = button.closest('.product-box');
    const title = shopItem.querySelector('.product-title').innerText;
    const price = shopItem.querySelector('.price').innerText;
    const imageSrc = shopItem.querySelector('.product-image').src;
    addItemToCart(title, price, imageSrc);
    updateTotal();
}

function addItemToCart(title, price, imageSrc) {
    const cartItems = document.querySelector('.cart-content');
    const cartItemNames = cartItems.getElementsByClassName('cart-product-title');
    for (let item of cartItemNames) {
        if (item.innerText === title) {
            alert('This item is already added to the cart');
            return;
        }
    }

    const cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');
    const cartBoxContent = `
        <img src="${imageSrc}" alt="" class="cart1">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    `;
    cartBox.innerHTML = cartBoxContent;
    cartItems.append(cartBox);
    cartBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
    cartBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);
    updateTotal();
}

function updateTotal() {
    const cartContent = document.querySelector('.cart-content');
    const cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;

    for (let cartBox of cartBoxes) {
        const priceElement = cartBox.querySelector('.cart-price');
        const quantityElement = cartBox.querySelector('.cart-quantity');
        
        const price = parseFloat(priceElement.innerText.replace('Rs.', '').trim());
        const quantity = parseInt(quantityElement.value);
        
        if (!isNaN(price) && !isNaN(quantity)) {
            total += price * quantity;
        }
    }

    total = Math.round(total * 100) / 100;
    document.querySelector('.total-price').innerText = 'Rs.' + total.toFixed(2);
}


