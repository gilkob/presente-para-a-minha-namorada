// ========== SCROLL SUAVE CUSTOMIZADO ==========
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links de navegação
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Scroll suave personalizado
                smoothScrollTo(targetSection, 600); // Reduzindo para 600ms
            }
        });
    });
});

// Função para scroll suave customizado
function smoothScrollTo(target, duration = 600) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animateScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Função de easing mais simples
        const easeInOut = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        window.scrollTo(0, startPosition + distance * easeInOut);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
        }
    }
    
    requestAnimationFrame(animateScroll);
}

// ========== CONTADOR DE TEMPO ==========
const startDate = new Date('2024-01-23T16:00:00');

function updateCounter() {
    const now = new Date();
    const timeDiff = now - startDate;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Atualização simples sem animação
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
}

// Atualiza contador a cada segundo
setInterval(updateCounter, 1000);
updateCounter();

// ========== CARROSSEL DE FOTOS ==========
let currentSlideIndex = 0;
const totalSlides = 5;
let autoplayInterval;

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function currentSlide(n) {
    currentSlideIndex = n - 1;
    updateCarousel();
    resetAutoplay();
}

function updateCarousel() {
    const carousel = document.getElementById('carousel');
    const indicators = document.querySelectorAll('.indicator');
    
    if (carousel) {
        carousel.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    }
    
    // Atualiza indicadores
    indicators.forEach((indicator, index) => {
        if (index === currentSlideIndex) {
            indicator.classList.add('active', 'bg-pink-500');
            indicator.classList.remove('bg-pink-300');
        } else {
            indicator.classList.remove('active', 'bg-pink-500');
            indicator.classList.add('bg-pink-300');
        }
    });
}

// Autoplay do carrossel
function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 4000);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

// Para o autoplay quando o usuário interage
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        carouselContainer.addEventListener('mouseleave', startAutoplay);
        startAutoplay();
    }
});

// ========== MODAL DE FOTOS ==========
function openModal(src) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    
    if (modal && modalImage) {
        modalImage.src = src;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

// Fecha modal ao clicar fora
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('photoModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// ========== QUIZ INTERATIVO ==========
function showMessage(questionNumber) {
    const messageElement = document.getElementById(`message-q${questionNumber}`);
    if (messageElement) {
        messageElement.classList.remove('hidden');
    }
}

function checkQuiz() {
    const answers = {
        q1: document.querySelector('input[name="q1"]:checked'),
        q2: document.querySelector('input[name="q2"]:checked'),
        q3: document.querySelector('input[name="q3"]:checked'),
        q4: document.querySelector('input[name="q4"]:checked')
    };

    if (!answers.q1 || !answers.q2 || !answers.q3 || !answers.q4) {
        showQuizResult(`
            <div class="bg-yellow-200 text-yellow-800 p-4 rounded-lg">
                <p>⚠️ Por favor, responda todas as perguntas!</p>
            </div>
        `);
        return;
    }

    let score = 0;
    if (answers.q1) score++;
    if (answers.q2.value === "praca-eventos") score++;
    if (answers.q3) score++;
    if (answers.q4) score++;

    let resultText = "";
    let bgColor = "";
    let textColor = "";
    
    if (score === 4) {
        resultText = "❤️ Perfeito! Você me conhece muito bem! ❤️";
        bgColor = "bg-green-200";
        textColor = "text-green-800";
    } else if (score === 3) {
        resultText = "😍 Quase lá! Você me conhece bem!";
        bgColor = "bg-blue-200";
        textColor = "text-blue-800";
    } else if (score === 2) {
        resultText = "😊 Você precisa me conhecer melhor!";
        bgColor = "bg-orange-200";
        textColor = "text-orange-800";
    } else {
        resultText = "🤔 Acho que precisamos conversar mais!";
        bgColor = "bg-red-200";
        textColor = "text-red-800";
    }

    showQuizResult(`
        <div class="${bgColor} ${textColor} p-4 rounded-lg">
            <h3 class="text-xl font-bold mb-2">Resultado: ${score}/4</h3>
            <p class="text-lg">${resultText}</p>
        </div>
    `);
}

function showQuizResult(content) {
    const resultElement = document.getElementById('quiz-result');
    if (resultElement) {
        resultElement.innerHTML = content;
        resultElement.classList.remove('hidden');
        
        // Scroll suave até o resultado
        setTimeout(() => {
            smoothScrollTo(resultElement, 400);
        }, 100);
    }
}

// ========== EASTER EGG SIMPLES ==========
let clickCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('h1');
    
    if (title) {
        title.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 5) {
                showSurprise();
                clickCount = 0;
            }
        });
    }
});

function showSurprise() {
    const surprise = document.createElement('div');
    surprise.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-pink-200 p-6 rounded-xl text-center max-w-sm mx-4 shadow-xl">
                <div class="text-4xl mb-3">🎉</div>
                <h3 class="text-xl font-bold mb-3 text-pink-800">Surpresa!</h3>
                <p class="mb-3 text-gray-700">Você descobriu um segredo! 💕</p>
                <p class="text-sm text-gray-600 mb-4">Eu te amo por ser curiosa! ❤️</p>
                <button onclick="this.closest('.fixed').remove()" 
                        class="bg-pink-400 text-white px-6 py-2 rounded-full hover:bg-pink-500 transition-colors">
                    Fechar ❤️
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(surprise);
}

// ========== CSS SIMPLIFICADO - SEM ANIMAÇÕES PROBLEMÁTICAS ==========
const style = document.createElement('style');
style.textContent = `
    /* Remove todas as animações que estavam causando pulos */
    * {
        transition-timing-function: ease !important;
    }
    
    /* Transições suaves apenas para hover */
    button:hover {
        transform: translateY(-1px);
        transition: transform 0.2s ease;
    }
    
    img:hover {
        transform: scale(1.02);
        transition: transform 0.2s ease;
    }
    
    /* Remove animações automáticas */
    @keyframes none {
        0%, 100% { transform: none; }
    }
    
    /* Otimização para evitar repaints */
    .carousel-track {
        backface-visibility: hidden;
        perspective: 1000px;
    }
    
    /* Remove motion para quem prefere */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation: none !important;
            transition: none !important;
        }
    }
`;

// Adiciona o CSS quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    document.head.appendChild(style);
});
