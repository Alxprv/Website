// Consolidate all initialization code into a single DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu after clicking
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Add scroll effect to navbar
    const nav = document.querySelector('nav');
    const isContactPage = window.location.pathname.includes('contact.html');

    if (nav) {
        if (isContactPage) {
            // For contact page, ensure solid background
            nav.classList.add('bg-slate-900');
            nav.classList.remove('bg-slate-900/0');
        }

        // Add scroll listener only for non-contact pages
        if (!isContactPage) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    nav.classList.add('bg-slate-900', 'bg-opacity-95', 'backdrop-blur-sm');
                    nav.classList.remove('bg-slate-900/0');
                } else {
                    nav.classList.remove('bg-slate-900', 'bg-opacity-95', 'backdrop-blur-sm');
                    nav.classList.add('bg-slate-900/0');
                }
            });
        }
    }

    // Tab functionality for Products & Services section
    const productsTab = document.getElementById('products-tab');
    const servicesTab = document.getElementById('services-tab');
    const productsContent = document.getElementById('products-content');
    const servicesContent = document.getElementById('services-content');

    if (productsTab && servicesTab && productsContent && servicesContent) {
        function switchTab(activeTab, activeContent, inactiveTab, inactiveContent) {
            [productsTab, servicesTab].forEach(tab => {
                tab.classList.remove('active', 'text-skycast-blue', 'border-skycast-blue');
                tab.classList.add('text-gray-500');
            });

            activeTab.classList.add('active', 'text-skycast-blue', 'border-skycast-blue');
            activeTab.classList.remove('text-gray-500');

            activeContent.classList.remove('hidden');
            inactiveContent.classList.add('hidden');
        }

        productsTab.addEventListener('click', () => {
            switchTab(productsTab, productsContent, servicesTab, servicesContent);
        });

        servicesTab.addEventListener('click', () => {
            switchTab(servicesTab, servicesContent, productsTab, productsContent);
        });
    }

    // News Slider Functionality
    // Old slider code removed to prevent conflicts with Swiper.

    const newsSwiperContainer = document.querySelector('.newsSwiper');
    if (newsSwiperContainer) {
        const newsSwiper = new Swiper(newsSwiperContainer, {
            loop: true,
            spaceBetween: 24,
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                // when window width is >= 640px
                640: {
                    slidesPerView: 2,
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 4,
                }
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });
    }

    // Initialize Swiper for Solutions section - service.html
    const solutionsSwiperContainer = document.querySelector('.solutions-swiper');
    if (solutionsSwiperContainer) {
        const solutionsSwiper = new Swiper(solutionsSwiperContainer, {
            loop: true,
            spaceBetween: 24,
            pagination: { el: '.solutions-pagination', clickable: true },
            navigation: { nextEl: '.solutions-next', prevEl: '.solutions-prev' },
            breakpoints: { 1024: { slidesPerView: 3 }, 768: { slidesPerView: 2 }, 320: { slidesPerView: 1 } },
        });
    }

    // Initialize Swiper for Insights section - service.html
    const insightsSwiperContainer = document.querySelector('.insights-swiper');
    if (insightsSwiperContainer) {
        const insightsSwiper = new Swiper(insightsSwiperContainer, {
            loop: false,
            spaceBetween: 24,
            pagination: { el: '.insights-pagination', clickable: true },
            navigation: { nextEl: '.insights-next', prevEl: '.insights-prev' },
            breakpoints: { 1024: { slidesPerView: 3 }, 768: { slidesPerView: 2 }, 320: { slidesPerView: 1 } },
        });
    }

    // Initialize Swiper for Services section - service.html
    const servicesSwiperContainer = document.querySelector('.services-swiper');
    if (servicesSwiperContainer) {
        const servicesSwiper = new Swiper(servicesSwiperContainer, {
            loop: false,
            spaceBetween: 24,
            pagination: { el: '.services-pagination', clickable: true },
            navigation: { nextEl: '.services-next', prevEl: '.services-prev' },
            breakpoints: { 1024: { slidesPerView: 3 }, 768: { slidesPerView: 2 }, 320: { slidesPerView: 1 } },
        });
    }

    // Mobile submenu toggle
    document.querySelectorAll('#mobile-menu button').forEach(button => {
        button.addEventListener('click', () => {
            const submenu = button.nextElementSibling;
            const arrow = button.querySelector('svg');

            // Toggle submenu visibility
            submenu.classList.toggle('hidden');

            // Rotate arrow
            arrow.classList.toggle('rotate-180');
        });
    });
});