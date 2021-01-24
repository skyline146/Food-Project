function slider({container , slides, nextArrow, prevArrow, currentCounter, wrapper, field}) {
    // Slider

    const prevButtonSlider = document.querySelector(prevArrow),
        nextButtonSlider = document.querySelector(nextArrow),
        allSliders = document.querySelectorAll(slides),
        slider = document.querySelector(container),
        currentSlide = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let counter = 0;
    let offset = 0;
    // Карусель

    slidesField.style.width = 100 * allSliders.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.8s all';

    slidesWrapper.style.overflow = 'hidden';

    allSliders.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let index = 0; index < allSliders.length; index++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', index);
        dot.classList.add('dot');
        if (index == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    nextButtonSlider.addEventListener('click', () => {
        if (offset == countWidth(width) * (allSliders.length - 1)) {
            offset = 0;
        } else {
            offset += countWidth(width);
        }

        counter += 1;
        if (counter === 4) {
            counter = 0;
        }

        showIndex(counter, offset);
    });

    prevButtonSlider.addEventListener('click', () => {
        if (offset == 0) {
            offset = countWidth(width) * (allSliders.length - 1);
        } else {
            offset -= countWidth(width);
        }

        counter -= 1;
        if (counter === -1) {
            counter = 3;
        }

        showIndex(counter, offset);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = +e.target.getAttribute('data-slide-to');

            counter = slideTo;
            offset = countWidth(width) * slideTo;

            showIndex(counter, offset);
        });
    });

    function countWidth(width_) {
        return +width_.replace(/\D/g, '');
    }

    function showIndex(index, offset_) {
        slidesField.style.transform = `translateX(${-offset_}px)`;

        if (allSliders.length < 10) {
            currentSlide.textContent = `0${index+1}`;
        } else {
            currentSlide.textContent = index + 1;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[index].style.opacity = 1;
    }


    // controlSlides(counter);

    // prevButtonSlider.addEventListener('click', () => {
    // counter -= 1;
    // if (counter === -1) {
    //     counter = 3;
    // }

    //     controlSlides(counter);
    // });

    // nextButtonSlider.addEventListener('click', () => {     Обычный вариант слайдера
    // counter += 1;
    // if (counter === 4) {
    //     counter = 0;
    // }

    //     controlSlides(counter);
    // });

    // function controlSlides(index) {
    //     allSliders.forEach(item => {
    //         if (!item.classList.contains('hide')) {
    //             item.classList.add('hide');
    //             item.classList.remove('fade');
    //         }
    //     });

    //     allSliders[index].classList.toggle('hide');
    //     allSliders[index].classList.toggle('fade');
    // if (index + 1 < 10) {
    //     currentSlide.innerHTML = `0${index+1}`;
    // } else {
    //     currentSlide.innerHTML = `${index+1}`;
    // }
    // }

}

export default slider;