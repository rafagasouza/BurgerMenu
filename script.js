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
               
                    <button class="removeBtn" data-name="${item.name}">Remover</button>
               
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
cartItems.addEventListener('click', (evento)=>{
   if(evento.target.classList.contains('removeBtn')){
        const name = evento.target.getAttribute("data-name")
        removeCartItem(name)
    }   
})

function removeCartItem(name){
    const index = cart.findIndex(item => item.name === name)

    if(index !== -1){
        const item = cart[index]
        
        if(item.quantity > 1){
            item.quantity -= 1
            updateCartModal()
            return
        }

        cart.splice(index, 1)
        updateCartModal()
    }
}

addressInput.addEventListener('input', (ev)=>{
    let inputValue = ev.target.value 
    if(inputValue !== ''){
        addressWarn.classList.add('hidden')
        addressInput.classList.add('border-red-500')
    }
})
//finalizar pedido
checkoutBtn.addEventListener('click', ()=>{
    const isOpen = checkRestaurantOpen()
    if(!isOpen){
      Toastify(
        {
            text: "Estamos fechados no momento",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #FF7F50, #FF6347)",
            },
        }
      ).showToast()
        return
    }

    if(cart.length === 0) return

    if(addressInput.value === ''){
        addressWarn.classList.remove('hidden')
        return
    }

    const cartItems = cart.map((item)=>{
        return ( `${item.name} - Quantidade: (${item.quantity} Preço: R$${item.price})\n`)
       
    }).join("")
    
    const message = encodeURIComponent(cartItems)
    const phone = "11985338850"

    window.open(`https:/wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

    cart.length = 0
    updateCartModal()
    addressInput.value = ''
})

//Verificando a hora
function checkRestaurantOpen(){
    const data = new Date()
    const hora = data.getHours()
    return hora >= 18 && hora < 22 
}

const spanItem = document.getElementById('date-span')
const isOpen = checkRestaurantOpen()

if(isOpen){
    spanItem.classList.remove('bg-red-500')
    spanItem.classList.add('bg-green-500')
}else{
    spanItem.classList.remove('bg-green-600')
    spanItem.classList.add('bg-red-500')
}