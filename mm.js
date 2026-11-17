
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", function() {
    mainNav.classList.toggle("show");
});

document.querySelectorAll("#mainNav a").forEach(function(link) {
    link.addEventListener("click", function() {
        mainNav.classList.remove("show");
    });
});

const dateElement = document.getElementById("currentDate");

const today = new Date();

dateElement.textContent = today.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
}).toUpperCase();

const filterButtons = document.querySelectorAll(".filter-btn");
const newsCards = document.querySelectorAll(".news-card");

function filterNews(category) {
    let count = 0;

    newsCards.forEach(function(card) {
        const cardCategory = card.dataset.category;

        if (category === "all" || cardCategory === category) {
            card.style.display = "block";
            count++;
        } else {
            card.style.display = "none";
        }
    });

    document.getElementById("noResult").style.display =
        count === 0 ? "block" : "none";
}

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterNews(button.dataset.filter);
    });
});

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function searchNews() {
    const keyword = searchInput.value.trim().toLowerCase();
    let count = 0;

    filterButtons.forEach(function(btn) {
        btn.classList.remove("active");
    });

    document.querySelector('[data-filter="all"]').classList.add("active");

    newsCards.forEach(function(card) {
        const title = card.dataset.title.toLowerCase();
        const description = card.dataset.description.toLowerCase();

        if (title.includes(keyword) || description.includes(keyword)) {
            card.style.display = "block";
            count++;
        } else {
            card.style.display = "none";
        }
    });

    document.getElementById("noResult").style.display =
        count === 0 ? "block" : "none";
}

searchBtn.addEventListener("click", searchNews);

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchNews();
    }
});

const articleModal = document.getElementById("articleModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

document.querySelectorAll(".article-card").forEach(function(card) {
    card.addEventListener("click", function() {
        modalImage.src = card.dataset.image;
        modalTitle.textContent = card.dataset.title;
        modalDescription.textContent = card.dataset.description;

        articleModal.classList.add("show");
        document.body.style.overflow = "hidden";
    });
});

function closeArticle() {
    articleModal.classList.remove("show");
    document.body.style.overflow = "";
}

document.getElementById("closeArticle").addEventListener(
    "click",
    closeArticle
);

articleModal.addEventListener("click", function(event) {
    if (event.target === articleModal) {
        closeArticle();
    }
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

document.querySelectorAll(".gallery-image").forEach(function(img) {
    img.addEventListener("click", function() {
        lightboxImage.src = img.src;
        lightbox.classList.add("show");
        document.body.style.overflow = "hidden";
    });
});

function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
}

document.getElementById("closeLightbox").addEventListener(
    "click",
    closeLightbox
);

lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeArticle();
        closeLightbox();
    }
});

const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(function(element) {
    revealObserver.observe(element);
});

window.addEventListener("load", function() {
    document.body.classList.add("loaded");
});
