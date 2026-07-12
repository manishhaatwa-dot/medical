/* ==========================================
   OPNORA MEDICAL STORE
   MAIN.JS
   PART 1
========================================== */

/* ===========================
MOBILE MENU
=========================== */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        mobileMenu.classList.toggle("show");

    });

}

/* ===========================
BACK TO TOP
=========================== */

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            topBtn.style.display = "flex";

        } else {

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ===========================
LOCAL STORAGE
=========================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ===========================
SAVE CART
=========================== */

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

}

/* ===========================
UPDATE CART COUNT
=========================== */

function updateCartCount() {

    const cartCount = document.querySelector(".cart-icon span");

    if (!cartCount) return;

    let total = 0;

    cart.forEach(item => {

        total += item.qty;

    });

    cartCount.innerText = total;

}

updateCartCount();
/* ===========================
ADD TO CART
=========================== */

const addCartButtons = document.querySelectorAll(".add-cart-btn");

addCartButtons.forEach((button) => {

    button.addEventListener("click", function () {

        const card = this.closest(".product-card");

        if (!card) return;

        const name = card.querySelector("h3").textContent.trim();

        const price = card.querySelector(".price").textContent.trim();

        const image = card.querySelector("img").getAttribute("src");

        let existing = cart.find(item => item.name === name);

        if (existing) {

            existing.qty++;

        } else {

            cart.push({

                name: name,

                price: price,

                image: image,

                qty: 1

            });

        }

        saveCart();

        alert(name + " Added To Cart");

    });

});
/* ===========================
LOAD CART
=========================== */

function loadCart() {

    const cartContainer = document.getElementById("cartItems");

    if (!cartContainer) return;

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <h2 style="width:100%;text-align:center;padding:40px;">
                Your Cart Is Empty
            </h2>
        `;

        return;

    }

    cart.forEach((item, index) => {

        cartContainer.innerHTML += `

        <div class="product-card">

            <div class="product-image">

                <img src="${item.image}" alt="${item.name}">

            </div>

            <div class="product-content">

                <h3>${item.name}</h3>

                <div class="product-meta">

                    <span class="price">${item.price}</span>

                </div>

                <p>Quantity : ${item.qty}</p>

                <div class="product-actions">

                    <button class="add-cart-btn"
                    onclick="removeItem(${index})">

                        Remove

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}
/* ===========================
REMOVE ITEM
=========================== */

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    loadCart();

}

/* ===========================
UPDATE TOTAL
=========================== */

function updateTotal() {

    const subTotal = document.getElementById("subTotal");
    const grandTotal = document.getElementById("grandTotal");

    if (!subTotal || !grandTotal) return;

    let total = 0;

    cart.forEach(item => {

        const price = parseInt(item.price.replace("?", "").replace(",", ""));

        total += price * item.qty;

    });

    subTotal.innerText = "?" + total;
    grandTotal.innerText = "?" + total;

}

/* ===========================
PAGE LOAD
=========================== */

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    loadCart();

    updateTotal();

});
