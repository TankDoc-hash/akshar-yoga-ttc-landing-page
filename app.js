/**
 * AKSHAR YOGA — 40-DAY BASIC LEVEL RESIDENTIAL TTC (LANDING PAGE 3)
 * Aesthetic: "Aman Himalayan Sanctuary" — Editorial Architectural Luxury
 * Core Interactive Controller, Curriculum Tab Switcher, & Ad Conversion Engine
 */

(function () {
  'use strict';

  // --- Configuration ---
  const CONFIG = {
    admissionsPhone: '+918971700394',
    admissionsPhoneAlt: '+919742220607',
    whatsappNumber: '918971700394',
    currency: 'INR',
    defaultTier: 'immersive',
    tiers: {
      'seeker': {
        name: 'Seeker',
        price: '₹1.75 Lakh INR',
        tagline: 'Tuition Only'
      },
      'immersive': {
        name: 'Immersive',
        price: '₹3.5 Lakh INR',
        tagline: 'CSE Residential Experience'
      },
      'ultimate': {
        name: 'Ultimate',
        price: '₹5 Lakh INR',
        tagline: 'Purantha Sanctuary Immersion'
      },
      'basic-ttc': {
        name: 'Seeker',
        price: '₹1.75 Lakh INR',
        tagline: 'Tuition Only'
      },
      'cse-residential': {
        name: 'Immersive',
        price: '₹3.5 Lakh INR',
        tagline: 'CSE Residential Experience'
      },
      'purantha-immersion': {
        name: 'Ultimate',
        price: '₹5 Lakh INR',
        tagline: 'Purantha Sanctuary Immersion'
      },
      'help-choose': {
        name: 'Admissions Guidance',
        price: 'Flexible',
        tagline: 'Help Me Choose'
      }
    }
  };

  // --- Analytics & GTM Layer ---
  window.dataLayer = window.dataLayer || [];

  function trackEvent(eventName, eventParams = {}) {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...getPersistedUTMs(),
      ...eventParams
    };
    window.dataLayer.push(payload);
    console.log(`[Analytics Event: ${eventName}]`, payload);
  }

  // --- UTM & Ad Tracking Persistence ---
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];

  function captureAndPersistUTMs() {
    const urlParams = new URLSearchParams(window.location.search);
    const captured = {};

    UTM_KEYS.forEach(key => {
      if (urlParams.has(key)) {
        captured[key] = urlParams.get(key);
      }
    });

    if (Object.keys(captured).length > 0) {
      try {
        sessionStorage.setItem('ay_utm_params', JSON.stringify(captured));
        localStorage.setItem('ay_utm_params', JSON.stringify(captured));
      } catch (e) {
        console.warn('Storage unavailable for UTM tracking', e);
      }
    }
  }

  function getPersistedUTMs() {
    try {
      const stored = sessionStorage.getItem('ay_utm_params') || localStorage.getItem('ay_utm_params');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  }

  // --- Scroll Tracking & Floating Mobile Bar ---
  let trackedScroll50 = false;
  let trackedScroll90 = false;

  function initScrollTracking() {
    window.addEventListener('scroll', () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrollPercent = (window.scrollY / docHeight) * 100;

      if (!trackedScroll50 && scrollPercent >= 50) {
        trackedScroll50 = true;
        trackEvent('scroll_50', { depth: 50 });
      }

      if (!trackedScroll90 && scrollPercent >= 90) {
        trackedScroll90 = true;
        trackEvent('scroll_90', { depth: 90 });
      }

      // Mobile sticky CTA bar visibility
      const stickyBar = document.getElementById('sticky-mobile-bar');
      if (stickyBar) {
        if (window.scrollY > 380) {
          stickyBar.classList.add('visible');
        } else {
          stickyBar.classList.remove('visible');
        }
      }

      // Header scroll state
      const header = document.querySelector('.site-header');
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }, { passive: true });
  }

  // --- Modal Management ---
  function openModal(modalId) {
    // Close other modals first so they never overlap
    document.querySelectorAll('.modal-backdrop.open').forEach(m => {
      if (m.id !== modalId) {
        closeModal(m.id);
      }
    });

    // Close mobile nav drawer if open
    const mobileNav = document.getElementById('mobile-nav-backdrop');
    if (mobileNav && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
    }

    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Reset application wizard if opening application modal
    if (modalId === 'modal-application') {
      const step1El = document.getElementById('form-step-1');
      const step2El = document.getElementById('form-step-2');
      const formEl = document.getElementById('application-wizard-form');
      const successEl = document.getElementById('application-success-view');
      const submitBtn = formEl ? formEl.querySelector('button[type="submit"]') : null;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Submit Application</span><span class="btn-arrow">→</span>';
      }
      if (step1El) step1El.style.display = 'block';
      if (step2El) step2El.style.display = 'none';
      if (formEl) formEl.style.display = 'block';
      if (successEl) successEl.style.display = 'none';
      const ind1 = document.getElementById('indicator-step-1');
      const ind2 = document.getElementById('indicator-step-2');
      if (ind1) { ind1.classList.add('active'); ind1.classList.remove('completed'); }
      if (ind2) { ind2.classList.remove('active'); ind2.classList.remove('completed'); }
    }

    setTimeout(() => {
      const focusable = modal.querySelector('input:not([type="hidden"]), select, textarea, button');
      if (focusable) focusable.focus();
    }, 120);
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');

    const remainingOpen = document.querySelectorAll('.modal-backdrop.open');
    if (remainingOpen.length === 0) {
      document.body.style.overflow = '';
    }
  }

  function initModals() {
    // Backdrop and close buttons
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('.modal-close-btn')) {
          closeModal(modal.id);
        }
      });
    });

    // Keyboard Escape to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
          closeModal(modal.id);
        });
      }
    });

    // Triggers for Application Modal
    document.querySelectorAll('.trigger-apply-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tier = btn.getAttribute('data-tier') || CONFIG.defaultTier;
        selectPricingTierInForm(tier);
        openModal('modal-application');
        trackEvent('apply_click', { selected_tier: tier, trigger_element: btn.innerText.trim() });
      });
    });

    // Triggers for Talk to Admissions Modal / Callback
    document.querySelectorAll('.trigger-admissions-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('modal-admissions');
        trackEvent('cta_click', { cta_name: 'talk_to_admissions', trigger_element: btn.innerText.trim() });
      });
    });

    // Triggers for Curriculum / Syllabus Modal
    document.querySelectorAll('.trigger-curriculum-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('modal-curriculum');
        trackEvent('curriculum_open');
      });
    });
  }

  // --- Two-Step Application Form Controller ---
  function selectPricingTierInForm(tierKey) {
    const radios = document.querySelectorAll('input[name="preferred_option"]');
    radios.forEach(radio => {
      const card = radio.closest('.option-radio-card');
      if (radio.value === tierKey) {
        radio.checked = true;
        if (card) card.classList.add('selected');
      } else {
        if (card) card.classList.remove('selected');
      }
    });
  }

  function initApplicationForm() {
    const form = document.getElementById('application-wizard-form');
    if (!form) return;

    let hasStarted = false;
    form.addEventListener('focusin', () => {
      if (!hasStarted) {
        hasStarted = true;
        trackEvent('form_start', { form_name: 'ttc_application' });
      }
    });

    // Handle Option Card selection visual feedback
    const optionCards = form.querySelectorAll('.option-radio-card');
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        optionCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          trackEvent('pricing_option_selected', { tier: radio.value });
        }
      });
    });

    // Step 1 to Step 2 Transition
    const nextBtn = document.getElementById('btn-step-1-next');
    const backBtn = document.getElementById('btn-step-2-back');
    const step1El = document.getElementById('form-step-1');
    const step2El = document.getElementById('form-step-2');
    const indicator1 = document.getElementById('indicator-step-1');
    const indicator2 = document.getElementById('indicator-step-2');

    function showStepError(msg, targetInput) {
      let notice = document.getElementById('step-1-error-notice');
      if (!notice && step1El) {
        notice = document.createElement('div');
        notice.id = 'step-1-error-notice';
        notice.style.cssText = 'padding: 10px 14px; margin-bottom: 16px; border-radius: 4px; font-size: 0.84rem; background-color: #FFF5F5; color: #C53030; border: 1px solid #FEB2B2; text-align: center; font-weight: 500;';
        step1El.insertBefore(notice, step1El.firstChild);
      }
      if (notice) {
        notice.innerText = msg;
        notice.style.display = 'block';
      }
      if (targetInput) {
        targetInput.style.borderColor = '#C53030';
        targetInput.focus();
      }
    }

    function clearStepErrors() {
      const notice = document.getElementById('step-1-error-notice');
      if (notice) notice.style.display = 'none';
      const inputs = step1El ? step1El.querySelectorAll('.form-input, .form-select') : [];
      inputs.forEach(inp => inp.style.borderColor = '');
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        clearStepErrors();

        const nameInput = document.getElementById('app-name');
        const emailInput = document.getElementById('app-email');
        const phoneInput = document.getElementById('app-phone');
        const countryInput = document.getElementById('app-country');

        if (!nameInput || !nameInput.value.trim()) {
          showStepError('Please enter your full name to proceed.', nameInput);
          return;
        }

        if (!emailInput || !emailInput.value.trim() || !validateEmail(emailInput.value)) {
          showStepError('Please enter a valid email address.', emailInput);
          return;
        }

        if (!phoneInput || !phoneInput.value.trim() || phoneInput.value.trim().length < 6) {
          showStepError('Please enter a valid phone or WhatsApp number.', phoneInput);
          return;
        }

        if (!countryInput || !countryInput.value) {
          showStepError('Please select your country of residence.', countryInput);
          return;
        }

        step1El.style.display = 'none';
        step2El.style.display = 'block';
        if (indicator1) indicator1.classList.add('completed');
        if (indicator2) indicator2.classList.add('active');
        trackEvent('cta_click', { cta_name: 'application_step_1_complete' });

        const firstStep2 = step2El.querySelector('select, input, button');
        if (firstStep2) firstStep2.focus();
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        step2El.style.display = 'none';
        step1El.style.display = 'block';
        if (indicator1) indicator1.classList.remove('completed');
        if (indicator2) indicator2.classList.remove('active');
      });
    }

    // Form Submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting Application...';
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const utms = getPersistedUTMs();

      const finalPayload = {
        ...data,
        ...utms,
        submittedAt: new Date().toISOString(),
        pageUrl: window.location.href
      };

      try {
        const pastSubmissions = JSON.parse(localStorage.getItem('ay_applications') || '[]');
        pastSubmissions.push(finalPayload);
        localStorage.setItem('ay_applications', JSON.stringify(pastSubmissions));
      } catch (err) {
        console.warn('Could not save application to localStorage', err);
      }

      trackEvent('form_submit', {
        form_name: 'ttc_application',
        applicant_name: data.fullName,
        tier: data.preferred_option,
        country: data.country
      });

      showFormSuccess(data.fullName, data.preferred_option);
    });
  }

  function showFormSuccess(applicantName, selectedTier) {
    const formWizard = document.getElementById('application-wizard-form');
    const successBox = document.getElementById('application-success-view');
    const successNameEl = document.getElementById('success-applicant-name');
    const whatsappBtn = document.getElementById('success-whatsapp-link');

    if (formWizard) formWizard.style.display = 'none';
    if (successBox) successBox.style.display = 'block';
    if (successNameEl) successNameEl.innerText = applicantName || 'Namaste';

    const tierInfo = CONFIG.tiers[selectedTier] || CONFIG.tiers['immersive'];
    const message = encodeURIComponent(
      `Namaste Akshar Yoga Admissions, I have just submitted my application for the 40-Day Basic Residential TTC (${tierInfo.name} Tier - ${tierInfo.price}). My name is ${applicantName}. Could you please guide me on the next steps?`
    );
    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    if (whatsappBtn) {
      whatsappBtn.href = waUrl;
    }

    let redirectNotice = document.getElementById('redirect-countdown-notice');
    if (!redirectNotice && successBox) {
      redirectNotice = document.createElement('p');
      redirectNotice.id = 'redirect-countdown-notice';
      redirectNotice.style.cssText = 'font-size: 0.86rem; color: var(--accent-terracotta); margin-top: 14px; font-weight: 600; text-align: center;';
      successBox.appendChild(redirectNotice);
    }

    let countdown = 3;
    if (redirectNotice) redirectNotice.innerText = `Redirecting you to WhatsApp in ${countdown}s...`;
    const timer = setInterval(() => {
      countdown--;
      if (redirectNotice && countdown > 0) {
        redirectNotice.innerText = `Redirecting you to WhatsApp in ${countdown}s...`;
      } else if (countdown <= 0) {
        clearInterval(timer);
        if (redirectNotice) redirectNotice.innerText = 'Connecting to WhatsApp...';
        window.location.href = waUrl;
      }
    }, 1000);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // --- Admissions Callback & Syllabus Form ---
  function initAdmissionsForm() {
    const callbackForm = document.getElementById('admissions-callback-form');
    if (!callbackForm) return;

    callbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = callbackForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Connecting...';
      }

      const formData = new FormData(callbackForm);
      const data = Object.fromEntries(formData.entries());

      trackEvent('form_submit', {
        form_name: 'admissions_callback',
        name: data.callbackName,
        phone: data.callbackPhone
      });

      const message = encodeURIComponent(
        `Namaste Akshar Yoga Admissions, I requested information / 200h syllabus regarding the 40-Day Basic Residential TTC. My name is ${data.callbackName || ''}, phone ${data.callbackPhone || ''}.`
      );
      const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;

      callbackForm.innerHTML = `
        <div class="modal-success-state">
          <div class="success-icon-wrap">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 class="serif" style="font-size: 1.6rem; margin-bottom: 0.5rem;">Request Received</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.25rem;">Thank you, <strong>${data.callbackName || ''}</strong>. Our admissions acharya will contact you directly.</p>
          <a href="${waUrl}" class="btn btn-whatsapp btn-full">
            Chat on WhatsApp Directly →
          </a>
          <p id="callback-redirect-timer" style="font-size: 0.82rem; color: var(--accent-terracotta); margin-top: 12px; font-weight: 600; text-align: center;">
            Redirecting to WhatsApp in 3s...
          </p>
        </div>
      `;

      let sec = 3;
      const cbTimer = setInterval(() => {
        sec--;
        const timerEl = document.getElementById('callback-redirect-timer');
        if (timerEl && sec > 0) {
          timerEl.innerText = `Redirecting to WhatsApp in ${sec}s...`;
        } else if (sec <= 0) {
          clearInterval(cbTimer);
          window.location.href = waUrl;
        }
      }, 1000);
    });
  }

  // --- Curriculum Tab Switcher (Section 3: 5 Core Pillars) ---
  function initCurriculumTabs() {
    const tabButtons = document.querySelectorAll('.curriculum-tab-btn');
    const tabPanels = document.querySelectorAll('.curriculum-panel');

    if (!tabButtons.length || !tabPanels.length) return;

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }

        trackEvent('curriculum_tab_select', { tab_id: targetId, tab_name: btn.innerText.trim() });
      });
    });
  }

  // --- Accessible FAQ Accordion ---
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const button = item.querySelector('.faq-question-btn');
      if (!button) return;

      button.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items for refined architectural scan
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-question-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            const icon = other.querySelector('.faq-toggle-icon');
            if (icon) icon.innerText = '+';
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          button.setAttribute('aria-expanded', 'false');
          const icon = item.querySelector('.faq-toggle-icon');
          if (icon) icon.innerText = '+';
        } else {
          item.classList.add('active');
          button.setAttribute('aria-expanded', 'true');
          const icon = item.querySelector('.faq-toggle-icon');
          if (icon) icon.innerText = '−';
          trackEvent('cta_click', { cta_name: 'faq_expanded', question: button.innerText.trim() });
        }
      });
    });
  }

  // --- WhatsApp & Direct Click Tracking ---
  function initDirectClickTracking() {
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('whatsapp_click', { link_url: link.href, link_text: link.innerText.trim() });
      });
    });

    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('phone_click', { phone_number: link.href, link_text: link.innerText.trim() });
      });
    });
  }

  // --- Mobile Off-Canvas Navigation Drawer ---
  function initMobileNav() {
    const toggleBtn = document.getElementById('btn-mobile-nav-toggle');
    const closeBtn = document.getElementById('btn-mobile-nav-close');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    if (!backdrop) return;

    function openNav() {
      backdrop.style.display = 'block';
      void backdrop.offsetWidth;
      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (!backdrop.classList.contains('open')) {
          backdrop.style.display = 'none';
        }
      }, 350);
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', openNav);
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', closeNav);
    }

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeNav();
    });

    backdrop.querySelectorAll('.mobile-nav-item').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

  // --- Active Nav Link on Scroll (Intersection Observer) ---
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      threshold: 0.35,
      rootMargin: '-76px 0px -40% 0px'
    });

    sections.forEach(sec => observer.observe(sec));
  }

  // --- Initialization on DOM Ready ---
  document.addEventListener('DOMContentLoaded', () => {
    captureAndPersistUTMs();
    initScrollTracking();
    initMobileNav();
    initModals();
    initApplicationForm();
    initAdmissionsForm();
    initCurriculumTabs();
    initFAQ();
    initDirectClickTracking();
    initScrollSpy();

    trackEvent('page_view', { page_title: document.title, aesthetic: 'Aman Himalayan Sanctuary' });
  });

})();
