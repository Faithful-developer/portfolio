const galleryBody = document.querySelector('#gallery-body-wrapper');
const burgerMenu = document.querySelector('.burger-menu');
const slidesContainer = document.querySelector('.carousel-slides');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const body = document.querySelector('body')
const mobileMenu = document.querySelector('.mobile-menu')

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    body.classList.toggle('hidden');
    mobileMenu.classList.toggle('hidden');

});

fetch('../JSON/image.json')
    .then(response => response.json())
    .then(data => {
        imageRender(data.images)

    })
    .catch(error => console.error(error));


function imageRender(data) {
    for (let index = 0; index < data.length; index++) {
        let imageItem = document.createElement('li')
        imageItem.setAttribute("class", 'image-item')
        let image = document.createElement('img');
        image.setAttribute('src', data[index].url)
        let imageText = document.createElement('p')
        imageText.setAttribute('class', 'overview')
        imageText.innerHTML = data[index].caption
        imageItem.appendChild(image)
        imageItem.appendChild(imageText)
        galleryBody.appendChild(imageItem)
    }
}



let currentSlide = 0;

fetch('../JSON/image.json')
    .then(response => response.json())
    .then(data => {
        data.images.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            const img = document.createElement('img');
            img.src = image.url;
            img.alt = image.caption;
            slide.appendChild(img);
            slidesContainer.appendChild(slide);
        });
        showSlide(currentSlide);
    })
    .catch(error => {
        console.error('Error loading images:', error);
    });

function showSlide(index) {
    const slideWidth = slidesContainer.offsetWidth;
    slidesContainer.style.transform = `translateX(${-slideWidth * index}px)`;
    currentSlide = index;
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide === 0) ? slidesContainer.children.length - 1 : currentSlide - 1;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide === slidesContainer.children.length - 1) ? 0 : currentSlide + 1;
    showSlide(currentSlide);
});