import gsap from 'gsap'
import { products } from '../data/products.js'

export function renderProductDetail(container, productId) {
  const product = products[productId]

  if (!product) {
    container.innerHTML = `
      <header class="flex justify-between items-center p-6 border-b border-earth-dark">
        <h1 class="text-3xl font-bold text-gold">Gilded Resin Boutique</h1>
        <button id="cart-toggle" class="text-2xl hover:text-gold">🛒</button>
      </header>
      <main class="max-w-6xl mx-auto px-6 py-12">
        <p class="text-earth-dark">Product not found.</p>
      </main>
    `
    return
  }

  container.innerHTML = `
    <header class="flex justify-between items-center p-6 border-b border-earth-dark">
      <h1 class="text-3xl font-bold text-gold">Gilded Resin Boutique</h1>
      <button id="cart-toggle" class="text-2xl hover:text-gold">🛒</button>
    </header>

    <main class="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-16">
      
      <!-- Image Gallery -->
      <section class="space-y-6">
        ${product.images
          .map(
            (img) => `
          <img
            src="${img}"
            alt="${product.name}"
            loading="lazy"
            class="product-image rounded shadow-lg opacity-0 scale-95"
          />
        `
          )
          .join('')}
      </section>

      <!-- Product Info -->
      <section>
        <h2 class="text-3xl font-semibold mb-4">${product.name}</h2>
        <p class="text-earth-dark mb-6 leading-relaxed">
          ${product.description}
        </p>

        <p class="text-2xl text-gold font-semibold mb-8">$${product.price}</p>

        <button
          id="add-to-cart"
          class="bg-gold text-earth-light px-8 py-4 rounded font-semibold hover:opacity-90 transition"
        >
          Add to Cart
        </button>

        <!-- Accordion -->
        <div class="mt-10 border-t border-earth-dark pt-6">
          <button
            id="accordion-toggle"
            class="w-full flex justify-between items-center text-left font-semibold"
          >
            Shipping & Returns
            <span id="accordion-icon" class="text-xl">+</span>
          </button>

          <div
            id="accordion-content"
            class="overflow-hidden max-h-0 transition-all duration-300 mt-4"
          >
            <p class="text-earth-dark leading-relaxed">
              ${product.shipping || 'Free returns within 30 days.'}
            </p>
          </div>
        </div>
      </section>
    </main>
  `
  // GSAP image fade + scale animation
  gsap.to('.product-image', {
    opacity: 1,
    scale: 1,
    stagger: 0.25,
    duration: 0.9,
    ease: 'power2.out',
  })

  // Image fallback for product gallery (use JS handler instead of inline onerror)
  const largeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect fill="#f3f4f6" width="100%" height="100%"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#4b5563" font-size="20">Image unavailable</text></svg>`
  const largeFallback = 'data:image/svg+xml;utf8,' + encodeURIComponent(largeSvg)
  container.querySelectorAll('.product-image').forEach(img => img.addEventListener('error', () => (img.src = largeFallback)))

  // Accordion logic
  const toggle = container.querySelector('#accordion-toggle')
  const content = container.querySelector('#accordion-content')
  const icon = container.querySelector('#accordion-icon')

  toggle.addEventListener('click', () => {
    if (content.style.maxHeight) {
      content.style.maxHeight = null
      icon.textContent = '+'
    } else {
      content.style.maxHeight = content.scrollHeight + 'px'
      icon.textContent = '−'
    }
  })

  // Add to cart logic
  const addBtn = container.querySelector('#add-to-cart')
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const existing = cart.find(i => i.id === productId)
      if (existing) {
        existing.qty += 1
      } else {
        cart.push({ id: productId, name: product.name, price: product.price, qty: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(cart))
      window.dispatchEvent(new CustomEvent('cartUpdated'))
      const original = addBtn.textContent
      addBtn.textContent = 'Added ✓'
      addBtn.disabled = true
      setTimeout(() => {
        addBtn.textContent = original
        addBtn.disabled = false
      }, 1200)
    })
  }
}
