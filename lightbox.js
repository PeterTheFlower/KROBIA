const images = document.querySelectorAll('.image-gallery a');
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

images.forEach(image => {
    image.addEventListener('click', e => {
        e.preventDefault();
        const img = document.createElement('img');
        img.src = image.href;
        lightbox.innerHTML = '';
        lightbox.appendChild(img);
        const closeButton = document.createElement('a');
        closeButton.href = "#close";
        closeButton.classList.add('close');
        closeButton.textContent = '×';
        lightbox.appendChild(closeButton);
        window.location.hash = 'lightbox';
    });
});