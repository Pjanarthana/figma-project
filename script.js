(function() {
    if (typeof window.productData === 'undefined') {
        window.productData = null;
    }

    async function fetchProductData() {
        try {
            const response = await axios.get('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json');
            window.productData = response.data.product;
            displayProductData();
            console.log(response);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    }

    function displayProductData() {
        if (!window.productData) {
            console.error('Product data is not available');
            return;
        }
    
        const vendorElement = document.getElementById('vendor');
        if (vendorElement) {
            vendorElement.textContent = window.productData.vendor;
        }
    
        const productTitleElement = document.getElementById('productTitle');
        if (productTitleElement) {
            productTitleElement.textContent = window.productData.title;
        }
    
        const currentPriceElement = document.getElementById('currentPrice');
        if (currentPriceElement) {
            currentPriceElement.textContent = `$${window.productData.price}`;
        }
    
        const discountElement = document.getElementById('discount');
        if (discountElement) {
            const discount = calculateDiscount(window.productData.price, window.productData.compare_at_price);
            discountElement.textContent = discount ? `${discount}% off` : '';
        }
    
        const comparePriceElement = document.getElementById('comparePrice');
        if (comparePriceElement) {
            comparePriceElement.textContent = window.productData.compare_at_price ? `$${window.productData.compare_at_price}` : '';
        }
    
        const productDescriptionElement = document.getElementById('productDescription');
        if (productDescriptionElement) {
            const descriptionHtml = window.productData.description;
            const parser = new DOMParser();
            const doc = parser.parseFromString(descriptionHtml, 'text/html');
            const textContent = doc.body.textContent;
            productDescriptionElement.textContent = textContent;
        }

        // Populate color options
        const colorOptions = document.getElementById('colorOptions');
        if (colorOptions) {
            colorOptions.innerHTML = '';
            const uniqueColors = [...new Set(window.productData.options.find(option => option.name === "Color").values)];
            uniqueColors.forEach((color, index) => {
                const colorOption = document.createElement('div');
                colorOption.className = 'color-option';
                colorOption.style.backgroundColor = color;
                colorOption.setAttribute('data-color', color);
                if (index === 0) colorOption.classList.add('selected');
                colorOption.onclick = () => selectColor(color);
                colorOptions.appendChild(colorOption);
            });
        }

        // Populate size options
        const sizeOptions = document.getElementById('sizeOptions');
        if (sizeOptions) {
            sizeOptions.innerHTML = '';
            const uniqueSizes = [...new Set(window.productData.options.find(option => option.name === "Size").values)];
            uniqueSizes.forEach((size, index) => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'size';
                input.value = size;
                input.checked = index === 0;
                input.addEventListener('change', updateVariant);
                label.appendChild(input);
                label.appendChild(document.createTextNode(size));
                sizeOptions.appendChild(label);
            });
        }

        updateVariant();
    }
    function selectColor(color) {
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.classList.toggle('selected', option.getAttribute('data-color') === color);
        });
        updateVariant();
    }

    function updateVariant() {
        const selectedColor = document.querySelector('.color-option.selected');
        const selectedSize = document.querySelector('input[name="size"]:checked');

        if (selectedColor && selectedSize) {
            const color = selectedColor.getAttribute('data-color');
            const size = selectedSize.value;
    
            if (window.productData && window.productData.variants) {
                const selectedVariant = window.productData.variants.find(variant => 
                    variant.option1 === color && variant.option2 === size
                );
    
                if (selectedVariant) {
                    document.getElementById('currentPrice').textContent = `$${selectedVariant.price}`;
                    document.getElementById('comparePrice').textContent = selectedVariant.compare_at_price ? `$${selectedVariant.compare_at_price}` : '';
                    
                    const discount = calculateDiscount(selectedVariant.price, selectedVariant.compare_at_price);
                    document.getElementById('discount').textContent = discount ? `${discount}% off` : '';
                }
            }
        }
    }

    function calculateDiscount(price, comparePrice) {
        if (price && comparePrice) {
            return Math.round((1 - price / comparePrice) * 100);
        }
        return 0;
    }

    function addToCart() {
        const selectedColor = document.querySelector('.color-option.selected');
        const selectedSize = document.querySelector('input[name="size"]:checked');
        const quantity = document.getElementById('quantity').value;
        const currentPrice = document.getElementById('currentPrice').textContent;
        const addToCartMessageElement = document.getElementById('addToCartMessage');
    
        if (selectedColor && selectedSize) {
            const color = selectedColor.getAttribute('data-color');
            const size = selectedSize.value;
    
            const message = `Added to cart: ${quantity} x ${window.productData.title} - ${color}, ${size} - ${currentPrice}`;
            
            if (addToCartMessageElement) {
                addToCartMessageElement.textContent = message;
                addToCartMessageElement.classList.remove('hidden');
                addToCartMessageElement.style.color = '#4CAF50'; // Green color for success
            }
    
            console.log('Added to cart:', { color, size, quantity, price: currentPrice });
        } else {
            if (addToCartMessageElement) {
                addToCartMessageElement.textContent = 'Please select both color and size before adding to cart.';
                addToCartMessageElement.classList.remove('hidden');
                addToCartMessageElement.style.color = '#FF0000'; // Red color for error
            }
            console.error('Please select color and size');
        }
    }
    const quantityInput = document.getElementById('quantity');
    const increaseQuantityButton = document.getElementById('increaseQuantity');
    const decreaseQuantityButton = document.getElementById('decreaseQuantity');

    if (increaseQuantityButton) {
        increaseQuantityButton.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    }

    if (decreaseQuantityButton) {
        decreaseQuantityButton.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }

    const addToCartButton = document.getElementById('addToCart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCart);
    }

    window.selectColor = selectColor;
    window.updateVariant = updateVariant;
    window.addToCart = addToCart;

    document.addEventListener('DOMContentLoaded', function() {
        fetchProductData();
    });
})();