 const mainImage = document.getElementById('mainImage');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // Lightbox
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        
        let currentImageIndex = 0;
        const images = Array.from(thumbnails).map(thumb => thumb.dataset.full);
        
        // Zmiana głównego zdjęcia po kliknięciu miniatur
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                const imgSrc = this.dataset.full;
                mainImage.src = imgSrc;
                currentImageIndex = index;
                
                // Aktualizacja aktywnych miniaturek
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Przewijanie galerii
        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateMainImage();
        }
        
        function showPrevImage() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateMainImage();
        }
        
        function updateMainImage() {
            mainImage.src = images[currentImageIndex];
            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === currentImageIndex);
            });
        }
        
        nextBtn.addEventListener('click', showNextImage);
        prevBtn.addEventListener('click', showPrevImage);
        
        // Lightbox
        function openLightbox(index) {
            currentImageIndex = index;
            lightboxImg.src = images[currentImageIndex];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        mainImage.addEventListener('click', () => openLightbox(currentImageIndex));
        lightboxClose.addEventListener('click', closeLightbox);
        
        lightboxNext.addEventListener('click', () => {
            showNextImage();
            lightboxImg.src = images[currentImageIndex];
        });
        
        lightboxPrev.addEventListener('click', () => {
            showPrevImage();
            lightboxImg.src = images[currentImageIndex];
        });
        
        // Zamknięcie lightboxa po kliknięciu poza obrazek
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Nawigacja klawiszami
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                    lightboxImg.src = images[currentImageIndex];
                } else if (e.key === 'ArrowLeft') {
                    showPrevImage();
                    lightboxImg.src = images[currentImageIndex];
                }
            }
        });
        
        // Responsywność - przewijanie miniatur na małych ekranach
        function scrollToActiveThumbnail() {
            const activeThumb = document.querySelector('.thumbnail.active');
            if (activeThumb) {
                activeThumb.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
        
        window.addEventListener('resize', scrollToActiveThumbnail);
        // Obsługa przycisków kontaktowych
        const callBtn = document.getElementById('callBtn');
        const emailBtn = document.getElementById('emailBtn');
        const phoneInfo = document.getElementById('phoneInfo');
        const emailInfo = document.getElementById('emailInfo');

        callBtn.addEventListener('click', function(e) {
            e.preventDefault();
            emailInfo.classList.remove('show');
            phoneInfo.classList.toggle('show');
        });

        emailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            phoneInfo.classList.remove('show');
            emailInfo.classList.toggle('show');
        });

        // Zamknij informacje kontaktowe po kliknięciu gdzie indziej
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.button-group')) {
                phoneInfo.classList.remove('show');
                emailInfo.classList.remove('show');
            }
        });