let order = [];
let totalPrice = 0;
let users = []; // Mock user data for login/signup

// Function to add items to the order
function addToOrder(item, price) {
  order.push({ item, price });
  totalPrice += price;
  displayOrder();
}

// Display order details
function displayOrder() {
  const orderList = document.getElementById('orderList');
  const totalAmount = document.getElementById('totalAmount');
  const discountMessage = document.getElementById('discountMessage');

  orderList.innerHTML = '';
  order.forEach(orderItem => {
    const li = document.createElement('li');
    li.textContent = `${orderItem.item} - Rs. ${orderItem.price}`;
    orderList.appendChild(li);
  });

  let discount = 0;
  if (totalPrice > 3000) {
    discount = totalPrice * 0.2;
    discountMessage.textContent = `You received a 20% discount of Rs. ${discount.toFixed(2)}!`;
  } else if (totalPrice > 2000) {
    discount = totalPrice * 0.1;
    discountMessage.textContent = `You received a 10% discount of Rs. ${discount.toFixed(2)}! Use code DISCOUNT10 on your next purchase.`;
  } else {
    discountMessage.textContent = '';
  }

  const finalAmount = totalPrice - discount;
  totalAmount.textContent = finalAmount.toFixed(2);
}

// Function to handle placing orders
function placeOrder() {
  alert(`Your total order amount is Rs. ${document.getElementById('totalAmount').textContent}. Thank you for your order!`);
}

// Mock functions for login/signin
function openLogin() {
  let email = prompt("Enter your email:");
  let password = prompt("Enter your password:");
  let user = users.find(u => u.email === email && u.password === password);
  if (user) {
    alert("Login Successful!");
  } else {
    alert("Invalid credentials!");
  }
}

function openSignIn() {
  let email = prompt("Enter your email:");
  let password = prompt("Enter your password:");
  users.push({ email, password });
  alert("Sign Up Successful!");
}

// JavaScript for Menu Toggle
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('show');
}



// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Toggle Menu
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('show');
}

// Open and Close Modals
function openLogin() {
  document.getElementById('loginModal').style.display = 'block';
}

function openSignIn() {
  document.getElementById('signInModal').style.display = 'block';
}

function openAccount() {
  const user = auth.currentUser;
  if (user) {
    document.getElementById('userDetails').innerText = `Logged in as: ${user.email}`;
    document.getElementById('accountModal').style.display = 'block';
  } else {
    alert('Please log in first.');
  }
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Google Authentication
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      alert('Logged in successfully!');
      closeModal('loginModal');
    })
    .catch(error => {
      console.error('Error during login:', error);
    });
}

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      alert('Signed in successfully!');
      closeModal('signInModal');
    })
    .catch(error => {
      console.error('Error during sign-in:', error);
    });
}

// Logout
function logout() {
  auth.signOut()
    .then(() => {
      alert('Logged out successfully!');
      closeModal('accountModal');
    })
    .catch(error => {
      console.error('Error during logout:', error);
    });
}
