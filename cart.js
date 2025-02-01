document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartBtn = document.querySelector(".cart-btn");
    const cartOverlay = document.createElement("div");
    cartOverlay.classList.add("cart-overlay");
    document.body.appendChild(cartOverlay);
    
    cartOverlay.innerHTML = `
        <div class="cart">
            <h2>🛍️ Seu Carrinho</h2>
            <ul class="cart-items"></ul>
            <p class="cart-total">Total: R$ 0,00</p>
            <div class="cart-buttons">
                <button class="checkout-btn">Finalizar Compra ✅</button>
                <button class="close-cart">❌ Fechar</button>
            </div>
        </div>
    `;
    
    cartOverlay.style.position = "fixed";
    cartOverlay.style.top = "0";
    cartOverlay.style.left = "0";
    cartOverlay.style.width = "100%";
    cartOverlay.style.height = "100%";
    cartOverlay.style.background = "rgba(0, 0, 0, 0.5)";
    cartOverlay.style.display = "none";
    cartOverlay.style.justifyContent = "center";
    cartOverlay.style.alignItems = "center";
    
    const cartContainer = cartOverlay.querySelector(".cart");
    cartContainer.style.background = "white";
    cartContainer.style.padding = "20px";
    cartContainer.style.borderRadius = "10px";
    cartContainer.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.3)";
    cartContainer.style.width = "350px";
    cartContainer.style.textAlign = "center";
    
    const cartItemsList = cartOverlay.querySelector(".cart-items");
    const cartTotal = cartOverlay.querySelector(".cart-total");
    const checkoutBtn = cartOverlay.querySelector(".checkout-btn");
    const closeCartBtn = cartOverlay.querySelector(".close-cart");
    
    document.querySelectorAll(".buy-button").forEach(button => {
        button.addEventListener("click", (e) => {
            const productCard = e.target.closest(".product-card");
            const name = productCard.dataset.name || productCard.querySelector("h3").innerText;
            const price = parseFloat(productCard.dataset.price || productCard.querySelector(".price").innerText.replace("R$ ", "").replace(",", "."));
            
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCart();
        });
    });
    
    cartBtn.addEventListener("click", () => {
        cartOverlay.style.display = "flex";
    });
    
    closeCartBtn.addEventListener("click", () => {
        cartOverlay.style.display = "none";
    });
    
    function updateCart() {
        cartItemsList.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartItemsList.innerHTML += `
                <li style="list-style: none; display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #ddd;">
                    <span>${item.name} x${item.quantity}</span>
                    <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item" data-index="${index}" style="background: none; border: none; color: red; font-size: 16px; cursor: pointer;">❌</button>
                </li>
            `;
        });
        cartTotal.innerText = `Total: R$ ${total.toFixed(2)}`;
        document.querySelector(".cart-count").innerText = cart.length;
        addRemoveEventListeners();
    }
    
    function addRemoveEventListeners() {
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
    
    checkoutBtn.addEventListener("click", () => {
        let message = "Olá, gostaria de finalizar a compra com os seguintes itens:\n\n";
        cart.forEach(item => {
            message += `- ${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
        });
        message += `\nTotal: R$ ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`;
        const whatsappUrl = `https://wa.me/558487704819?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    });
});
