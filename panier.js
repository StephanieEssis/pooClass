// Function to update the total price
function updateTotalPrice() {
    let total = 0;
    document.querySelectorAll('.card-body').forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        const price = parseFloat(item.querySelector('.unit-price').textContent.replace('$', ''));
        total += quantity * price;
    });
    document.querySelector('.total').textContent = `${total.toFixed(2)} $`;
}

// Event listeners for quantity buttons
document.querySelectorAll('.fa-plus-circle, .fa-minus-circle').forEach(button => {
    button.addEventListener('click', function() {
        const quantitySpan = this.parentElement.querySelector('.quantity');
        let quantity = parseInt(quantitySpan.textContent);
        
        if (this.classList.contains('fa-plus-circle')) {
            quantity++;
        } else if (this.classList.contains('fa-minus-circle') && quantity > 0) {
            quantity--;
        }
        
        quantitySpan.textContent = quantity;
        updateTotalPrice();
    });
});

// Event listener for remove button
document.querySelectorAll('.fa-trash-alt').forEach(button => {
    button.addEventListener('click', function() {
        this.closest('.card-body').remove();
        updateTotalPrice();
    });
});

// Event listener for like button
document.querySelectorAll('.fa-heart').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('liked');
        this.style.color = this.classList.contains('liked') ? 'red' : 'black';
    });
});

// Initial total price calculation
updateTotalPrice();
