const cartModal = document.getElementById('cart-modal')
const cartBtn = document.getElementById('cart-btn')
const menu = document.getElementById('menu')
const itemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModal = document.getElementById('close-modal-btn')
const cartCounter = document.getElementById('cart-count')
const addressInput = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')

let cart = []
//Abre o modal
cartBtn.addEventListener("click", ()=>{
    updateCartModal()
    cartModal.style.display = "flex"
    
})

// Fecha o modal
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})
closeModal.addEventListener("click", ()=>{
    cartModal.style.display = "none"
})

//Evento ao clicar no botão
menu.addEventListener("click", function(event){
    //checa o clique do botão
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
    
        //adciona ao carrinho
        addtoCart(name, price)
    }
})

function addtoCart(name, price){
    const existing = cart.find(item => item.name === name)

    if(existing){
        //se o item ja existe, aumenta apenas um
        existing.quantity += 1
        return;
    }else{
        cart.push({
            name, price,
            quantity: 1,
        })
    }

    

    updateCartModal()
}

function updateCartModal(){
    itemsContainer.innerHTML = ''
    let total = 0

    cart.forEach(item => {
        const cartElement = document.createElement("div")
        cartElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col')

        cartElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p class="">Quantidade: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>

            <button class="cursor-pointer pr-1 remove-item-btn" data-name="${item.name}">Remover</button>
        </div>
        `

        total += item.price * item.quantity
        
        itemsContainer.appendChild(cartElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL" 
    })

    cartCounter.innerHTML = "( "+cart.length+" )"
}

itemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-item-btn")){
        const name = event.target.getAttribute("data-name")
        removeItems(name)
    }
})

function removeItems(name){
    const index = cart.findIndex(item => item.name === name)

    if(index !== -1){
        const item = cart[index]
        if(item.quantity > 1){
            item.quantity -=1
            updateCartModal()
            return;
        }

        cart.splice(index, 1)
        updateCartModal()
    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

checkoutBtn.addEventListener("click", ()=>{
    const isOpen = OpenRestaurant()
    if(!isOpen){
        Toastify({
            text: "Restaurante fechado no momento!",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#ef4444",
        },
        }).showToast()
        return;
    }

    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove('hidden')
        addressInput.classList.add("border-red-500")
        return;
    }

    const cartItems = cart.map((item) => {
        return (
            ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
        )
    }).join("")
    const message = encodeURIComponent(cartItems)
    phone = "67996123728"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")
    cart = []
    updateCartModal();
})

function OpenRestaurant(){
    const data = new Date()
    const hora = data.getHours()
    return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = OpenRestaurant();

if(isOpen){
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}