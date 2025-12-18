
import { renderHome } from './pages/home.js'
import { renderProductListing } from './pages/productListing.js'
import { renderProductDetail } from './pages/productDetail.js'
import { setupCartSidebar } from './components/cartSidebar.js'


const app=document.getElementById('app')

function router(){
    const hash=window.location.hash || '#home'
    app.innerHTML=''

    if(hash==='#home'){
        renderHome(app)
    } else if(hash==='#cart'){
        renderCart(app)
    } else if(hash.startsWith('#products')){
        renderProductListing(app)
    } else if(hash.startsWith('#product-')){
        renderProductDetail(app, hash.replace('#product-', ''))
    } else{
        renderHome(app)
    }
    setupCartSidebar()
}
window.addEventListener('hashchange', router)
window.addEventListener('load', router)