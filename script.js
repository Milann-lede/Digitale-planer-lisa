import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// --- 3D Scene Implementation ---

const init3D = () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    // No background color set here to keep it transparent/match CSS, or set light fog

    // Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(4, 0, 22); // Moved camera right to match object, moved back to fit all

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Objects Group
    const group = new THREE.Group();
    scene.add(group);

    // Tablet Body
    const tabletGeometry = new RoundedBoxGeometry(8, 11, 0.4, 4, 0.2);
    const tabletMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        roughness: 0.4,
        metalness: 0.6
    });
    const tablet = new THREE.Mesh(tabletGeometry, tabletMaterial);
    group.add(tablet);


    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const screenTexture = textureLoader.load('planner-screen.png');
    screenTexture.colorSpace = THREE.SRGBColorSpace;

    // Screen
    const screenGeometry = new THREE.PlaneGeometry(7.5, 10.5);
    const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.21;
    group.add(screen);

    // Initial Rotation & Position
    group.rotation.x = 0.1;
    group.rotation.y = -0.3;
    group.position.x = 4; // Shift to the right

    // Animation Loop
    let time = 0;
    const animate = () => {
        requestAnimationFrame(animate);
        time += 0.01;

        // Floating effect
        group.position.y = Math.sin(time) * 0.2;

        renderer.render(scene, camera);
    };

    animate();

    // Scroll Interaction
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Rotate tablet slightly on scroll
        group.rotation.y = -0.3 + (scrollY * 0.001);
        group.rotation.x = 0.1 + (scrollY * 0.0005);
    });

    // Resize Handler
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    });
};

// --- UI Logic ---

const initUI = () => {
    // Accordion
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            const item = acc.parentElement;
            item.classList.toggle('active');
        });
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active'); // Optional: for icon animation
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // Smooth Scroll links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};

// --- Review System Logic (Supabase) ---

// ⚠️ REMES : Remplace ces valeurs par les tiennes depuis ton projet Supabase !
const SUPABASE_URL = 'https://cvxrsyznfgojlzclkzdn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Iz7YD8LwfWwC7X6dNFsKKA_ALpeOoUh';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const initReviews = async () => {
    const container = document.getElementById('reviews-container');
    const form = document.getElementById('review-form');

    // Render a single review card
    const createReviewCard = (review) => {
        const card = document.createElement('div');
        card.className = 'review-card';
        // Check if review has 'text' (legacy/local) or 'message' (API)
        const content = review.message || review.text;

        card.innerHTML = `
            <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <p class="review-text">"${content}"</p>
            <div class="reviewer">
                <strong>${review.name}</strong>
            </div>
        `;
        return card;
    };

    // Fetch reviews from Supabase
    const fetchReviews = async () => {
        const { data: reviews, error } = await supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erreur chargement avis:', error);
            // Fallback content if DB is empty or error
            container.innerHTML = '<p class="text-center">Impossible de charger les avis pour le moment.</p>';
            return;
        }

        container.innerHTML = '';
        if (reviews.length === 0) {
            container.innerHTML = '<p class="text-center">Soyez le premier à donner votre avis !</p>';
        } else {
            reviews.forEach(review => {
                container.appendChild(createReviewCard(review));
            });
        }
    };

    // Initial Load
    await fetchReviews();

    // Star Widget Logic (Reset & Interaction)
    const stars = document.querySelectorAll('#star-widget span');
    const ratingInput = document.getElementById('review-rating');
    let currentRating = 5;

    const updateStars = (rating) => {
        stars.forEach(s => {
            s.classList.toggle('selected', parseInt(s.dataset.value) <= rating);
        });
    };
    updateStars(5);

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const val = parseInt(star.dataset.value);
            stars.forEach(s => {
                s.classList.toggle('hovered', parseInt(s.dataset.value) <= val);
            });
        });
        star.addEventListener('mouseout', () => {
            stars.forEach(s => s.classList.remove('hovered'));
        });
        star.addEventListener('click', () => {
            currentRating = parseInt(star.dataset.value);
            ratingInput.value = currentRating;
            updateStars(currentRating);
        });
    });

    // Form Submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const newReview = {
                name: document.getElementById('review-name').value,
                email: document.getElementById('review-email').value, // Capture Email
                rating: parseInt(document.getElementById('review-rating').value),
                message: document.getElementById('review-text').value
            };

            // Send to Supabase
            const { error } = await supabase
                .from('reviews')
                .insert([{
                    name: newReview.name,
                    rating: newReview.rating,
                    message: newReview.message
                }]);

            if (error) {
                alert("Erreur lors de l'envoi : " + error.message);
            } else {
                // Send Email via EmailJS
                // Template params match the user's HTML template variables
                const templateParams = {
                    from_name: newReview.name,
                    email: newReview.email,
                    type_demande: "Nouvel Avis Client (" + newReview.rating + "/5)",
                    message: newReview.message
                };

                // Replace 'YOUR_service_ID' and 'YOUR_TEMPLATE_ID' with actual IDs from EmailJS Dashboard
                emailjs.send('service_vfboxlr', 'template_zj32fyu', templateParams)
                    .then(function (response) {
                        console.log('SUCCESS!', response.status, response.text);
                    }, function (error) {
                        console.log('FAILED...', error);
                    });

                // Show Success Modal instead of Alert
                const successModal = document.getElementById('review-success-modal');
                if (successModal) {
                    successModal.classList.remove('hidden');

                    // Close handler
                    const closeReviewBtn = document.getElementById('close-review-modal');
                    if (closeReviewBtn) {
                        closeReviewBtn.onclick = () => successModal.classList.add('hidden');
                    }
                    // Click outside to close
                    successModal.onclick = (e) => {
                        if (e.target === successModal) successModal.classList.add('hidden');
                    };
                }

                form.reset();
                currentRating = 5;
                ratingInput.value = 5;
                updateStars(5);
                fetchReviews(); // Refresh list
            }
        });
    }
};

// --- PayPal & Checkout Logic ---

const initPayPal = () => {
    // Modal Elements
    const modal = document.getElementById('checkout-modal');
    const closeBtn = document.querySelector('.close-modal');
    const checkoutBtns = document.querySelectorAll('.btn-checkout');
    const container = document.getElementById('paypal-button-container');

    // Remove old content and set up container
    if (container) {
        // Add a loading text initially
        container.innerHTML = '<div id="paypal-loading" style="text-align:center; padding: 20px;">Chargement du bouton PayPal...</div><div id="paypal-container-4QFBGY33UY4BE"></div>';

        // Function to render the button
        const renderButton = () => {
            document.getElementById('paypal-loading').innerText = "Initialisation...";
            try {
                // Remove strict eligibility check which might hide the button
                if (window.paypal && window.paypal.HostedButtons) {
                    window.paypal.HostedButtons({
                        hostedButtonId: "4QFBGY33UY4BE",
                    }).render("#paypal-container-4QFBGY33UY4BE")
                        .then(() => {
                            document.getElementById('paypal-loading').style.display = 'none';
                        });
                }
            } catch (e) {
                console.error("Error rendering Hosted Button:", e);
                // Fallback UI
                container.innerHTML = `
                    <div style="text-align: center;">
                        <a href="https://www.paypal.com/ncp/payment/4QFBGY33UY4BE" target="_blank" class="btn btn-primary" style="background:#003087; color:white;">
                            Payer 8,99 € (Lien Direct)
                        </a>
                    </div>
                `;
            }
        };

        // Poll every 500ms for up to 4 seconds
        let attempts = 0;
        const interval = setInterval(() => {
            attempts++;
            if (window.paypal && window.paypal.HostedButtons) {
                clearInterval(interval);
                renderButton();
            } else if (attempts > 8) { // 4 seconds
                clearInterval(interval);
                // Fallback if script fails to load
                container.innerHTML = `
                    <div style="text-align: center;">
                        <a href="https://www.paypal.com/ncp/payment/4QFBGY33UY4BE" target="_blank" class="btn btn-primary" style="background:#003087; color:white;">
                            Payer 8,99 € (Lien Direct)
                        </a>
                    </div>
                `;
            }
        }, 500);
    }

    // Open Modal
    checkoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
        });
    });

    // Close Modal
    closeBtn.addEventListener('click', () => {
        const urlParams = new URLSearchParams(window.location.search);
        // If paid=true is in URL, DO NOT allow closing
        if (urlParams.get('paid') === 'true') return;

        modal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        const urlParams = new URLSearchParams(window.location.search);
        // If paid=true is in URL, DO NOT allow closing
        if (urlParams.get('paid') === 'true') return;

        // Always allow closing by clicking outside otherwise
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // --- NEW: Handle Return from PayPal ---
    // Check if URL contains '?paid=true'
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('paid') === 'true') {
        localStorage.setItem('payment_validated', 'true');
        window.location.href = 'success.html?paid=true';
    }
};

// --- Inits ---
document.addEventListener('DOMContentLoaded', () => {
    init3D();
    initUI();
    initReviews(); // Note: This already calls supabase init internally if vars are set
    initPayPal();
});
