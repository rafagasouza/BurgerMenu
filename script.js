const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const cartItems = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeBtn = document.getElementById('close-modal-btn')
const cartCounter = document.getElementById('cart-counter')
const addressInput = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')

let cart = []

//OPEN MODAL
cartBtn.addEventListener('click', ()=>{
    cartModal.style.display = 'flex'
     updateCartModal()

})

//FECHAR MODAL
cartModal.addEventListener('click', (ev)=>{
    if(ev.target === cartModal){
        cartModal.style.display = 'none'
    }
})

closeBtn.addEventListener('click', ()=>{
      cartModal.style.display = 'none'
})

//ADICIONAR NO CARRINHO

menu.addEventListener('click', (ev)=>{
    let parentButton = ev.target.closest('.add-to-cart-btn')

    if(parentButton){
        const name = parentButton.getAttribute('data-name')
        const price = parseFloat(parentButton.getAttribute('data-price') )
        addToCart(name, price)
   

    
    }
})

//FUNÇÃO PARA ADICIONAR

function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quantity += 1
    }else{
        cart.push({
            name, 
            price,
           quantity: 1,
        })
    }
 

    updateCartModal()
}

//ATUALIZAR O CARRINHO

function updateCartModal(){
    cartItems.innerHTML = ''
    let total = 0

    cart.forEach(item => {
        const cartItemElement = document.createElement('div')
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
      
        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between mb-6">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd.:${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
               
                    <button classs="removeBtn" data-name="${item.name}">Remover</button>
               
            </div>
        
        `
        total += item.price * item.quantity
        cartItems.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    cartCounter.innerText = cart.length
}

//REMOVER ITEM DO CARRINHO
