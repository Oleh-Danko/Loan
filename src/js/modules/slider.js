export default class Slider {
    constructor(page, btns){
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
    }

    showSlides(num) {
        if (num > this.slides.length) {
            this.slideIndex = 1;
        }

        if (num < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.opacity = '0';
            this.hanson.classList.add('animated');

            if (num === 3) {
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch(e) {}

        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';

    }

    plusSlides(num) {
        this.showSlides(this.slideIndex += num);
    }

    render() {
        try {
            this.hanson = document.querySelector('.hanson');
        } catch(e) {}

        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
            });

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        this.showSlides(this.slideIndex);
    }
}