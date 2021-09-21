"use strict"

window.addEventListener('DOMContentLoaded', ()=>{

    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item '),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


    function hideTubContent(){
        tabsContent.forEach(item=>{
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })
        tabs.forEach(item=>{
            item.classList.remove('tabheader__item_active');
        })
    }
    function showTubContent(i=0){
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active')
    }
    hideTubContent();
    showTubContent(0)

    tabsParent.addEventListener('click', event=>{
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i)=>{
                if(target == item){
                    hideTubContent();
                    showTubContent(i)
                }
            })
        }
    })
    //Timer

    const deadLine = '2021-09-11';
    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t/(1000*60*60*24)),
              hours = Math.floor((t/ (1000*60*60) % 24)),
              minutes = Math.floor((t/1000*60) % 60),
              seconds = Math.floor((t/1000) %60);
        return{
            'total'  : t,
            'days'   : days,
            'hours'  : hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }
    function getZero(num){
        if(num >= 0 && num <10){
            return `0${num}`;
        }else{
            return num;
        }
    }
    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days    = timer.querySelector('#days'),
              hours   = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        updateClock()
        function updateClock(){
            const t = getTimeRemaining(endtime);
            days.innerHTML    = getZero(t.days);
            hours.innerHTML   = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if(t.total <= 0){
                clearInterval(timeInterval)
            }
        }

    }
    setClock('.timer', deadLine)
    // Modal
    const btnShow = document.querySelectorAll('[data-modal]');
    let modal = document.querySelector('.modal');
    function closeModal(){
        modal.classList.remove('show');
        modal.classList.add('hide')
        document.body.style.overflow = ""
    }
    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = "hidden"
        clearInterval(modalTimerId)
    }
    btnShow.forEach(item=>{
        item.addEventListener('click', openModal)
    })
    document.body.addEventListener('click', (e)=>{
        if(e.target == modal || e.target.getAttribute('data-close') == ''){
            closeModal()
        }
    })

    document.addEventListener('keydown', (e)=>{
        if(e.key === 'Escape' && modal.classList.contains('show')){
            closeModal()
        }
    })
    const modalTimerId = setTimeout(openModal,3000)
    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal()
            window.removeEventListener('scroll', showModalByScroll)
            console.log(window.pageYOffset)

        }
    }
    window.addEventListener('scroll', showModalByScroll)
    const getResource = async (url)=>{
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json()
    }

    getResource('http://localhost:3000/menu')
        .then(data=>{
            data.forEach(({img, altimg, title, descr, price})=>{
               new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    class MenuCard{
        constructor(src,alt,title,descr,price, parentSelector, ...classes) {
            this.src= src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector)
            this.transfer = 27;
            this.changeToUAH()
        }

        changeToUAH(){
            this.price = +this.price * this.transfer;

        }
        render(){
            const element = document.createElement('div');
            if(this.classes.length === 0){
                this.element = 'menu__item'
                element.classList.add(this.element)
            }else{
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
        `;
            this.parent.append(element)
        }
    }

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }
    forms.forEach(item=>{
        bindPostData(item)
    })

    const postData = async (url, data)=>{
        const res = await fetch(url,{
            method: "POST",
            headers:{
                'Content-type':'application/json'
            },
            body: data
        });
        return await res.json()
    }

    function bindPostData(form){
        form.addEventListener('submit',(e)=>{
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            form.insertAdjacentElement('afterEnd', statusMessage)

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));



            postData('http://localhost:3000/requests', json)
            .then(data=>{
                    console.log(data)
                    showThanksModal(message.success);
                    statusMessage.remove()
            }).catch(()=>{
                showThanksModal(message.failure);
            }).finally(()=>{
                form.reset();
            });

        })
    }

    function showThanksModal(message){
        const prevModalDilog = document.querySelector('.modal__dialog');
        prevModalDilog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML= `
            <div class="modal__content">
                <form action="#">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                </form>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDilog.classList.remove('hide')
            closeModal();
        },4000);
    }
    fetch('http://localhost:3000/menu')
    .then(data=> data.json())
    .then(res=> console.log(res))

    //Слайдер своими руками

    let sliders = document.querySelectorAll('.offer__slide');
    let prev = document.querySelector('.offer__slider-prev');
    let next = document.querySelector('.offer__slider-next');
    let all = document.querySelector('#total');
    let current = document.querySelector('#current');
    let sliderWrapper = document.querySelector('.offer__slider-wrapper');
    let slidesField = document.querySelector('.offer__slider-inner');
    let slideIndex= 1;
    let offset = 0;
    let width = window.getComputedStyle(sliderWrapper).width;
    function deleteText(str){
        return +str.replace(/\D/g,'');
    }
    sliderWrapper.style.overflow = 'hidden'
    slidesField.style.width = 100 * sliders.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '.5s all'
    sliders.forEach(slide =>{
        slide.style.width = width;
    });

    next.addEventListener('click', ()=>{
        slideIndex++;
            if(slideIndex < 1){
                slideIndex = sliders.length
            }else if(slideIndex > sliders.length){
                slideIndex =1;
            }
        if(offset == deleteText(width) *(sliders.length -1)){
            offset = 0
        }else{
            offset += deleteText(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`
        checkActiveSlide()
    })

    prev.addEventListener('click', ()=>{
        slideIndex--;
            if(slideIndex < 1){
                slideIndex = sliders.length
            }else if(slideIndex > sliders.length){
                slideIndex =1;
            }
        if(offset == 0){
            offset = deleteText(width) *(sliders.length -1)
        }else{
            offset -= deleteText(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`
        checkActiveSlide()
    })
    function checkActiveSlide(){
         if(slideIndex>=10){
             current.textContent = `${slideIndex}`;
         }else{
             current.textContent = `0${slideIndex}`;
         }
        if(sliders.length >= 10){
            all.textContent = `${sliders.length}`;
        }else{
            all.textContent = `0${sliders.length}`
        }
     }
     checkActiveSlide()




    //Калькулятор

    let sex, height, weight, age, ratio;
    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex')
    }else {
        sex = 'female';
        localStorage.setItem('sex', 'female')
    }
    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio')
    }else {
        ratio = 'female';
        localStorage.setItem('ratio', 1.375)
    }
    let result = document.querySelector('.calculating__result span');
    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = '____';
            return;
        }
        if(sex ===  "female"){
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }else{
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
    }
    calcTotal()

    function getStaticInformation(selector, activeClass){
        const elements = document.querySelectorAll(selector)
        elements.forEach(elem=>{
            elem.addEventListener('click',(e)=>{
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio',e.target.getAttribute('data-ratio'))
                }else{
                    sex = e.target.getAttribute('id')
                    localStorage.setItem('sex',e.target.getAttribute('id'))
                }
                elements.forEach(elem=>{
                    elem.classList.remove(activeClass)
                })
                e.target.classList.add(activeClass)
                console.log(sex, ratio)
                calcTotal()
            })
        })
    }
    function getDynamicInformation(selector){
        const input = document.querySelector(selector);
        input.addEventListener('input', ()=>{
            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            }else{
                input.style.border = 'none';
            }
            switch (input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break
            }
            calcTotal()
            console.log(weight, height, age)
        })
    }

    function initLocalSetting(selector, activeClass){
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem =>{
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass)
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass)
            }
        })
    }
    initLocalSetting('#gender div','calculating__choose-item_active');
    initLocalSetting('.calculating__choose_big div','calculating__choose-item_active');
    getStaticInformation('#gender div','calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active');
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
     
})
