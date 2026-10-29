/**
 * Krobia Osiedle Zielone – wspólny skrypt
 * ----------------------------------------
 * Obsługuje:
 *  - galerię zdjęć z lightboxem (strony działek)
 *  - zakładki nawigacyjne (index.html)
 *  - przyciski kontaktowe (zadzwoń / wyślij wiadomość)
 */

// ── Stałe konfiguracyjne ────────────────────────────────────────────────────
const MOBILE_BREAKPOINT_PX = 768; // próg szerokości – poniżej wyłącza scroll miniatur

// ── Galeria zdjęć + Lightbox ────────────────────────────────────────────────
(function initGallery() {
    const mainImage   = document.getElementById('mainImage');
    const thumbnails  = document.querySelectorAll('.thumbnail');
    const prevBtn     = document.getElementById('prevBtn');
    const nextBtn     = document.getElementById('nextBtn');

    // Brak galerii na tej stronie – zakończ
    if (!mainImage || thumbnails.length === 0) return;

    const lightbox      = document.getElementById('lightbox');
    const lightboxImg   = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev  = document.getElementById('lightboxPrev');
    const lightboxNext  = document.getElementById('lightboxNext');

    let currentIndex = 0;
    const images = Array.from(thumbnails).map(thumb => thumb.dataset.full);

    // Kliknięcie miniatury
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function () {
            currentIndex = index;
            mainImage.src = this.dataset.full;
            setActiveThumb(index);
            scrollToActiveThumb();
        });
    });

    // Przyciski prev / next w galerii
    nextBtn.addEventListener('click', () => { stepImage(1);  });
    prevBtn.addEventListener('click', () => { stepImage(-1); });

    // ── Pomocnicze ─────────────────────────────────────────────────────────

    function stepImage(direction) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        mainImage.src = images[currentIndex];
        setActiveThumb(currentIndex);
        scrollToActiveThumb();
    }

    function setActiveThumb(index) {
        thumbnails.forEach((t, i) => t.classList.toggle('active', i === index));
    }

    function scrollToActiveThumb() {
        const activeThumb = document.querySelector('.thumbnail.active');
        if (!activeThumb || window.innerWidth <= MOBILE_BREAKPOINT_PX) return;

        const thumbRect     = activeThumb.getBoundingClientRect();
        const containerRect = activeThumb.parentElement.getBoundingClientRect();

        if (thumbRect.left < containerRect.left || thumbRect.right > containerRect.right) {
            activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }

    window.addEventListener('resize', scrollToActiveThumb);

    // ── Lightbox ────────────────────────────────────────────────────────────

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex];
        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    function lightboxStep(direction) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    mainImage.addEventListener('click', () => openLightbox(currentIndex));
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', () => lightboxStep(1));
    lightboxPrev.addEventListener('click', () => lightboxStep(-1));

    // Zamknięcie po kliknięciu poza zdjęciem
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });

    // Obsługa klawiatury
    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        if      (e.key === 'Escape')     closeLightbox();
        else if (e.key === 'ArrowRight') lightboxStep(1);
        else if (e.key === 'ArrowLeft')  lightboxStep(-1);
    });
})();


// ── Zakładki (index.html) ───────────────────────────────────────────────────
(function initTabs() {
    const tabs        = document.querySelectorAll('nav a[data-tab]');
    const tabContents = document.querySelectorAll('main section');
    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active-tab'));
            tabContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Domyślnie aktywuj pierwszą zakładkę
    const firstTab = tabs[0];
    firstTab.classList.add('active-tab');
    document.getElementById(firstTab.getAttribute('data-tab')).classList.add('active');
})();


// ── Przyciski kontaktowe (Zadzwoń / Wyślij wiadomość) ──────────────────────
(function initContactButtons() {
    const callBtn   = document.getElementById('callBtn');
    const emailBtn  = document.getElementById('emailBtn');
    const phoneInfo = document.getElementById('phoneInfo');
    const emailInfo = document.getElementById('emailInfo');

    if (!callBtn || !emailBtn) return;

    callBtn.addEventListener('click', function (e) {
        e.preventDefault();
        emailInfo.classList.remove('show');
        phoneInfo.classList.toggle('show');
    });

    emailBtn.addEventListener('click', function (e) {
        e.preventDefault();
        phoneInfo.classList.remove('show');
        emailInfo.classList.toggle('show');
    });

    // Zamknij po kliknięciu poza przyciskami
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.button-group')) {
            phoneInfo.classList.remove('show');
            emailInfo.classList.remove('show');
        }
    });
})();
