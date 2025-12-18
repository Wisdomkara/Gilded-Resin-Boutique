export function renderHome(container) {
  container.innerHTML = `
    <header class="flex justify-between items-center p-6 border-b border-earth-dark">
      <h1 class="text-3xl font-bold text-gold">Gilded Resin Boutique</h1>
      <button id="cart-toggle" aria-label="Open Cart" class="text-earth-dark hover:text-gold text-2xl">
        🛒
      </button>
    </header>

    <section class="hero relative h-[400px] bg-earth-light flex items-center justify-center mb-12">
      <img
        src="https://plus.unsplash.com/premium_photo-1666900050100-9c88b6a6736b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmxvcmFsJTIwcHJlc2VydmF0aW9uJTIwYW5kJTIwcmVzaW4lMjBhcnQufGVufDB8fDB8fHww"
        alt="Hero Image"
        class="w-full h-full object-cover opacity-90 rounded"
      />
      <h2 class="absolute text-4xl font-serif text-gold font-bold drop-shadow-lg">
        Minimalist Luxury Resin Art
      </h2>
    </section>

    <section class="featured-categories px-6 mb-12 max-w-7xl mx-auto">
      <h3 class="text-2xl mb-6 text-earth-dark font-semibold">Featured Categories</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="category-card bg-earth-light p-4 rounded shadow-md hover:shadow-lg cursor-pointer text-center transition">
          <img
            src="https://images.unsplash.com/photo-1692713279495-ed07ae3e2fcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmxvcmFsJTIwcHJlc2VydmF0aW9uJTIwYW5kJTIwcmVzaW4lMjBhcnQufGVufDB8fDB8fHww"
            alt="Floral Preservation"
            class="rounded mb-3 mx-auto"
          />
          <h4 class="font-semibold text-earth-dark">Floral Preservation</h4>
        </div>
        <div class="category-card bg-earth-light p-4 rounded shadow-md hover:shadow-lg cursor-pointer text-center transition">
          <img
            src="https://images.unsplash.com/photo-1676740347436-50ff9eab13dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZsb3JhbCUyMHByZXNlcnZhdGlvbiUyMGFuZCUyMHJlc2luJTIwYXJ0LnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Resin Jewelry"
            class="rounded mb-3 mx-auto"
          />
          <h4 class="font-semibold text-earth-dark">Resin Jewelry</h4>
        </div>
        <div class="category-card bg-earth-light p-4 rounded shadow-md hover:shadow-lg cursor-pointer text-center transition">
          <img
            src="https://images.unsplash.com/photo-1701230334077-7bca57f10ec9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZsb3JhbCUyMHByZXNlcnZhdGlvbiUyMGFuZCUyMHJlc2luJTIwYXJ0LnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Home Decor"
            class="rounded mb-3 mx-auto"
          />
          <h4 class="font-semibold text-earth-dark">Home Decor</h4>
        </div>
      </div>
    </section>

    <section class="new-arrivals px-6 mb-12 max-w-7xl mx-auto">
      <h3 class="text-2xl mb-6 text-earth-dark font-semibold">New Arrivals</h3>
      <div id="new-arrivals-grid" class="grid grid-cols-1 md:grid-cols-3 gap-8"></div>
    </section>
  `

  // Dummy products for New Arrivals
  const products = [
    {
      id: '1',
      name: 'Preserved Peony Paperweight',
      price: 85,
      image: 'https://images.unsplash.com/photo-1753187356608-b972392329f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZsb3JhbCUyMHByZXNlcnZhdGlvbiUyMGFuZCUyMHJlc2luJTIwYXJ0LnxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: '2',
      name: 'Golden Resin Ring',
      price: 120,
      image: 'https://images.unsplash.com/photo-1676740347436-50ff9eab13dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZsb3JhbCUyMHByZXNlcnZhdGlvbiUyMGFuZCUyMHJlc2luJTIwYXJ0LnxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: '3',
      name: 'Dried Rose Coaster Set',
      price: 65,
      image: 'https://images.unsplash.com/photo-1668514191100-9d3121c208e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZsb3JhbCUyMHByZXNlcnZhdGlvbiUyMGFuZCUyMHJlc2luJTIwYXJ0LnxlbnwwfHwwfHx8MA%3D%3D',
    },
  ]

  const grid = container.querySelector('#new-arrivals-grid')

  products.forEach(({ id, name, price, image }) => {
    const card = document.createElement('a')
    card.href = `#product-${id}`
    card.className =
      'block bg-earth-light rounded shadow hover:shadow-lg overflow-hidden transform transition hover:scale-[1.03]'
    card.innerHTML = `
      <img src="${image}" alt="${name}" class="w-full h-60 object-cover" />
      <div class="p-4">
        <h4 class="font-semibold text-earth-dark mb-1">${name}</h4>
        <p class="text-gold font-semibold">$${price}</p>
      </div>
    `
    grid.appendChild(card)
  })
}
