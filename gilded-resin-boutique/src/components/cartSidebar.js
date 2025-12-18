export function setupCartSidebar() {
  // Prevent duplicate sidebar
  if (document.getElementById('cart-sidebar')) return

  const sidebar = document.createElement('aside')
  sidebar.id = 'cart-sidebar'
  sidebar.className = `
    fixed top-0 right-0 h-full w-80 bg-earth-light
    shadow-xl transform translate-x-full
    transition-transform duration-300 z-50 flex flex-col
  `

  sidebar.innerHTML = `
    <header class="p-6 border-b border-earth-dark flex justify-between items-center">
      <h2 class="text-xl font-semibold">Your Cart</h2>
      <button
        id="cart-close"
        class="text-2xl hover:text-gold"
        aria-label="Close cart"
      >
        &times;
      </button>
    </header>

    <section class="flex-1 p-6 text-earth-dark overflow-y-auto">
      <p class="opacity-70">Your cart is currently empty.</p>
    </section>

    <footer class="p-6 border-t border-earth-dark">
      <a
        href="#cart"
        class="w-full block text-center bg-gold text-earth-light py-3 rounded font-semibold opacity-50 cursor-not-allowed"
        id="view-cart-btn"
      >
        View Cart
      </a>
    </footer>
  `

  document.body.appendChild(sidebar)

  function renderCart() {
    const section = sidebar.querySelector('section')
    const viewCartBtn = sidebar.querySelector('#view-cart-btn')
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    if (!cart.length) {
      section.innerHTML = `<p class="opacity-70">Your cart is currently empty.</p>`
      viewCartBtn.classList.add('opacity-50','cursor-not-allowed')
      viewCartBtn.style.pointerEvents = 'none'
      return
    }

    // Show summary in sidebar with count
    const itemCount = cart.reduce((s, i) => s + i.qty, 0)
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
    section.innerHTML = `
      <p class="text-sm opacity-70 mb-2">Items: ${itemCount}</p>
      <p class="text-xl font-semibold">Total: $${total.toFixed(2)}</p>
      <p class="text-xs opacity-70 mt-4">View cart details on the full cart page →</p>
    `
    viewCartBtn.classList.remove('opacity-50','cursor-not-allowed')
    viewCartBtn.style.pointerEvents = 'auto'
  }

  function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const count = cart.reduce((s, i) => s + i.qty, 0)
    document.querySelectorAll('#cart-toggle').forEach(btn => {
      let badge = btn.querySelector('.cart-badge')
      if (!badge) {
        badge = document.createElement('span')
        badge.className = 'cart-badge inline-flex items-center justify-center ml-2 bg-gold text-earth-dark text-xs rounded-full w-5 h-5'
        badge.style.fontSize = '11px'
        badge.style.lineHeight = '1'
        btn.appendChild(badge)
      }
      badge.textContent = count
      badge.style.display = count ? 'inline-flex' : 'none'
      btn.style.cursor = 'pointer'
    })
  }

  // Ensure cart renders and badge updates initially
  renderCart()
  updateCartBadge()

  // Open cart (delegated click handler that works for child elements too)
  document.addEventListener('click', (e) => {
    const toggle = e.target && (e.target.closest ? e.target.closest('#cart-toggle') : null)
    if (toggle) {
      renderCart()
      updateCartBadge()
      sidebar.style.transform = 'translateX(0)'
    }
  })

  // Handle clicks on the View Cart control (delegated so it works for anchors and child elements)
  document.addEventListener('click', (e) => {
    const view = e.target && (e.target.closest ? e.target.closest('#view-cart-btn') : null)
    if (view) {
      // If the button is disabled (pointer-events none), do nothing
      const style = window.getComputedStyle(view)
      if (style.pointerEvents === 'none') return
      e.preventDefault()
      // close sidebar then navigate to cart page
      sidebar.style.transform = 'translateX(100%)'
      window.location.hash = '#cart'
    }
  })

  // Re-render cart and badge when other parts of the app update it
  window.addEventListener('cartUpdated', () => {
    renderCart()
    updateCartBadge()
  })

  // Update badge on navigation so newly-rendered headers get badges
  window.addEventListener('hashchange', updateCartBadge)

  // Close cart
  sidebar.querySelector('#cart-close').addEventListener('click', () => {
    sidebar.style.transform = 'translateX(100%)'
  })
}
