// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Carrito de Compras (simulado con localStorage)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartQuantityElement = document.getElementById('cart-quantity');
    const addToCartButtons = document.querySelectorAll('.agregar-al-carrito');

    // Función para actualizar la cantidad en el carrito en la interfaz
    const updateCartQuantity = () => {
        cartQuantityElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Agregar productos al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productoId;
            const productName = event.target.closest('.producto-card').querySelector('.producto-card__title').textContent;
            const productPrice = parseFloat(event.target.dataset.precio);

            // Buscar si el producto ya está en el carrito
            const existingCartItem = cart.find(item => item.id === productId);

            if (existingCartItem) {
                existingCartItem.quantity++;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Actualizar la cantidad del carrito en la interfaz
            updateCartQuantity();

            // (Opcional) Mostrar una notificación de que el producto se ha agregado
            alert(`${productName} agregado al carrito`);
        });
    });

    // Inicializar la cantidad del carrito al cargar la página
    updateCartQuantity();

    // Mostrar productos (EJEMPLO - Sustituir con datos reales desde una API)
    const productosGrid = document.querySelector('.productos-grid');
    if (productosGrid) {
        const productos = [
            { id: '4', nombre: 'Smartwatch X500', precio: 199.99, imagen: 'img/Smartwatch X500 realista.png' },
            { id: '5', nombre: 'Tablet Pro 10', precio: 349.99, imagen: 'img/Tablet Pro 10 realista.png' },
            { id: '6', nombre: 'Cargador Inalámbrico', precio: 29.99, imagen: 'img/Cargador Inalámbrico realista.png' }
        ];

        productos.forEach(producto => {
            const productoHTML = `
                    <div class="producto-card">
                        <a href="#" class="producto-card__link">
                            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-card__image">
                            <div class="producto-card__body">
                                <h3 class="producto-card__title">${producto.nombre}</h3>
                                <p class="producto-card__price">$${producto.precio.toFixed(2)}</p>
                                <button class="btn btn-primary agregar-al-carrito" data-producto-id="${producto.id}" data-precio="${producto.precio}">Agregar al carrito</button>
                            </div>
                        </a>
                    </div>
                `;
            productosGrid.innerHTML += productoHTML;
        });

        // Re-agregar los listeners después de agregar los productos dinámicamente
        const newAddToCartButtons = document.querySelectorAll('.agregar-al-carrito');
        newAddToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productoId;
                const productName = event.target.closest('.producto-card').querySelector('.producto-card__title').textContent;
                const productPrice = parseFloat(event.target.dataset.precio);

                const existingCartItem = cart.find(item => item.id === productId);
                if (existingCartItem) {
                    existingCartItem.quantity++;
                } else {
                    cart.push({
                        id: productId,
                        name: productName,
                        price: productPrice,
                        quantity: 1
                    });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartQuantity();
                alert(`${productName} agregado al carrito`);
            });
        });
    }
});