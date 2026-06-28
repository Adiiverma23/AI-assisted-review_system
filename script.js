// Page Navigation
function showPage(pageId) {
    let pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}

// Dark Mode
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

// Fetch Reviews from Backend
async function loadReviews() {
    try {
        const response = await fetch("http://localhost:5000/api/reviews");

        if (!response.ok) {
            throw new Error("Failed to fetch reviews");
        }

        const reviews = await response.json();

        console.log(reviews);

        const dashboard = document.getElementById("dashboard");

        dashboard.innerHTML = `
            <h2>Dashboard</h2>
            <p>Reviews fetched from Backend API</p>
        `;

        reviews.forEach(review => {
            dashboard.innerHTML += `
                <div class="review-card">
                    <h3>${review.guest}</h3>
                    <p><strong>Rating:</strong> ${review.rating}</p>
                    <p>${review.review}</p>
                    <p><strong>Sentiment:</strong> ${review.sentiment}</p>
                    <hr>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);

        document.getElementById("dashboard").innerHTML = `
            <h2>Dashboard</h2>
            <p style="color:red;">Unable to connect to backend.</p>
        `;
    }
}

// Load reviews when page opens
window.onload = loadReviews;