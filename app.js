// Slide management
let currentSlide = 1;
const totalSlides = 15;
let isAnimating = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideShow();
    setupKeyboardNavigation();
    setupClickNavigation();
    animateCurrentSlide();
});

// Initialize slide show
function initializeSlideShow() {
    updateSlideVisibility();
    updateNavigationState();
    updateSlideIndicators();
}

// Setup click navigation
function setupClickNavigation() {
    // Navigation buttons
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            previousSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
        });
    }
    
    // Setup slide indicators with proper event delegation
    setupSlideIndicators();
}

// Setup slide indicators with proper event handling
function setupSlideIndicators() {
    const indicatorsContainer = document.querySelector('.slide-indicators');
    if (!indicatorsContainer) return;
    
    // Use event delegation for better performance and reliability
    indicatorsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('indicator')) {
            e.preventDefault();
            e.stopPropagation();
            
            const indicators = Array.from(indicatorsContainer.querySelectorAll('.indicator'));
            const clickedIndex = indicators.indexOf(e.target);
            
            if (clickedIndex !== -1 && clickedIndex + 1 !== currentSlide) {
                goToSlide(clickedIndex + 1);
            }
        }
    });
    
    // Also add individual listeners as backup
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (index + 1 !== currentSlide) {
                goToSlide(index + 1);
            }
        });
    });
}

// Navigate to next slide
function nextSlide() {
    if (isAnimating || currentSlide >= totalSlides) return;
    
    isAnimating = true;
    currentSlide++;
    updateSlideVisibility();
    updateNavigationState();
    updateSlideIndicators();
    animateCurrentSlide();
    
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

// Navigate to previous slide
function previousSlide() {
    if (isAnimating || currentSlide <= 1) return;
    
    isAnimating = true;
    currentSlide--;
    updateSlideVisibility();
    updateNavigationState();
    updateSlideIndicators();
    animateCurrentSlide();
    
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

// Go to specific slide
function goToSlide(slideNumber) {
    if (isAnimating || slideNumber === currentSlide || slideNumber < 1 || slideNumber > totalSlides) return;
    
    isAnimating = true;
    currentSlide = slideNumber;
    updateSlideVisibility();
    updateNavigationState();
    updateSlideIndicators();
    animateCurrentSlide();
    
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

// Update slide visibility
function updateSlideVisibility() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        const slideNumber = index + 1;
        slide.classList.remove('active', 'prev');
        
        if (slideNumber === currentSlide) {
            slide.classList.add('active');
        } else if (slideNumber < currentSlide) {
            slide.classList.add('prev');
        }
    });
    updateProgressIndicator();
}

// Update navigation button state
function updateNavigationState() {
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 1;
        prevBtn.style.opacity = currentSlide === 1 ? '0.5' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides;
        nextBtn.style.opacity = currentSlide === totalSlides ? '0.5' : '1';
    }
}

// Update slide indicators
function updateSlideIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        const isActive = index + 1 === currentSlide;
        indicator.classList.toggle('active', isActive);
        indicator.setAttribute('aria-current', isActive ? 'true' : 'false');
        indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
    });
}

// Animate elements when slide becomes active
function animateCurrentSlide() {
    const activeSlide = document.querySelector('.slide.active');
    if (!activeSlide) return;
    
    // Reset any previous animations
    const animatedElements = activeSlide.querySelectorAll('.fade-in, .slide-in-up, .scale-in');
    animatedElements.forEach(el => {
        el.classList.remove('fade-in', 'slide-in-up', 'scale-in');
    });
    
    // Trigger specific animations based on slide
    setTimeout(() => {
        switch(currentSlide) {
            case 1:
                animateHeroSlide(activeSlide);
                break;
            case 2:
                animateExecutiveSummarySlide(activeSlide);
                break;
            case 3:
                animateChallengeSlide(activeSlide);
                break;
            case 4:
                animateMarketSlide(activeSlide);
                break;
            case 5:
                animatePillarsSlide(activeSlide);
                break;
            case 6:
                animateDirectMatchSlide(activeSlide);
                break;
            case 7:
                animateTrackRecordSlide(activeSlide);
                break;
            case 8:
                animateStrategicFitSlide(activeSlide);
                break;
            case 9:
                animateRoleDefinitionSlide(activeSlide);
                break;
            case 10:
                animateResponsibilitiesSlide(activeSlide);
                break;
            case 11:
                animateRoadmapSlide(activeSlide);
                break;
            case 12:
                animateROISlide(activeSlide);
                break;
            case 13:
                animateUrgencySlide(activeSlide);
                break;
            case 14:
                animateCTASlide(activeSlide);
                break;
            case 15:
                animateContactSlide(activeSlide);
                break;
        }
    }, 100);
}

// Hero slide animations
function animateHeroSlide(slide) {
    const title = slide.querySelector('.hero-title');
    const subtitle = slide.querySelector('.hero-subtitle');
    const stats = slide.querySelectorAll('.stat-item');
    
    if (title) title.classList.add('fade-in');
    if (subtitle) {
        setTimeout(() => subtitle.classList.add('slide-in-up'), 300);
    }
    
    stats.forEach((stat, index) => {
        setTimeout(() => {
            stat.classList.add('scale-in');
            animateCounter(stat.querySelector('.stat-number'));
        }, 600 + (index * 200));
    });
}

// Executive Summary slide animations
function animateExecutiveSummarySlide(slide) {
    const mainPoint = slide.querySelector('.main-point');
    const factItems = slide.querySelectorAll('.fact-item');
    
    if (mainPoint) mainPoint.classList.add('fade-in');
    
    factItems.forEach((fact, index) => {
        setTimeout(() => fact.classList.add('scale-in'), 300 + (index * 200));
    });
}

// Challenge slide animations
function animateChallengeSlide(slide) {
    const challengeStats = slide.querySelector('.challenge-stats');
    const challengeCards = slide.querySelectorAll('.challenge-card');
    
    if (challengeStats) {
        challengeStats.classList.add('fade-in');
        const statBigs = challengeStats.querySelectorAll('.stat-big');
        statBigs.forEach(stat => animateCounter(stat));
    }
    
    challengeCards.forEach((card, index) => {
        setTimeout(() => card.classList.add('slide-in-up'), 600 + (index * 200));
    });
}

// Market slide animations
function animateMarketSlide(slide) {
    const marketSections = slide.querySelectorAll('.market-section');
    
    marketSections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in');
            const marketNumbers = section.querySelectorAll('.market-number');
            marketNumbers.forEach(number => animateCounter(number));
        }, index * 400);
    });
}

// Pillars slide animations
function animatePillarsSlide(slide) {
    const pillarCards = slide.querySelectorAll('.pillar-card');
    
    pillarCards.forEach((card, index) => {
        setTimeout(() => card.classList.add('scale-in'), index * 200);
    });
}

// Direct Match slide animations
function animateDirectMatchSlide(slide) {
    const matchItems = slide.querySelectorAll('.match-item');
    
    matchItems.forEach((item, index) => {
        setTimeout(() => item.classList.add('slide-in-up'), index * 300);
    });
}

// Track record slide animations
function animateTrackRecordSlide(slide) {
    const metricCards = slide.querySelectorAll('.metric-card');
    
    metricCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('scale-in');
            const counter = card.querySelector('.metric-value[data-target]');
            if (counter) {
                animateCounter(counter);
            }
        }, index * 150);
    });
}

// Strategic fit slide animations
function animateStrategicFitSlide(slide) {
    const reasonItems = slide.querySelectorAll('.reason-item');
    
    reasonItems.forEach((item, index) => {
        setTimeout(() => item.classList.add('slide-in-up'), index * 100);
    });
}

// Role Definition slide animations
function animateRoleDefinitionSlide(slide) {
    const coreFocus = slide.querySelector('.core-focus');
    const areaCards = slide.querySelectorAll('.area-card');
    
    if (coreFocus) coreFocus.classList.add('fade-in');
    
    areaCards.forEach((card, index) => {
        setTimeout(() => card.classList.add('scale-in'), 300 + (index * 150));
    });
}

// Responsibilities slide animations
function animateResponsibilitiesSlide(slide) {
    const respSections = slide.querySelectorAll('.resp-section');
    
    respSections.forEach((section, index) => {
        setTimeout(() => section.classList.add('slide-in-up'), index * 200);
    });
}

// Roadmap slide animations
function animateRoadmapSlide(slide) {
    const phaseCards = slide.querySelectorAll('.phase-card');
    
    phaseCards.forEach((card, index) => {
        setTimeout(() => card.classList.add('scale-in'), index * 300);
    });
}

// ROI slide animations
function animateROISlide(slide) {
    const roiSections = slide.querySelectorAll('.roi-section');
    const valueCreation = slide.querySelector('.value-creation');
    
    roiSections.forEach((section, index) => {
        setTimeout(() => section.classList.add('fade-in'), index * 400);
    });
    
    if (valueCreation) {
        setTimeout(() => valueCreation.classList.add('scale-in'), 1000);
    }
}

// Urgency slide animations
function animateUrgencySlide(slide) {
    const urgencyCards = slide.querySelectorAll('.urgency-card');
    
    urgencyCards.forEach((card, index) => {
        setTimeout(() => card.classList.add('scale-in'), index * 200);
    });
}

// CTA slide animations
function animateCTASlide(slide) {
    const nextSteps = slide.querySelector('.next-steps');
    const decisionFramework = slide.querySelector('.decision-framework');
    
    if (nextSteps) nextSteps.classList.add('fade-in');
    if (decisionFramework) {
        setTimeout(() => decisionFramework.classList.add('slide-in-up'), 600);
    }
}

// Contact slide animations
function animateContactSlide(slide) {
    const title = slide.querySelector('.cta-title');
    const contactCard = slide.querySelector('.contact-card');
    const finalCTA = slide.querySelector('.final-cta');
    
    if (title) title.classList.add('fade-in');
    if (contactCard) {
        setTimeout(() => contactCard.classList.add('scale-in'), 300);
    }
    if (finalCTA) {
        setTimeout(() => finalCTA.classList.add('slide-in-up'), 600);
    }
}

// Animate counter numbers
function animateCounter(element) {
    if (!element) return;
    
    const target = parseFloat(element.getAttribute('data-target'));
    if (!target && target !== 0) return;
    
    const originalText = element.textContent;
    const prefix = originalText.match(/^[^0-9]*/)[0] || '';
    const suffix = originalText.match(/[^0-9]*$/)[0] || '';
    
    let current = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let displayValue;
        if (target >= 100 && target % 1 === 0) {
            displayValue = Math.floor(current).toLocaleString();
        } else if (target % 1 !== 0) {
            displayValue = current.toFixed(1);
        } else {
            displayValue = Math.floor(current);
        }
        
        element.textContent = prefix + displayValue + suffix;
    }, 16);
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (isAnimating) return;
        
        switch(e.key) {
            case 'ArrowRight':
            case ' ': // Spacebar
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                previousSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides);
                break;
            default:
                // Handle number keys 1-9 for slides 1-9
                const slideNum = parseInt(e.key);
                if (slideNum >= 1 && slideNum <= 9 && slideNum <= totalSlides) {
                    e.preventDefault();
                    goToSlide(slideNum);
                }
                break;
        }
    });
}

// Touch/swipe support for mobile
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    
    const deltaX = startX - endX;
    const deltaY = startY - endY;
    const minSwipeDistance = 50;
    
    // Only process horizontal swipes if they're longer than vertical swipes
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
            // Swipe left - go to next slide
            nextSlide();
        } else {
            // Swipe right - go to previous slide
            previousSlide();
        }
    }
}, { passive: true });

// Auto-advance functionality (optional - can be enabled/disabled)
let autoAdvanceInterval;
const autoAdvanceDelay = 20000; // 20 seconds

function startAutoAdvance() {
    autoAdvanceInterval = setInterval(() => {
        if (currentSlide < totalSlides) {
            nextSlide();
        } else {
            stopAutoAdvance();
        }
    }, autoAdvanceDelay);
}

function stopAutoAdvance() {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
        autoAdvanceInterval = null;
    }
}

// Stop auto-advance when user interacts
document.addEventListener('click', stopAutoAdvance);
document.addEventListener('keydown', stopAutoAdvance);
document.addEventListener('touchstart', stopAutoAdvance);

// Visibility API to pause animations when tab is not active
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopAutoAdvance();
    }
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust any responsive elements if needed
    const windowWidth = window.innerWidth;
    
    if (windowWidth <= 768) {
        // Mobile adjustments
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
});

// Initialize responsive class on load
if (window.innerWidth <= 768) {
    document.body.classList.add('mobile');
}

// Progress indicator for longer presentations
function updateProgressIndicator() {
    const progress = (currentSlide / totalSlides) * 100;
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// Preload next slide content to improve performance
function preloadSlideContent(slideNumber) {
    if (slideNumber < 1 || slideNumber > totalSlides) return;
    
    const slide = document.querySelector(`[data-slide="${slideNumber}"]`);
    if (slide) {
        // Preload any images or heavy content if needed
        const images = slide.querySelectorAll('img');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
}

// Preload adjacent slides
function preloadAdjacentSlides() {
    preloadSlideContent(currentSlide - 1);
    preloadSlideContent(currentSlide + 1);
}

// Make functions globally available
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.goToSlide = goToSlide;