// Sample data for products
let products = {
  1: {
    title: "Product 1",
    description: "This is the detailed description of Product 1.",
    image: "https://via.placeholder.com/500",
    price: "$99.99",
  },
  2: {
    title: "Product 2",
    description: "This is the detailed description of Product 2.",
    image: "https://via.placeholder.com/500",
    price: "$89.99",
  },
  3: {
    title: "Product 3",
    description: "This is the detailed description of Product 3.",
    image: "https://via.placeholder.com/500",
    price: "$79.99",
  },
  // Add more products as needed
};

// Load existing products dynamically in ../../index.html
if (document.getElementById("product-list")) {
  loadProducts();
}

//show the listing
function loadProducts() {
  loadProductsFromLocalStorage();
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = ""; // Clear existing content
  Object.keys(products).forEach((productId) => {
    const product = products[productId];

    const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadowCard">
                    <img src="${product.image}" class="card-img-top" alt="${
      product.title
    }">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description.substring(
                          0,
                          50
                        )}...</p>
                        <a href="./assets/pages/viewProduct.html?product=${productId}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        `;

    productContainer.innerHTML += productCard;
  });
}

// Handle product details in product-details.html
if (document.getElementById("product-details")) {
  individualProductDetails();
}

//for show individual details of product
function individualProductDetails() {
  loadProductsFromLocalStorage();
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("product");
  console.log(productId);
  const productDetailsContainer = document.getElementById("product-details");
  console.log(products, "this is from individuals");
  if (products[productId]) {
    const product = products[productId];

    const productDetails = `
            <div class="col-md-6">
                <img src="${product.image}" class="img-fluid" alt="${product.title}">
            </div>
            <div class="col-md-6 mt-md-0 mt-4">
                <h1>${product.title}</h1>
                <p>${product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <a href="../../index.html" class="btn btn-secondary">Back to Products</a>
            </div>
        `;
    productDetailsContainer.innerHTML = productDetails;
  } else {
    const notFoundMessage = `
            <div class="col-12 text-center">
                <h1>Product Not Found</h1>
                <p>Sorry, the product you're looking for doesn't exist.</p>
                <a href="../../index.html" class="btn btn-secondary">Back to Products</a>
            </div>
        `;
    productDetailsContainer.innerHTML = notFoundMessage;
  }
}

// Handle Add Product Form submission in add-product.html
if (document.getElementById("add-product-form")) {
  document
    .getElementById("add-product-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form values
      const title = document.getElementById("product-title").value;
      const description = document.getElementById("product-description").value;
      const price = document.getElementById("product-price").value;
      const imageFile = document.getElementById("product-image").files[0];

      // Validate image file
      if (!imageFile) {
        alert("Please select an image for the product.");
        return;
      }

      // Read image file
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target.result;

        // Generate a new product ID
        const newProductId = Object.keys(products).length + 1;

        // Add new product to products object
        products[newProductId] = {
          title: title,
          description: description,
          image: imageUrl,
          price: price,
        };

        // Save the product data (this would normally be sent to a backend server)
        saveProductsToLocalStorage();

        // Redirect to homepage
        window.location.href = "../../index.html";
      };
      reader.readAsDataURL(imageFile);
    });
}

// Save products to localStorage (as a placeholder for a database)
function saveProductsToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

// Load products from localStorage on page load
function loadProductsFromLocalStorage() {
  const savedProducts = localStorage.getItem("products");
  if (savedProducts) {
    products = JSON.parse(savedProducts);
    console.log(products, "aya");
    return;
  }
  return;
}

// Initialize products from localStorage
// loadProductsFromLocalStorage();

// Search Functionality
if (document.getElementById("search")) {
  document.getElementById("search").addEventListener("keyup", function () {
    let searchQuery = this.value.toLowerCase();
    let products = document.querySelectorAll("#product-list .col-md-4");

    products.forEach(function (product) {
      let title = product
        .querySelector(".card-title")
        .textContent.toLowerCase();
      if (title.includes(searchQuery)) {
        product.style.display = "";
      } else {
        product.style.display = "none";
      }
    });
  });
}
