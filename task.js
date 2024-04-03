const products = document.querySelectorAll('.product')
const cart__products = document.querySelector('.cart__products')

if (localStorage.getItem('cart__products') != null) {
    cart__products.innerHTML = localStorage.getItem('cart__products')
}

function cartAdd(id, imgSrc, count, anim_start_left, anim_start_top) {
    cart_product_check = cart__products.querySelector('.cart__product[data-id="' + id + '"]')
    if (cart_product_check != null) {

        const cur_count = cart_product_check.querySelector('.cart__product-count')
        cur_count.innerText = Number(cur_count.innerText) + Number(count)
    } else if (cart_product_check == null) {

        div = document.createElement('div')
        div.classList.add('cart__product')
        div.dataset.id = id

        img = document.createElement('img')
        img.classList.add('cart__product-image')
        img.src = imgSrc

        div__div = document.createElement('div')
        div__div.classList.add('cart__product-count')
        div__div.innerText = Number(count)
        // div__div.innerText = 1

        a__cart_remove = document.createElement('a')
        a__cart_remove.href = '#'
        a__cart_remove.classList.add('cart__remove')
        a__cart_remove.innerHTML = '&times;'

        div.appendChild(img)
        div.appendChild(div__div)
        div.appendChild(a__cart_remove)
        cart__products.appendChild(div)
    }
    localStorage.setItem('cart__products', cart__products.innerHTML)
}

cart__products.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('cart__remove')) {
        e.target.parentElement.remove()
        localStorage.setItem('cart__products', cart__products.innerHTML)
    }
})

products.forEach((product) => {
        const product__quantity_value = product.querySelector('.product__quantity-value')
        product.querySelector('.product__quantity-control_dec').addEventListener('click', () => {
            if (Number(product__quantity_value.innerText > 1)) {
                product__quantity_value.innerText = Number(product__quantity_value.innerText) - 1
            }
        })
        product.querySelector('.product__quantity-control_inc').addEventListener('click', () => {
            product__quantity_value.innerText = Number(product__quantity_value.innerText) + 1
        })

        product.querySelector('.product__add').addEventListener('click', () => {
            cartAdd(
                product.dataset.id,
                product.querySelector('.product__image').src,
                product__quantity_value.innerText,
                product.querySelector('.product__image').getBoundingClientRect().x,
                product.querySelector('.product__image').getBoundingClientRect().y
            )

        })
    }
)

