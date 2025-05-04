// تسجيل الدخول
function adminLogin() {
  const email = "admin@example.com"; // غيرها
  const password = "yourStrongPassword"; // غيرها
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById('admin-panel').style.display = 'block';
    })
    .catch(error => alert(error.message));
}

// إضافة منتج
function addProduct() {
  const product = {
    name: document.getElementById('product-name').value,
    price: document.getElementById('product-price').value,
    category: document.getElementById('product-category').value,
    image: document.getElementById('product-image').value,
    description: document.getElementById('product-description').value
  };

  firebase.database().ref('products').push(product)
    .then(() => alert('تمت الإضافة بنجاح!'));
}

// تحديث الموقع تلقائياً
firebase.database().ref('products').on('value', (snapshot) => {
  const products = snapshot.val();
  renderProducts(products); // دالة لعرض المنتجات
});