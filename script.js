const mockUsers = [
    { id: 1, name: 'Rohit Joshi', email: 'joshirohit2122@gmail.com'},
    { id: 2, name: 'Shrine Ghimire', email: 'G_Shrine911@gmail.com'},
    { id: 3, name: 'Aryan Bhandara', email: 'B_Aryan1211@gmail.com'},
];

const mockMovies = [
    { 
        id: 1, 
        title: 'The Matrix', 
        genre: 'Action', 
        year: 1999,
        poster: 'https://marketplace.canva.com/EAFTl0ixW_k/1/0/1131w/canva-black-white-minimal-alone-movie-poster-YZ-0GJ13Nc8.jpg'
    },
    { 
        id: 2, 
        title: 'Inception', 
        genre: 'Sci-Fi', 
        year: 2010,
        poster: 'https://posterhouse.org/wp-content/uploads/2021/05/moonlight_0.jpg'
    },
    { 
        id: 3, 
        title: 'The Matrix', 
        genre: 'Action', 
        year: 1999,
        poster: 'https://marketplace.canva.com/EAFTl0ixW_k/1/0/1131w/canva-black-white-minimal-alone-movie-poster-YZ-0GJ13Nc8.jpg'
    },
    { 
        id: 4, 
        title: 'Inception', 
        genre: 'Sci-Fi', 
        year: 2010,
        poster: 'https://posterhouse.org/wp-content/uploads/2021/05/moonlight_0.jpg'
    }
];

// DOM Elements
const navLinks = document.querySelectorAll('.nav-links li');
const pages = document.querySelectorAll('.page-content');
const userModal = document.getElementById('userModal');
const movieModal = document.getElementById('movieModal');
const addUserBtn = document.getElementById('addUserBtn');
const addMovieBtn = document.getElementById('addMovieBtn');
const userForm = document.getElementById('userForm');
const movieForm = document.getElementById('movieForm');
const usersTableBody = document.getElementById('usersTableBody');
const moviesGrid = document.querySelector('.movies-grid');

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        
        // Show corresponding page
        const pageName = link.getAttribute('data-page');
        pages.forEach(page => {
            if (page.id === pageName) {
                page.classList.remove('hidden');
            } else {
                page.classList.add('hidden');
            }
        });
    });
});

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Event Listeners
addUserBtn?.addEventListener('click', () => openModal('userModal'));
addMovieBtn?.addEventListener('click', () => openModal('movieModal'));

document.querySelectorAll('.cancel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        if (modal) {
            closeModal(modal.id);
        }
    });
});

// User Management
function renderUsers() {
    usersTableBody.innerHTML = mockUsers.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="editUser(${user.id})" class="edit-btn">Edit</button>
                <button onclick="deleteUser(${user.id})" class="delete-btn">Delete</button>
            </td>
        </tr>
    `).join('');
}

function addUser(userData) {
    mockUsers.push({
        id: mockUsers.length + 1,
        ...userData,
        status: 'Active'
    });
    renderUsers();
}

function editUser(userId) {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
        // Populate form with user data
        openModal('userModal');
        // Add logic to populate form
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const index = mockUsers.findIndex(u => u.id === userId);
        if (index !== -1) {
            mockUsers.splice(index, 1);
            renderUsers();
        }
    }
}

// Movie Management
function renderMovies() {
    moviesGrid.innerHTML = mockMovies.map(movie => `
        <div class="movie-card">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.genre} | ${movie.year}</p>
                <div class="movie-actions">
                    <button onclick="editMovie(${movie.id})" class="edit-btn">Edit</button>
                    <button onclick="deleteMovie(${movie.id})" class="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function addMovie(movieData) {
    mockMovies.push({
        id: mockMovies.length + 1,
        ...movieData
    });
    renderMovies();
}

function editMovie(movieId) {
    const movie = mockMovies.find(m => m.id === movieId);
    if (movie) {
        openModal('movieModal');
        // Add logic to populate form
    }
}

function deleteMovie(movieId) {
    if (confirm('Are you sure you want to delete this movie?')) {
        const index = mockMovies.findIndex(m => m.id === movieId);
        if (index !== -1) {
            mockMovies.splice(index, 1);
            renderMovies();
        }
    }
}

// Form Submissions
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(userForm);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    };
    addUser(userData);
    closeModal('userModal');
    userForm.reset();
});

movieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(movieForm);
    const movieData = {
        title: formData.get('title'),
        genre: formData.get('genre'),
        year: parseInt(formData.get('year')),
        poster: formData.get('poster')
    };
    addMovie(movieData);
    closeModal('movieModal');
    movieForm.reset();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderUsers();
    renderMovies();
});
