function createDots() {
    const overlay = document.getElementById('dots-overlay');
    overlay.innerHTML = '';
    const step = 194;
    const dotSize = 12;
    const offset = dotSize / 2;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const cols = Math.ceil(winWidth / step) + 1;
    const rows = Math.ceil(winHeight / step) + 1;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = i * step - offset;
            const y = j * step - offset;
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            overlay.appendChild(dot);
        }
    }
}

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

createDots();
const debouncedCreateDots = debounce(createDots, 100);
window.addEventListener('resize', debouncedCreateDots);

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.solutions__tab');
    const contents = {
        native: document.getElementById('tab-native'),
        interactive: document.getElementById('tab-interactive')
    };
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => {
                t.classList.remove('solutions__tab--active');
                t.classList.add('solutions__tab--inactive');
            });
            this.classList.add('solutions__tab--active');
            this.classList.remove('solutions__tab--inactive');
            Object.values(contents).forEach(content => {
                content.style.display = 'none';
            });
            const tabId = this.dataset.tab;
            if (contents[tabId]) {
                contents[tabId].style.display = 'flex';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        syncCarouselHeight();
                    });
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.animate-on-scroll').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
    gsap.utils.toArray('.advantage-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            x: -40,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });
    gsap.utils.toArray('.feature-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            x: -30,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });
    gsap.utils.toArray('.solution-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });
    gsap.utils.toArray('.solutions__image img').forEach(img => {
        gsap.from(img, {
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: img,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
    gsap.utils.toArray('.banner').forEach((banner, i) => {
        gsap.from(banner, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: banner,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });
    gsap.utils.toArray('.case-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.getElementById('casesWrapper');
    const carousel = document.getElementById('casesCarousel');
    const prevBtn = document.querySelector('.cases__btn--prev');
    const nextBtn = document.querySelector('.cases__btn--next');
    if (!wrapper || !carousel) return;

    function scrollCarousel(direction) {
        const scrollAmount = 290;
        const currentScroll = wrapper.scrollLeft;
        const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
        let target = currentScroll + direction * scrollAmount;
        target = Math.max(0, Math.min(target, maxScroll));
        gsap.to(wrapper, {
            scrollLeft: target,
            duration: 0.7,
            ease: 'power2.inOut',
            overwrite: 'auto'
        });
    }

    prevBtn.addEventListener('click', () => scrollCarousel(-1));
    nextBtn.addEventListener('click', () => scrollCarousel(1));

    let isDragging = false;
    let startX = 0;
    let scrollLeftStart = 0;
    let velocity = 0;
    let lastMoveTime = 0;
    let lastMoveX = 0;

    wrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        wrapper.style.cursor = 'grabbing';
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeftStart = wrapper.scrollLeft;
        wrapper.style.userSelect = 'none';
        velocity = 0;
        lastMoveTime = Date.now();
        lastMoveX = e.pageX;
        gsap.killTweensOf(wrapper);
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 1.5;
        wrapper.scrollLeft = scrollLeftStart - walk;
        const now = Date.now();
        const dt = now - lastMoveTime;
        if (dt > 0) {
            velocity = (e.pageX - lastMoveX) / dt;
        }
        lastMoveTime = now;
        lastMoveX = e.pageX;
    });

    wrapper.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            wrapper.style.cursor = 'grab';
            wrapper.style.userSelect = '';
            if (Math.abs(velocity) > 0.3) {
                const inertia = velocity * 150;
                const currentScroll = wrapper.scrollLeft;
                const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
                let target = currentScroll - inertia;
                target = Math.max(0, Math.min(target, maxScroll));
                gsap.to(wrapper, {
                    scrollLeft: target,
                    duration: Math.min(Math.abs(inertia) / 800, 1.2),
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            }
        }
    });

    wrapper.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            wrapper.style.cursor = 'grab';
            wrapper.style.userSelect = '';
        }
    });

    let touchStartX = 0;
    let touchScrollLeft = 0;
    let touchLastX = 0;
    let touchVelocity = 0;
    let touchLastTime = 0;

    wrapper.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        touchStartX = touch.pageX - wrapper.offsetLeft;
        touchScrollLeft = wrapper.scrollLeft;
        touchLastX = touch.pageX;
        touchLastTime = Date.now();
        touchVelocity = 0;
        gsap.killTweensOf(wrapper);
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
        if (e.touches.length !== 1) return;
        const touch = e.touches[0];
        const x = touch.pageX - wrapper.offsetLeft;
        const walk = (x - touchStartX) * 1.5;
        wrapper.scrollLeft = touchScrollLeft - walk;
        const now = Date.now();
        const dt = now - touchLastTime;
        if (dt > 0) {
            touchVelocity = (touch.pageX - touchLastX) / dt;
        }
        touchLastTime = now;
        touchLastX = touch.pageX;
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
        if (Math.abs(touchVelocity) > 0.3) {
            const inertia = touchVelocity * 150;
            const currentScroll = wrapper.scrollLeft;
            const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
            let target = currentScroll - inertia;
            target = Math.max(0, Math.min(target, maxScroll));
            gsap.to(wrapper, {
                scrollLeft: target,
                duration: Math.min(Math.abs(inertia) / 800, 1.2),
                ease: 'power2.out',
                overwrite: 'auto'
            });
        }
    }, { passive: true });
});

document.addEventListener('DOMContentLoaded', function () {
    const budgetInput = document.getElementById('budgetInput');
    const resultsGrid = document.getElementById('resultsGrid');
    const downloadBtn = document.getElementById('downloadBtn');
    const chips = document.querySelectorAll('.category-chip');

    chips.forEach(chip => {
        chip.addEventListener('click', function () {
            chips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const metricConfig = [
        { label: 'Количество статей:', id: 'articlesCount' },
        { label: 'Охват:', id: 'reach' },
        { label: 'Дочитывания:', id: 'reads' },
        { label: 'Переходы на сайт:', id: 'clicks' },
        { label: 'Цена дочитывания:', id: 'priceRead' },
        { label: 'Цена перехода:', id: 'priceClick' },
        { label: 'Процент перехода:', id: 'conversionRate' },
        { label: 'Процент дочитывания:', id: 'readRate' },
        { label: 'Процент CTR:', id: 'ctr' }
    ];

    function renderMetrics(metrics) {
        resultsGrid.innerHTML = '';
        metricConfig.forEach((config) => {
            const item = document.createElement('div');
            item.className = 'result-item';
            const labelSpan = document.createElement('span');
            labelSpan.className = 'result-label';
            labelSpan.textContent = config.label;
            const valueSpan = document.createElement('span');
            valueSpan.className = 'result-value';
            valueSpan.id = config.id;
            valueSpan.textContent = metrics[config.id] || '—';
            item.appendChild(labelSpan);
            item.appendChild(valueSpan);
            resultsGrid.appendChild(item);
        });
    }

    function getMetricsByBudget(budget) {
        const num = parseInt(budget.replace(/\s/g, ''), 10);
        if (isNaN(num) || num < 0) return {};
        if (num < 500000) {
            return {
                articlesCount: 1,
                reach: '0,6 М',
                reads: '9 000',
                clicks: '6 000',
                priceRead: '17₽',
                priceClick: '25₽',
                conversionRate: '64% — 71%',
                readRate: '43% — 49%',
                ctr: '1.4% — 1.7%'
            };
        } else if (num < 2000000) {
            return {
                articlesCount: 2,
                reach: '1,2 М',
                reads: '18 000',
                clicks: '12 000',
                priceRead: '17₽',
                priceClick: '25₽',
                conversionRate: '64% — 71%',
                readRate: '43% — 49%',
                ctr: '1.4% — 1.7%'
            };
        } else if (num < 5000000) {
            return {
                articlesCount: 4,
                reach: '2,5 М',
                reads: '38 000',
                clicks: '25 000',
                priceRead: '15₽',
                priceClick: '22₽',
                conversionRate: '66% — 73%',
                readRate: '45% — 51%',
                ctr: '1.6% — 1.9%'
            };
        } else {
            return {
                articlesCount: 6,
                reach: '5,0 М',
                reads: '75 000',
                clicks: '50 000',
                priceRead: '12₽',
                priceClick: '18₽',
                conversionRate: '68% — 75%',
                readRate: '47% — 53%',
                ctr: '1.8% — 2.1%'
            };
        }
    }

    function updateCalculator() {
        const budget = budgetInput.value;
        const metrics = getMetricsByBudget(budget);
        renderMetrics(metrics);
    }

    budgetInput.addEventListener('input', function (e) {
        let raw = this.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
        if (raw === '') raw = '0';
        let formatted = Number(raw).toLocaleString('ru-RU');
        this.value = formatted;
        updateCalculator();
    });

    updateCalculator();

    downloadBtn.addEventListener('click', function () {
        alert('Таблица будет скачана в формате CSV');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const faqList = document.getElementById('faqList');
    if (!faqList) return;

    const faqData = Array.from({ length: 5 }, () => ({
        question: 'Сколько публикаций нужно подготовить для старта?',
        answer: 'Рекомендуем начать с 3-5 креативов и постепенно увеличивать количество. Успешные рекламодатели единовременно размещают в среднем 15-20 креативов.'
    }));

    faqData.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        if (index === 0) faqItem.classList.add('faq-item--open');

        const header = document.createElement('div');
        header.className = 'faq-item__header';
        const question = document.createElement('span');
        question.className = 'faq-item__question';
        question.textContent = item.question;
        const toggle = document.createElement('button');
        toggle.className = 'faq-item__toggle';
        toggle.setAttribute('aria-label', 'Раскрыть ответ');
        const icon = document.createElement('span');
        icon.className = 'faq-item__icon';
        toggle.appendChild(icon);
        header.appendChild(question);
        header.appendChild(toggle);
        faqItem.appendChild(header);

        const body = document.createElement('div');
        body.className = 'faq-item__body';
        const answer = document.createElement('p');
        answer.className = 'faq-item__answer';
        answer.textContent = item.answer;
        body.appendChild(answer);
        faqItem.appendChild(body);
        faqList.appendChild(faqItem);

        header.addEventListener('click', function () {
            const isOpen = faqItem.classList.contains('faq-item--open');
            document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('faq-item--open'));
            if (!isOpen) {
                faqItem.classList.add('faq-item--open');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    const slides = document.querySelectorAll('.carousel-slide');
    const wrapper = document.querySelector('.solutions__carousel-wrapper');
    let currentIndex = 0;
    let isAnimating = false;

    if (!track || slides.length === 0) return;

    function goToSlide(index) {
        if (isAnimating || index === currentIndex) return;
        if (index < 0 || index >= slides.length) return;
        isAnimating = true;
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
        const offset = -index * 100;
        track.style.transform = `translateY(${offset}%)`;
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
        currentIndex = index;
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', function () {
            goToSlide(idx);
        });
    });

    slides.forEach((s, i) => {
        if (i === 0) s.classList.add('active');
        else s.classList.remove('active');
    });
    track.style.transform = 'translateY(0%)';
    dots[0].classList.add('active');

    if (wrapper) {
        wrapper.addEventListener('wheel', function (e) {
            e.preventDefault();
            const delta = e.deltaY;
            if (delta > 0) {
                goToSlide(Math.min(currentIndex + 1, slides.length - 1));
            } else if (delta < 0) {
                goToSlide(Math.max(currentIndex - 1, 0));
            }
        }, { passive: false });
    }
});

function syncCarouselHeight() {
    const wrapper = document.querySelector('.solutions__carousel-wrapper');
    const cards = document.querySelector('.solutions__cards');
    if (!wrapper || !cards) return;
    const parent = wrapper.closest('.solutions__content');
    if (!parent || parent.style.display === 'none') return;
    const height = cards.offsetHeight;
    if (height > 0 && window.innerWidth > 1200) {
        wrapper.style.height = height + 'px';
    } else {
        wrapper.style.height = '';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    requestAnimationFrame(() => {
        requestAnimationFrame(syncCarouselHeight);
    });
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(syncCarouselHeight, 100);
    });
    const cards = document.querySelector('.solutions__cards');
    if (cards && window.ResizeObserver) {
        const observer = new ResizeObserver(() => syncCarouselHeight());
        observer.observe(cards);
    }
});