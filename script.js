// ========== TRANSLATIONS ==========
const translations = {
    ru: {
        nav_roster: "Состав",
        nav_matches: "Матчи",
        nav_achievements: "Достижения",
        nav_gallery: "Галерея",
        nav_documents: "Документы",
        nav_contacts: "Контакты",
        hero_subtitle: "New Era of Belarusian Counter-Strike 2",
        hero_btn: "Смотреть Ростер",
        roster_title: "ОСНОВНОЙ СОСТАВ",
        matches_title: "ПОСЛЕДНИЕ МАТЧИ",
        matches_upcoming: "ПРЕДСТОЯЩИЕ МАТЧИ",
        achievements_title: "ДОСТИЖЕНИЯ",
        gallery_title: "ГАЛЕРЕЯ",
        gallery_videos: "ВИДЕО",
        about_title: "ИСТОРИЯ ОРГАНИЗАЦИИ",
        management_title: "РУКОВОДСТВО ОРГАНИЗАЦИИ",
        docs_title: "OFFICIAL ORDERS (CEO)",
        contacts_title: "СВЯЗАТЬСЯ С НАМИ",
        contacts_form_title: "Отправить сообщение",
        form_name: "Ваше имя",
        form_email: "Email",
        form_subject: "Тема",
        form_message: "Сообщение",
        form_submit: "Отправить"
    },
    en: {
        nav_roster: "Roster",
        nav_matches: "Matches",
        nav_achievements: "Achievements",
        nav_gallery: "Gallery",
        nav_documents: "Documents",
        nav_contacts: "Contacts",
        hero_subtitle: "New Era of Belarusian Counter-Strike 2",
        hero_btn: "View Roster",
        roster_title: "MAIN ROSTER",
        matches_title: "RECENT MATCHES",
        matches_upcoming: "UPCOMING MATCHES",
        achievements_title: "ACHIEVEMENTS",
        gallery_title: "GALLERY",
        gallery_videos: "VIDEOS",
        about_title: "ORGANIZATION HISTORY",
        management_title: "MANAGEMENT",
        docs_title: "OFFICIAL ORDERS (CEO)",
        contacts_title: "CONTACT US",
        contacts_form_title: "Send Message",
        form_name: "Your Name",
        form_email: "Email",
        form_subject: "Subject",
        form_message: "Message",
        form_submit: "Send"
    }
};

let currentLang = 'ru';

// ========== LANGUAGE SWITCHER ==========
function switchLanguage(lang) {
    currentLang = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
}

// ========== MOBILE MENU ==========
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========== HEADER SCROLL EFFECT ==========
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter for CEO stats
            if (entry.target.classList.contains('ceo-container')) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    if (!counter.classList.contains('counted')) {
                        animateCounter(counter);
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe all fade-in-up elements
document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

// ========== COUNTER ANIMATION ==========
function animateCounter(element) {
    element.classList.add('counted');
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ========== PLAYER MODAL ==========
const playersData = {
    "Sa1meq": { 
        role: "Capitan", 
        joined: "03.03.2023", 
        age: "20 лет",
        bio: "Лидер состава и координатор игрового процесса. Выстраивает стратегию и следит за дисциплиной во время матчей.", 
        kd: "1.05", 
        map: "Inferno",
        photo: "img/sa1meq.jpg",
        faceit: "https://www.faceit.com/en/players/sa1meq"
    },
    "M1nd3rr": { 
        role: "AWP", 
        joined: "03.03.2023", 
        age: "21 год",
        bio: "Основной снайпер команды. Обеспечивает ключевые открывающие фрагменты и контроль дальних дистанций.", 
        kd: "1.35", 
        map: "Mirage",
        photo: "img/m1nd3rr.png",
        faceit: "https://www.faceit.com/en/players/m1nd3rr"
    },
    "Aqweeit": { 
        role: "Rifle", 
        joined: "03.03.2023", 
        age: "19 лет",
        bio: "Энергичный рифлер, специализирующийся на агрессивных прорывах и создании пространства для команды.", 
        kd: "1.15", 
        map: "Ancient",
        photo: "img/aqweeit.jpg",
        faceit: "https://www.faceit.com/en/players/aqweeit"
    },
    "Mageboiiius": { 
        role: "Rifle", 
        joined: "01.04.2024", 
        age: "21 год",
        bio: "Универсальный игрок поддержки. Мастер использования гранат и надежного удержания позиций.", 
        kd: "1.10", 
        map: "Overpass",
        photo: "img/mageboiiius.jpg",
        faceit: "https://www.faceit.com/en/players/mageboiiius"
    },
    "va1t1s4k4": { 
        role: "Rifle", 
        joined: "07.01.2026", 
        age: "21 год",
        bio: "Агрессивный стрелок с высоким уровнем индивидуального мастерства. Самый свежий участник основного ростера.", 
        kd: "1.12", 
        map: "Mirage",
        photo: "img/va1t1s4k4.jpg",
        faceit: "https://www.faceit.com/en/players/va1t1s4k4"
    }
};

const modal = document.getElementById("playerModal");
const closeBtn = document.querySelector(".close-modal");

// Open modal on player card click
document.querySelectorAll('.player-card').forEach(card => {
    card.addEventListener('click', () => {
        const name = card.querySelector('h3').innerText;
        const data = playersData[name];

        if (data) {
            document.getElementById("modalName").innerText = name;
            document.getElementById("modalRole").innerText = data.role;
            document.getElementById("modalBio").innerText = data.bio;
            document.getElementById("modalKD").innerText = data.kd;
            document.getElementById("modalImg").src = data.photo;
            document.getElementById("modalAge").innerText = "Возраст: " + data.age;
            document.getElementById("modalJoined").innerText = "В команде с: " + data.joined;
            document.getElementById("modalMap").innerText = data.map;
            document.getElementById("faceitLink").href = data.faceit;

            modal.style.display = "block";
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
closeBtn.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
};

window.onclick = (event) => { 
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }
};

// ========== GALLERY FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        galleryItems.forEach(item => {
            if (filter === 'all') {
                item.classList.remove('hidden');
            } else {
                if (item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        formMessage.textContent = 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 1500);
    
    /* 
    // Actual implementation with backend
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            formMessage.textContent = 'Сообщение успешно отправлено!';
            formMessage.className = 'form-message success';
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        formMessage.textContent = 'Ошибка при отправке сообщения. Попробуйте позже.';
        formMessage.className = 'form-message error';
    }
    
    formMessage.style.display = 'block';
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    */
});

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== PARTICLES.JS CONFIGURATION ==========
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ff3e3e'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ff3e3e',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// ========== LANGUAGE SWITCHER EVENT LISTENERS ==========
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        switchLanguage(btn.dataset.lang);
    });
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== LAZY LOADING FOR IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== PREVENT FORM RESUBMISSION ON PAGE REFRESH ==========
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ========== CONSOLE EASTER EGG ==========
console.log('%c🎮 Team H8 - New Era of Belarusian CS2 🎮', 'color: #ff3e3e; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%cInterested in joining our team? Contact us at h8.cs2official@gmail.com', 'color: #fff; font-size: 12px;');

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    switchLanguage('ru');
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    console.log('Team H8 Website Initialized Successfully! 🚀');
});

// ========== PERFORMANCE MONITORING ==========
window.addEventListener('load', () => {
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// ========== SERVICE WORKER REGISTRATION (for PWA if needed) ==========
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(err => console.log('ServiceWorker registration failed'));
    });
}
*/

// ============================================
// 🔑 API CONFIGURATION - ВСТАВЬТЕ ВАШИ КЛЮЧИ ЗДЕСЬ
// ============================================

const API_KEYS = {
    faceit: {
        apiKey: '39cad3ba-f887-4431-9589-a8654c0b813d',  // ← ВСТАВЬТЕ ВАШ FACEIT API KEY СЮДА
        enabled: true // ← Поставьте true когда добавите ключ
    },
    
    // Google Analytics (опционально) - добавьте в HTML <head>
    googleAnalytics: {
        measurementId: '',  // G-XXXXXXXXXX
        enabled: false
    },
    
    // FormSpree для формы обратной связи (бесплатно)
    formspree: {
        endpoint: '',  // https://formspree.io/f/xxxxxxxx
        enabled: false
    }
};

// FACEIT Player IDs - найдите в профилях игроков на faceit.com
const faceitPlayerIds = {
    'M1nd3rr': 'f4326770-b6b9-4b5f-922c-a388e2b83c75',      // ← Вставьте FACEIT ID
    'Aqweeit': '746c701b-0cc4-4a49-9893-1d4336fa0eb9',      // ← Вставьте FACEIT ID
    'Sa1meq': '19fe7d4d-21b1-4ed0-bb4c-290f195e52b7',       // ← Вставьте FACEIT ID
    'Mageboiiius': 'ae68194a-62dd-4dfe-ac51-bdf3956af5e8',  // ← Вставьте FACEIT ID
    'va1t1s4k4': 'b7e146eb-196a-45c4-8948-a80e4a62c93a'     // ← Вставьте FACEIT ID
};

// ========== FACEIT API INTEGRATION ==========

async function fetchFaceitPlayerStats(playerName) {
    if (!API_KEYS.faceit.enabled || !API_KEYS.faceit.apiKey) {
        console.log('ℹ️ FACEIT API not configured');
        return null;
    }
    
    const playerId = faceitPlayerIds[playerName];
    
    if (!playerId) {
        console.warn(`⚠️ FACEIT ID not set for ${playerName}`);
        return null;
    }
    
    try {
        console.log(`🔄 Loading FACEIT stats for ${playerName}...`);
        
        // Получить основную информацию игрока
        const playerResponse = await fetch(
            `https://open.faceit.com/data/v4/players/${playerId}`,
            {
                headers: {
                    'Authorization': `Bearer ${API_KEYS.faceit.apiKey}`,
                    'Accept': 'application/json'
                }
            }
        );
        
        if (!playerResponse.ok) {
            throw new Error(`HTTP ${playerResponse.status}: ${playerResponse.statusText}`);
        }
        
        const playerData = await playerResponse.json();
        
        // Получить статистику CS2
        const statsResponse = await fetch(
            `https://open.faceit.com/data/v4/players/${playerId}/stats/cs2`,
            {
                headers: {
                    'Authorization': `Bearer ${API_KEYS.faceit.apiKey}`,
                    'Accept': 'application/json'
                }
            }
        );
        
        if (!statsResponse.ok) {
            console.warn(`⚠️ Stats not available for ${playerName}`);
            return null;
        }
        
        const statsData = await statsResponse.json();
        
        // Обновить данные игрока
        const stats = {
            level: playerData.games?.cs2?.skill_level || 0,
            elo: playerData.games?.cs2?.faceit_elo || 0,
            kd: statsData.lifetime?.['Average K/D Ratio'] || '0.00',
            winrate: statsData.lifetime?.['Win Rate %'] || '0',
            matches: statsData.lifetime?.Matches || '0',
            headshot: statsData.lifetime?.['Average Headshots %'] || '0'
        };
        
        // Обновить playersData
        if (playersData[playerName]) {
            playersData[playerName].kd = stats.kd;
            playersData[playerName].faceitLevel = stats.level;
            playersData[playerName].faceitElo = stats.elo;
            playersData[playerName].winrate = stats.winrate + '%';
        }
        
        console.log(`✅ Stats loaded for ${playerName}:`, stats);
        return stats;
        
    } catch (error) {
        console.error(`❌ Error loading stats for ${playerName}:`, error.message);
        return null;
    }
}

// Загрузить статистику всех игроков
async function loadAllFaceitStats() {
    if (!API_KEYS.faceit.enabled) {
        console.log('ℹ️ FACEIT API disabled. Using demo data.');
        return;
    }
    
    console.log('🚀 Loading FACEIT stats for all players...');
    
    const players = Object.keys(faceitPlayerIds).filter(name => faceitPlayerIds[name]);
    
    if (players.length === 0) {
        console.warn('⚠️ No FACEIT IDs configured');
        return;
    }
    
    for (const playerName of players) {
        await fetchFaceitPlayerStats(playerName);
        // Задержка между запросами (rate limiting)
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('✅ All FACEIT stats loaded!');
}

// ========== FORM SUBMISSION WITH FORMSPREE ==========

if (API_KEYS.formspree.enabled && API_KEYS.formspree.endpoint) {
    // Перезаписать обработчик формы для работы с FormSpree
    const originalFormHandler = contactForm.onsubmit;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(contactForm);
            
            const response = await fetch(API_KEYS.formspree.endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formMessage.textContent = 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
                formMessage.className = 'form-message success';
                contactForm.reset();
            } else {
                throw new Error('Failed to send');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            formMessage.textContent = 'Ошибка при отправке сообщения. Попробуйте позже или напишите нам на email.';
            formMessage.className = 'form-message error';
        }
        
        formMessage.style.display = 'block';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Скрыть сообщение через 5 секунд
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// ========== GOOGLE ANALYTICS EVENTS ==========

if (API_KEYS.googleAnalytics.enabled && typeof gtag !== 'undefined') {
    // Отслеживание кликов по кнопкам
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            gtag('event', 'button_click', {
                'event_category': 'engagement',
                'event_label': e.target.textContent.trim(),
                'value': 1
            });
        });
    });
    
    // Отслеживание просмотров игроков
    document.querySelectorAll('.player-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const playerName = card.querySelector('h3')?.textContent || 'Unknown';
            gtag('event', 'player_view', {
                'event_category': 'engagement',
                'event_label': playerName,
                'value': 1
            });
        });
    });
    
    // Отслеживание загрузки документов
    document.querySelectorAll('.doc-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const docName = link.querySelector('p')?.textContent || 'Document';
            gtag('event', 'document_view', {
                'event_category': 'engagement',
                'event_label': docName,
                'value': 1
            });
        });
    });
}

// ========== AUTO-LOAD FACEIT STATS ON PAGE LOAD ==========

// Автоматическая загрузка статистики при загрузке страницы
const originalDOMContentLoaded = () => {
    // Set initial language
    switchLanguage('ru');
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Load FACEIT stats if enabled
    if (API_KEYS.faceit.enabled) {
        loadAllFaceitStats();
    }
    
    console.log('Team H8 Website Initialized Successfully! 🚀');
    
    // Display API status
    console.log('📊 API Status:');
    console.log('  FACEIT:', API_KEYS.faceit.enabled ? '✅ Enabled' : '⚪ Disabled (demo data)');
    console.log('  FormSpree:', API_KEYS.formspree.enabled ? '✅ Enabled' : '⚪ Disabled (demo mode)');
    console.log('  Analytics:', API_KEYS.googleAnalytics.enabled ? '✅ Enabled' : '⚪ Disabled');
};

// Заменить оригинальный обработчик
document.addEventListener('DOMContentLoaded', originalDOMContentLoaded);