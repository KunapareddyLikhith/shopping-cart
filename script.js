const products = [
    { id: 1, name: "Product A", price: 300,image: "./1.jpg" },
    { id: 2, name: "Product B", price: 450, image:"./2.jpeg" },
    { id: 3, name: "Product C", price: 150, image:"./3.jpeg" }
];

let cart = {};

const productList = document.getElementById("product-list");
products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML =`
        <img src="${product.image}" class="product-img" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;


    productList.appendChild(card);
});

function addToCart(id) {
    if (cart[id]) {
        cart[id].qty += 1;
    } else {
        const product = products.find(p => p.id === id);
        cart[id] = { ...product, qty: 1 };
    }
    updateCart();
}

function updateCart() {
    const emptyMsg = document.getElementById("empty-cart");
    emptyMsg.style.display = Object.keys(cart).length === 0 ? "block" : "none";

    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = "";

    let subtotal = 0;

    Object.values(cart).forEach(item => {
        subtotal += item.price * item.qty;

        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";

        itemDiv.innerHTML = `
            <div class="cart-item-row">
                <img src="${item.image}" class="cart-thumb">
        
                <div class="cart-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>

                    <div class="qty-controls">
                        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                        ${item.qty}
                        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                </div>

                <button class="remove-btn" onclick="removeItem(${item.id})">❌</button>
            </div>
            <hr>
        `;


        cartItemsDiv.appendChild(itemDiv);
    });

    let shipping = subtotal > 0 ? 50 : 0;
    let total = subtotal + shipping;

    document.getElementById("subtotal").innerText = subtotal;
    document.getElementById("shipping").innerText = shipping;
    document.getElementById("total").innerText = total;

    document.getElementById("cart-count").innerText =
        Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
}

function changeQty(id, change) {
    cart[id].qty += change;

    if (cart[id].qty <= 0) {
        delete cart[id];
    }

    updateCart();
}

function removeItem(id) {
    delete cart[id];
    updateCart();
}

document.getElementById("checkout-btn").addEventListener("click", () => {
    document.getElementById("popup").style.display = "flex";
});

function closePopup() {
    document.getElementById("popup").style.display = "none";
}




