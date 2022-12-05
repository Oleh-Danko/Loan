import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
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
            if (num === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch(e) {}

        this.slides.forEach(slide => {
            // slide.classList.add('animated', 'slideInDown');
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