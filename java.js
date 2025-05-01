// بيانات المسؤول
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123" // غيّر هذه إلى كلمة مرور قوية
};

// تحقق من تسجيل الدخول
if(!localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'login.html';
}

// بيانات المنتجات
let products = JSON.parse(localStorage.getItem('products')) || [];

// عناصر DOM
const productsTable = document.getElementById('products-table').querySelector('tbody');
const productForm = document.getElementById('product-form');
const productModal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const logoutBtn = document.getElementById('logout-btn');
const addProductBtn = document.getElementById('add-product-btn');
const cancelBtn = document.getElementById('cancel-btn');

// عرض المنتجات في الجدول
function renderProducts() {
    productsTable.innerHTML = products.map(product => `
        <tr>
            <td><img src="${product.image}" width="50" height="50" style="object-fit: contain;"></td>
            <td>${product.name}</td>
            <td>${product.price} IQD</td>
            <td>${product.category === 'games' ? 'ألعاب' : 'إلكترونيات'}</td>
            <td>
                <button onclick="editProduct(${product.id})">تعديل</button>
                <button onclick="deleteProduct(${product.id})" style="background-color: #ff4444;">حذف</button>
            </td>
        </tr>
    `).join('');
}

// فتح نافذة إضافة منتج
addProductBtn.addEventListener('click', () => {
    productForm.reset();
    document.getElementById('product-id').value = '';
    modalTitle.textContent = 'إضافة منتج جديد';
    productModal.style.display = 'flex';
});

// إغلاق النافذة
cancelBtn.addEventListener('click', () => {
    productModal.style.display = 'none';
});

// حفظ المنتج (إضافة/تعديل)
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const productData = {
        id: document.getElementById('product-id').value || Date.now(),
        name: document.getElementById('product-name').value,
        price: parseInt(document.getElementById('product-price').value),
        category: document.getElementById('product-category').value,
        image: document.getElementById('product-image').value,
        description: document.getElementById('product-description').value
    };
    
    if(document.getElementById('product-id').value) {
        // تعديل المنتج
        const index = products.findIndex(p => p.id == productData.id);
        products[index] = productData;
    } else {
        // إضافة منتج جديد
        products.push(productData);
    }
    
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
    productModal.style.display = 'none';
});

// تعديل المنتج
window.editProduct = function(id) {
    const product = products.find(p => p.id == id);
    if(product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-description').value = product.description || '';
        
        modalTitle.textContent = 'تعديل المنتج';
        productModal.style.display = 'flex';
    }
};

// حذف المنتج
window.deleteProduct = function(id) {
    if(confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        products = products.filter(p => p.id != id);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
    }
};

// تسجيل الخروج
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
});

// التهيئة الأولية
renderProducts();