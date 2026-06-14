/* ==========================================================================
   BRIGHTCARE DENTAL STUDIO - INTERACTIVE FRONTLINE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. PAGE LOADER
  // ==========================================
  const pageLoader = document.querySelector('.page-loader');
  
  // Hide loader after assets are loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (pageLoader) {
        pageLoader.classList.add('hidden');
      }
    }, 600); // Small delay for visual aesthetic
  });
  
  // Fallback in case load event takes too long
  setTimeout(() => {
    if (pageLoader && !pageLoader.classList.contains('hidden')) {
      pageLoader.classList.add('hidden');
    }
  }, 3000);


  // ==========================================
  // 2. STICKY HEADER & MOBILE NAVIGATION
  // ==========================================
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Toggle Header Scrolled State
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle Mobile Menu
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      
      // Update toggle icon
      if (navMenu.classList.contains('active')) {
        navToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      } else {
        navToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }

  // Close Mobile Menu on Link Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  });


  // ==========================================
  // 3. ACTIVE NAVIGATION HIGHLIGHTER ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  
  const scrollActive = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - (header.offsetHeight + 10);
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
      
      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  };
  
  window.addEventListener('scroll', scrollActive);


  // ==========================================
  // 4. ACCORDION FAQ
  // ==========================================
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const collapse = item.querySelector('.accordion-collapse');
      const isActive = item.classList.contains('active');
      
      // Close all other accordions
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-collapse').style.maxHeight = '0px';
        }
      });
      
      // Toggle current accordion
      if (isActive) {
        item.classList.remove('active');
        collapse.style.maxHeight = '0px';
      } else {
        item.classList.add('active');
        collapse.style.maxHeight = collapse.scrollHeight + 'px';
      }
    });
  });


  // ==========================================
  // 5. BEFORE/AFTER SMILE SLIDER
  // ==========================================
  const smileSlider = document.querySelector('.smile-slider-bar');
  const smileAfterImage = document.querySelector('.smile-image-after');
  const smileHandle = document.querySelector('.smile-slider-handle');
  const smileWrapper = document.querySelector('.smile-slider-wrapper');
  
  if (smileWrapper && smileSlider && smileAfterImage && smileHandle) {
    const moveSlider = (clientX) => {
      const rect = smileWrapper.getBoundingClientRect();
      const position = clientX - rect.left;
      let percentage = (position / rect.width) * 100;
      
      // Boundaries check
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      
      // Apply new styling
      smileSlider.style.left = `${percentage}%`;
      smileHandle.style.left = `${percentage}%`;
      smileAfterImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0% 100%)`;
    };
    
    // Mouse events
    smileWrapper.addEventListener('mousemove', (e) => {
      moveSlider(e.clientX);
    });
    
    // Touch events (for mobile devices)
    smileWrapper.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        moveSlider(e.touches[0].clientX);
      }
    });
  }


  // ==========================================
  // 6. DETAIL MODAL (SERVICES & DOCTORS)
  // ==========================================
  const modal = document.getElementById('detailModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalIcon = document.querySelector('.modal-icon-box');
  const modalTitle = document.querySelector('.modal-title');
  const modalOverview = document.querySelector('#modalOverview');
  const modalBenefitsList = document.querySelector('#modalBenefitsList');
  const modalDisclaimer = document.querySelector('#modalDisclaimer');
  const modalBookButton = document.querySelector('#modalBookButton');
  
  // Services detailed data mapping
  const serviceData = {
    'general-dentistry': {
      title: 'General Dentistry',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      overview: 'Comprehensive dental examinations, professional assessments, digital x-rays, and customized dental health plans to protect your overall oral hygiene and address issues before they escalate.',
      benefits: [
        'Early detection of tooth decay and gum diseases.',
        'Personalized treatment plans tailored to your lifestyle.',
        'High-resolution, safe digital diagnostics with minimal radiation.',
        'Thorough checks including oral cancer screenings.'
      ],
      disclaimer: 'We recommend scheduling general dental checkups once every 6 months to maintain optimal health.'
    },
    'teeth-cleaning': {
      title: 'Teeth Cleaning & Polishing',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      overview: 'Advanced scaling and root planing techniques to eradicate plaque, tartar, and surface stains, coupled with medical-grade fluoride polishing for smooth, glistening enamel.',
      benefits: [
        'Eradicates persistent tartar that regular brushing cannot remove.',
        'Improves breath freshness and reverses early-stage gingivitis.',
        'Removes coffee, tea, and tobacco discoloration.',
        'Fortifies tooth structure using high-grade mineral treatments.'
      ],
      disclaimer: 'Professional scaling is essential to prevent chronic periodontal disease and tooth loss.'
    },
    'dental-implants': {
      title: 'Dental Implants',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>`,
      overview: 'State-of-the-art titanium roots surgically integrated into your jawbone, topped with custom-sculpted, medical-grade porcelain crowns that blend indistinguishably from natural teeth.',
      benefits: [
        'Permanent, lifetime tooth replacement solution.',
        'Prevents jawbone shrinkage and maintains facial muscle structure.',
        'Restores 100% biting and chewing capacity.',
        'No damage to neighboring teeth (unlike dental bridges).'
      ],
      disclaimer: 'Requires custom digital scans and initial consultation to assess bone density suitability.'
    },
    'braces-orthodontics': {
      title: 'Braces & Orthodontics',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/></svg>`,
      overview: 'Comprehensive correction of misaligned teeth and jaw discrepancies using advanced self-ligating metal braces, clear ceramic systems, or premium invisible aligners.',
      benefits: [
        'Achieve a perfectly symmetrical, functional smile.',
        'Alleviates jaw joint pressure, correcting speech or chewing issues.',
        'Boosts long-term confidence and facilitates easier brushing.',
        'Options available for children, teens, and working professionals.'
      ],
      disclaimer: 'Alignment duration varies based on clinical complexity, generally ranging from 6 to 24 months.'
    },
    'root-canal': {
      title: 'Root Canal Treatment',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
      overview: 'Endodontic therapy to save severely infected or decaying teeth. The damaged pulp is painlessly removed, the interior canal sterilized, filled, and sealed to restore full function.',
      benefits: [
        'Relieves chronic tooth pain and sensitivity permanently.',
        'Saves the natural tooth from extraction.',
        'Prevents infection from spreading into the jaw and surrounding tissues.',
        'Painless procedures conducted under highly efficient local anesthesia.'
      ],
      disclaimer: 'A protective crown is highly recommended after root canal therapy to reinforce the structural integrity.'
    },
    'cosmetic-dentistry': {
      title: 'Cosmetic Dentistry',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
      overview: 'Aesthetic smile design incorporating ultra-thin porcelain veneers, composite bonding, and dental contouring to correct chips, gaps, and severe staining.',
      benefits: [
        'Instantly corrects tooth chips, cracks, and minor gaps.',
        'Designed to match your facial profile and skin tone perfectly.',
        'Stain-resistant materials ensuring long-lasting radiance.',
        'Minimally invasive options available.'
      ],
      disclaimer: 'Porcelain veneers require a personalized smile blueprint during your initial mock-up appointment.'
    },
    'teeth-whitening': {
      title: 'Teeth Whitening',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
      overview: 'In-chair teeth whitening utilizing clinical-grade hydrogen peroxide gels activated by specialized light technology, combined with at-home touch-up kits.',
      benefits: [
        'Lightens teeth up to 8 shades in a single, 60-minute session.',
        'Safe, monitored application minimizing tooth sensitivity.',
        'Custom trays fabricated for precise maintenance at home.',
        'Provides instant, dramatic improvements for special events.'
      ],
      disclaimer: 'Best results are obtained immediately following a professional scaling and polishing session.'
    },
    'pediatric-dentistry': {
      title: 'Pediatric Dentistry',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      overview: 'Compassionate, gentle dental care specialized for infants, toddlers, and teens in a playful, comforting, stress-free clinical environment.',
      benefits: [
        'Establishes healthy oral habits and reduces dental anxiety.',
        'Fissure sealants and fluoride applications to prevent cavities.',
        'Monitors bite progression for timely orthodontic interventions.',
        'Child-friendly clinicians who turn dental checkups into fun visits.'
      ],
      disclaimer: 'We recommend a child\'s first dental visit by their first birthday to track early development.'
    },
    'gum-treatment': {
      title: 'Gum Treatment',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M12 7v5l3 3"/></svg>`,
      overview: 'Periodontal therapy addressing gum recession, bleeding, and deep pocket infections using laser ablation and localized antibiotic therapies.',
      benefits: [
        'Halts active bone loss and prevents tooth mobility.',
        'Removes underlying pockets of bacteria beneath the gum line.',
        'Eliminates chronic bleeding, swelling, and gum soreness.',
        'Significantly improves systemic health links (diabetes, heart health).'
      ],
      disclaimer: 'Requires careful clinical pocket depth charting during the diagnosis phase.'
    },
    'emergency-care': {
      title: 'Emergency Dental Care',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
      overview: 'Immediate, same-day intervention for knocked-out teeth, severe toothaches, facial swelling, broken restorations, or oral trauma.',
      benefits: [
        'Same-day priority bookings to eliminate severe pain.',
        'Immediate stabilization of dislodged teeth to prevent loss.',
        'Quick prescriptions and treatment to contain dental infections.',
        'On-call dentists prepared to manage trauma cases.'
      ],
      disclaimer: 'For after-hours dental emergencies, please call our direct emergency hotline at (555) 999-8800.'
    }
  };
  
  // Open Modal function
  const openModal = (serviceId) => {
    const data = serviceData[serviceId];
    if (!data) return;
    
    // Set content
    modalIcon.innerHTML = data.icon;
    modalTitle.textContent = data.title;
    modalOverview.textContent = data.overview;
    modalDisclaimer.textContent = data.disclaimer;
    
    // Build benefits list
    modalBenefitsList.innerHTML = '';
    data.benefits.forEach(benefit => {
      const li = document.createElement('li');
      li.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${benefit}</span>
      `;
      modalBenefitsList.appendChild(li);
    });
    
    // Config modal Booking CTA
    modalBookButton.setAttribute('data-service-select', serviceId);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop scrolling behind modal
  };
  
  // Close Modal function
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  };
  
  // Wire up service cards
  const learnMoreBtns = document.querySelectorAll('.service-learn-more');
  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = btn.getAttribute('data-service');
      openModal(serviceId);
    });
  });
  
  // Wire close actions
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  
  // Click outside to close
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Escape key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Modal CTA redirection to appointment form
  if (modalBookButton) {
    modalBookButton.addEventListener('click', () => {
      const serviceSelect = modalBookButton.getAttribute('data-service-select');
      const dropdown = document.getElementById('bookingService');
      
      if (dropdown) {
        // Map service ids to dropdown indices/values
        const mapping = {
          'general-dentistry': 'general',
          'teeth-cleaning': 'cleaning',
          'dental-implants': 'implants',
          'braces-orthodontics': 'orthodontics',
          'root-canal': 'root-canal',
          'cosmetic-dentistry': 'cosmetic',
          'teeth-whitening': 'whitening',
          'pediatric-dentistry': 'pediatric',
          'gum-treatment': 'gum',
          'emergency-care': 'emergency'
        };
        
        dropdown.value = mapping[serviceSelect] || 'general';
      }
      
      closeModal();
      
      // Smooth scroll to booking
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


  // ==========================================
  // 7. FORM VALIDATION & BOOKING MECHANISM
  // ==========================================
  const bookingForm = document.getElementById('mainBookingForm');
  const bookingSuccess = document.querySelector('.booking-success-message');
  
  // Quick Widget Hero Form Redirection
  const quickWidgetForm = document.getElementById('quickWidgetForm');
  if (quickWidgetForm) {
    quickWidgetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const qName = document.getElementById('widgetName').value.trim();
      const qPhone = document.getElementById('widgetPhone').value.trim();
      const qService = document.getElementById('widgetService').value;
      
      // Populate booking form fields
      document.getElementById('bookingName').value = qName;
      document.getElementById('bookingPhone').value = qPhone;
      document.getElementById('bookingService').value = qService;
      
      // Scroll to main booking section
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        
        // Visual cue: focus email field to guide patient next
        setTimeout(() => {
          document.getElementById('bookingEmail').focus();
        }, 800);
      }
    });
  }

  // Pre-fill doctor select buttons inside Doctor profiles
  const docBookBtns = document.querySelectorAll('.doctor-book-btn');
  docBookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const doctorName = btn.getAttribute('data-doctor');
      const msgField = document.getElementById('bookingMessage');
      
      if (msgField) {
        msgField.value = `I would like to request an appointment specifically with Dr. ${doctorName}.`;
      }
      
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
          document.getElementById('bookingName').focus();
        }, 800);
      }
    });
  });

  // Main Form Error Checking
  const showError = (inputEl, message) => {
    const group = inputEl.closest('.form-group');
    group.classList.add('has-error');
    const errMsg = group.querySelector('.form-error-msg');
    errMsg.textContent = message;
  };
  
  const clearError = (inputEl) => {
    const group = inputEl.closest('.form-group');
    group.classList.remove('has-error');
  };
  
  // Real-time validation checks on blur
  const validateName = (el) => {
    if (el.value.trim() === '') {
      showError(el, 'Please enter your full name.');
      return false;
    }
    clearError(el);
    return true;
  };
  
  const validatePhone = (el) => {
    const phoneVal = el.value.trim();
    const phonePattern = /^[+]?[0-9\s-]{7,15}$/;
    if (phoneVal === '') {
      showError(el, 'Please enter your phone number.');
      return false;
    } else if (!phonePattern.test(phoneVal)) {
      showError(el, 'Please enter a valid phone number (e.g. +1 555-0199).');
      return false;
    }
    clearError(el);
    return true;
  };
  
  const validateEmail = (el) => {
    const emailVal = el.value.trim();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (emailVal === '') {
      showError(el, 'Please enter your email address.');
      return false;
    } else if (!emailPattern.test(emailVal)) {
      showError(el, 'Please enter a valid email address.');
      return false;
    }
    clearError(el);
    return true;
  };
  
  const validateDate = (el) => {
    if (el.value === '') {
      showError(el, 'Please select your preferred date.');
      return false;
    }
    
    // Prevent booking past dates
    const selected = new Date(el.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selected < today) {
      showError(el, 'Appointments cannot be scheduled in the past.');
      return false;
    }
    
    clearError(el);
    return true;
  };
  
  // Attach real-time validation events
  const inputName = document.getElementById('bookingName');
  const inputPhone = document.getElementById('bookingPhone');
  const inputEmail = document.getElementById('bookingEmail');
  const inputDate = document.getElementById('bookingDate');
  
  if (inputName) inputName.addEventListener('blur', () => validateName(inputName));
  if (inputPhone) inputPhone.addEventListener('blur', () => validatePhone(inputPhone));
  if (inputEmail) inputEmail.addEventListener('blur', () => validateEmail(inputEmail));
  if (inputDate) inputDate.addEventListener('blur', () => validateDate(inputDate));
  
  // Submit action
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validate everything
      const isNameValid = validateName(inputName);
      const isPhoneValid = validatePhone(inputPhone);
      const isEmailValid = validateEmail(inputEmail);
      const isDateValid = validateDate(inputDate);
      
      if (isNameValid && isPhoneValid && isEmailValid && isDateValid) {
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state on button
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<svg class="loader-spinner" style="width:20px;height:20px;margin-bottom:0;border-width:2px;display:inline-block;vertical-align:middle;margin-right:8px;" viewBox="0 0 24 24"></svg> Processing...`;
        
        // Simulate API check
        setTimeout(() => {
          // Re-enable button
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          
          // Populate success message
          const nameVal = inputName.value.trim();
          const dateVal = inputDate.value;
          const serviceSelect = document.getElementById('bookingService');
          const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
          
          // Style booking confirmation details
          document.getElementById('successPatientName').textContent = nameVal;
          document.getElementById('successService').textContent = serviceName;
          document.getElementById('successDate').textContent = new Date(dateVal).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          
          // Transition card layout
          bookingForm.style.display = 'none';
          bookingSuccess.style.display = 'block';
          
          // Scroll success screen slightly into view
          document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
          
        }, 1500); // 1.5 seconds delay simulation
      }
    });
  }

  // Handle book again / reset form
  const resetFormBtn = document.getElementById('btnResetBooking');
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      if (bookingForm && bookingSuccess) {
        bookingForm.reset();
        bookingSuccess.style.display = 'none';
        bookingForm.style.display = 'block';
      }
    });
  }


  // ==========================================
  // 8. BACK TO TOP BUTTON
  // ==========================================
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // ==========================================
  // 9. DYNAMIC DATES AND FOOTER COPYRIGHT
  // ==========================================
  const copyrightYear = document.getElementById('copyrightYear');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
  
  // Restrict date picker from booking past dates directly in HTML
  if (inputDate) {
    const todayStr = new Date().toISOString().split('T')[0];
    inputDate.setAttribute('min', todayStr);
  }

});
