import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '../data/products.js'

gsap.registerPlugin(ScrollTrigger)

export function renderProductListing(container) {
  container.innerHTML = `
    <header class="flex justify-between items-center p-6 border-b border-earth-dark">
      <h1 class="text-3xl font-bold text-gold">Our Collection</h1>
      <button id="cart-toggle" class="text-2xl hover:text-gold">🛒</button>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-10">
      <!-- Filters (UI only) -->
      <section class="mb-10 flex gap-4 flex-wrap">
        <select class="border border-earth-dark px-4 py-2 rounded bg-transparent" disabled>
          <option>Category</option>
        </select>
        <select class="border border-earth-dark px-4 py-2 rounded bg-transparent" disabled>
          <option>Sort by</option>
        </select>
      </section>

      <!-- Product Grid -->
      <section
        id="product-grid"
        class="grid grid-cols-1 md:grid-cols-3 gap-10"
      ></section>
    </main>
  `

  const productsList = Object.values(products)

  const grid = container.querySelector('#product-grid')

  productsList.forEach((product) => {
    const card = document.createElement('a')
    card.href = `#product-${product.id}`
    card.className =
      'product-card bg-earth-light rounded shadow overflow-hidden hover:shadow-lg transform transition hover:scale-[1.03] opacity-0'

    card.innerHTML = `
      <img
        src="${product.images[0]}"
        alt="${product.name}"
        loading="lazy"
        class="w-full h-72 object-cover"
      />
      <div class="p-5">
        <h3 class="text-lg font-semibold mb-1">${product.name}</h3>
        <p class="text-sm opacity-70 mb-2">${product.short}</p>
        <p class="text-gold font-semibold">$${product.price}</p>
      </div>
    `

    grid.appendChild(card)
  })

  // Image fallback for failed network images
  const smallSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500"><rect fill="#f3f4f6" width="100%" height="100%"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#4b5563" font-size="18">Image unavailable</text></svg>`
  const smallFallback = 'data:image/svg+xml;utf8,' + encodeURIComponent(smallSvg)
  grid.querySelectorAll('img').forEach(img => img.addEventListener('error', () => (img.src = smallFallback)))

  // GSAP scroll reveal animation
  gsap.to('.product-card', {
    scrollTrigger: {
      trigger: '#product-grid',
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power2.out',
    y: 30,
  })
}
