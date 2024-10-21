// Mendapatkan elemen-elemen dari DOM
const productList = document.getElementById('productList');
const addProductForm = document.getElementById('addProductForm');
const productCount = document.getElementById('productCount');
const commentCount = document.getElementById('commentCount');
const productImage = document.getElementById('productImage');
const productImagePreview = document.getElementById('productImagePreview');

let products = [
    {
        name: "Sneakers",
        price: "100.000.000",
        image: "images/sneakers.jpg",
        comments: [
            { name: "Budi", text: "Harganya sangat terjangkau untuk kualitas yang ditawarkan." },
            { name: "Rina", text: "Produk ini sangat bagus!" }
        ]
    },
    {
        name: "Kacamata hitam",
        price: "15.000.000",
        image: "images/kacamata.jpg",
        comments: [
            { name: "Joko", text: "Pengiriman cepat, sangat puas!" },
            { name: "Lay", text: "Produk ini sangat bagus!" }
        ]
    },
    {
        name: "Jaket",
        price: "50.000",
        image: "images/jaket.jpg",
        comments: [
            { name: "Lisa", text: "Sangat suka dengan produk ini, kualitas luar biasa!" },
            { name: "Pengki", text: "Produk ini sangat bagus!" }
        ]
    },
    {
        name: "Kaos",
        price: "20.000.000",
        image: "images/baju.jpg",
        comments: [
            { name: "Komeng", text: "Harganya sangat terjangkau untuk kualitas yang ditawarkan." },
            { name: "Kuple", text: "Produk ini sangat bagus!" }
        ]
    }
];

// Fungsi untuk merender daftar produk
function renderProducts() {
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-index', index);
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Harga: ${product.price}</p>
            <button class="editProduct">Edit</button>
            <button class="deleteProduct">Hapus</button>
            <div class="comments-section">
                <h4>Komentar Pelanggan</h4>
                <div class="comments-list">
                    ${product.comments.map((comment, commentIndex) => `
                        <div class="comment">
                            <p><strong>${comment.name}:</strong> ${comment.text}</p>
                            <button class="deleteComment" data-product-index="${index}" data-comment-index="${commentIndex}">Hapus</button>
                        </div>
                    `).join('')}
                </div>
                <form class="commentForm">
                    <input type="text" class="customerName" placeholder="Nama Anda" required>
                    <textarea class="customerComment" placeholder="Tulis komentar..." required></textarea>
                    <button type="submit">Kirim Komentar</button>
                </form>
            </div>
        `;
        productList.appendChild(productCard);
    });
    productCount.innerText = products.length;
    commentCount.innerText = products.reduce((total, product) => total + product.comments.length, 0);
}

// Event listener untuk menambah produk
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProduct = {
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        image: URL.createObjectURL(productImage.files[0]), // Gunakan URL.createObjectURL untuk preview gambar
        comments: []
    };
    products.push(newProduct);
    addProductForm.reset();
    productImagePreview.style.display = 'none'; // Sembunyikan preview setelah produk ditambahkan
    renderProducts();
});

// Menampilkan preview gambar
productImage.addEventListener('change', () => {
    const file = productImage.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            productImagePreview.src = e.target.result;
            productImagePreview.style.display = 'block'; // Tampilkan preview
        }
        reader.readAsDataURL(file);
    }
});

// Event listener untuk produk (edit, hapus, dan komentar)
productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteProduct')) {
        const index = e.target.closest('.product-card').getAttribute('data-index');
        products.splice(index, 1);
        renderProducts();
    } else if (e.target.classList.contains('editProduct')) {
        const index = e.target.closest('.product-card').getAttribute('data-index');
        const product = products[index];
        const name = prompt("Edit Nama Produk:", product.name);
        const price = prompt("Edit Harga Produk:", product.price);
        const image = prompt("Edit URL Gambar Produk:", product.image);
        if (name && price && image) {
            products[index] = { ...product, name, price, image };
            renderProducts();
        }
    } else if (e.target.classList.contains('deleteComment')) {
        const productIndex = e.target.getAttribute('data-product-index');
        const commentIndex = e.target.getAttribute('data-comment-index');
        products[productIndex].comments.splice(commentIndex, 1);
        renderProducts();
    }
});

// Event listener untuk mengirim komentar
productList.addEventListener('submit', (e) => {
    if (e.target.classList.contains('commentForm')) {
        e.preventDefault();
        const productIndex = e.target.closest('.product-card').getAttribute('data-index');
        const customerName = e.target.querySelector('.customerName').value;
        const customerComment = e.target.querySelector('.customerComment').value;

        products[productIndex].comments.push({ name: customerName, text: customerComment });
        e.target.reset();
        renderProducts();
    }
});

// Render produk pertama kali saat halaman dimuat
renderProducts();
