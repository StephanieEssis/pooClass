class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCart {
    constructor() {
        this.items = new Map();
    }

    addItem(product) {
        if (this.items.has(product.id)) {
            this.items.get(product.id).quantity++;
        } else {
            this.items.set(product.id, { product, quantity: 1 });
        }
        this.updateDOM();
    }

    removeItem(productId) {
        if (this.items.has(productId)) {
            let item = this.items.get(productId);
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                this.items.delete(productId);
            }
        }
        this.updateDOM();
    }

    deleteItem(productId) {
        this.items.delete(productId);
        this.updateDOM();
    }

    getTotal() {
        return [...this.items.values()].reduce((total, item) => total + item.product.price * item.quantity, 0);
    }

    updateDOM() {
        document.querySelector('.total').textContent = `${this.getTotal().toFixed(2)} $`;
        
        document.querySelectorAll('.card-body').forEach(card => {
            const id = Number(card.dataset.id);
            if (!isNaN(id)) { 
                const quantitySpan = card.querySelector('.quantity');
                const minusButton = card.querySelector('.fa-minus-circle');
                
                const quantity = this.items.get(id)?.quantity || 0;
                quantitySpan.textContent = quantity;

                // Désactiver le bouton "-" si la quantité est 0
                if (quantity === 0) {
                    minusButton.classList.add('disabled');
                } else {
                    minusButton.classList.remove('disabled');
                }
            }
        });
    }
}

const cart = new ShoppingCart();

document.querySelectorAll('.card-body').forEach(card => {
    const id = Number(card.dataset.id);
    if (isNaN(id)) return;

    const name = card.querySelector('.card-title').textContent;
    const price = parseFloat(card.querySelector('.unit-price').textContent.replace('$', ''));
    const product = new Product(id, name, price);

    card.querySelector('.fa-plus-circle').addEventListener('click', () => cart.addItem(product));
    card.querySelector('.fa-minus-circle').addEventListener('click', () => cart.removeItem(id));
    
    // Suppression totale du produit
    card.querySelector('.fa-trash-alt').addEventListener('click', () => cart.deleteItem(id));

    // Favoris (like)
    card.querySelector('.fa-heart').addEventListener('click', function () {
        this.classList.toggle('liked');
    });
});

cart.updateDOM();
