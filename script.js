const cart_modal = document.getElementById('cart-modal')
const cartBtn = document.getElementById('cart-btn')
const menu = document.getElementById('menu')
const itemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModal = document.getElementById('close-modal-btn')
const cartCounter = document.getElementById('cart-count')
const addressInput = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')

cartBtn.addEventListener("click", ()=>{
    cart_modal.style.display = 'flex'
})