
        const slideshow = {
            currentSlide: 0,
            slides: document.querySelectorAll('.slide'),
            dotsContainer: document.querySelector('.dots-container'),
            progressBar: document.querySelector('.progress'),
            autoplayInterval: 5000, // 5 seconds
            autoplayTimer: null,

            init() {
                // Create dots
                this.slides.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (index === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => this.goToSlide(index));
                    this.dotsContainer.appendChild(dot);
                });

                // Add button listeners
                document.querySelector('.prev-btn').addEventListener('click', () => this.prevSlide());
                document.querySelector('.next-btn').addEventListener('click', () => this.nextSlide());

                // Start autoplay
                this.startAutoplay();

                // Pause autoplay on hover
                document.querySelector('.slideshow-container').addEventListener('mouseenter', () => this.pauseAutoplay());
                document.querySelector('.slideshow-container').addEventListener('mouseleave', () => this.startAutoplay());
            },

            goToSlide(index) {
                // Remove active classes
                this.slides[this.currentSlide].classList.remove('active');
                this.dotsContainer.children[this.currentSlide].classList.remove('active');

                // Update current slide
                this.currentSlide = index;

                // Add active classes
                this.slides[this.currentSlide].classList.add('active');
                this.dotsContainer.children[this.currentSlide].classList.add('active');

                // Reset progress
                this.resetProgress();
            },

            nextSlide() {
                const next = (this.currentSlide + 1) % this.slides.length;
                this.goToSlide(next);
            },

            prevSlide() {
                const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
                this.goToSlide(prev);
            },

            startAutoplay() {
                this.resetProgress();
                this.progressBar.style.width = '100%';
                this.autoplayTimer = setInterval(() => this.nextSlide(), this.autoplayInterval);
            },

            pauseAutoplay() {
                clearInterval(this.autoplayTimer);
                this.progressBar.style.width = '0';
            },

            resetProgress() {
                this.progressBar.style.width = '0';
                setTimeout(() => {
                    this.progressBar.style.transition = 'none';
                    this.progressBar.style.width = '0';
                    setTimeout(() => {
                        this.progressBar.style.transition = 'all 0.3s linear';
                        this.progressBar.style.width = '100%';
                        this.progressBar.style.background = '#302981';
                    }, 10);
                }, 300);
            }
        };

        // Initialize slideshow
        slideshow.init();
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Close menu when window is resized beyond mobile breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
            }
        });
