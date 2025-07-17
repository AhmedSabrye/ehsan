

// Initialize all functionality
function initializeApp() {
  initCountdown();
  initSmoothScrolling();
  initButtonAnimations();
  initScrollAnimations();
  initWhatsAppIntegration();
  initMobileMenu();

}
initializeApp() 

// Countdown Timer Functionality
function initCountdown() {
  const countdownElements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };

  // Set target date (7 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      // Timer has expired
      if (countdownElements.days) countdownElements.days.textContent = "00";
      if (countdownElements.hours) countdownElements.hours.textContent = "00";
      if (countdownElements.minutes)
        countdownElements.minutes.textContent = "00";
      if (countdownElements.seconds)
        countdownElements.seconds.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (countdownElements.days) {
      countdownElements.days.textContent = days.toString().padStart(2, "0");
    }
    if (countdownElements.hours) {
      countdownElements.hours.textContent = hours.toString().padStart(2, "0");
    }
    if (countdownElements.minutes) {
      countdownElements.minutes.textContent = minutes
        .toString()
        .padStart(2, "0");
    }
    if (countdownElements.seconds) {
      countdownElements.seconds.textContent = seconds
        .toString()
        .padStart(2, "0");
    }
  }

  // Update countdown immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Smooth Scrolling for Internal Links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 100; // Account for sticky header

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

function initButtonAnimations() {
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");

  buttons.forEach((button) => {
    // Loading state on form submission
    if (button.type === "submit" || button.classList.contains("submit-btn")) {
      button.addEventListener("click", function (e) {
        if (!this.disabled) {
          this.classList.add("loading");
          this.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
          this.disabled = true;

          // Simulate loading (remove this in production)
          setTimeout(() => {
            this.classList.remove("loading");
            this.disabled = false;
            this.innerHTML = '<i class="fab fa-whatsapp"></i> تم الإرسال';
          }, 2000);
        }
      });
    }
  });
}


// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = "0.1s";
        entry.target.style.animationFillMode = "both";
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".service-card, .step-card, .pricing-card, .hero-stats, .section-title"
  );

  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .service-card:nth-child(2) { animation-delay: 0.2s; }
        .service-card:nth-child(3) { animation-delay: 0.4s; }
        .service-card:nth-child(4) { animation-delay: 0.6s; }
        
        .step-card:nth-child(2) { animation-delay: 0.3s; }
        .step-card:nth-child(3) { animation-delay: 0.6s; }
    `;
  document.head.appendChild(style);
}

// WhatsApp Integration
function initWhatsAppIntegration() {
  const whatsappButtons = document.querySelectorAll(".btn-primary");
  const phoneNumber = "966500000000"; 

  whatsappButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const buttonText = this.textContent.trim();
      let message = "";

      if (buttonText.includes("ابدأ الآن")) {
        message = "مرحبا، أريد البدء في تصميم مبادرتي والحصول على التمويل";
      } else if (buttonText.includes("اطلب الخطة")) {
        message = "مرحبا، أريد الاستفسار عن باقات الخدمات المتاحة";
      } else if (buttonText.includes("تواصل معنا")) {
        message = "مرحبا، أريد الاستفسار عن خدماتكم";
      } else {
        message = "مرحبا، أريد الاستفسار عن خدمات خبر للحصول على المنح";
      }

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;



      window.open(whatsappUrl, "_blank");
    });
  });
}

// Mobile Menu Functionality
function initMobileMenu() {
  const menuIcon = document.querySelector(".menu-icon");
  const navbar = document.querySelector(".navbar");

  if (menuIcon) {
    menuIcon.addEventListener("click", function () {
      this.classList.toggle("active");
      navbar.classList.toggle("menu-open");

      // Animate menu icon
      const icon = this.querySelector("i");
      if (this.classList.contains("active")) {
        icon.className = "fas fa-times";
      } else {
        icon.className = "fas fa-bars";
      }
    });
  }
}


// Scroll to Top Functionality
function initScrollToTop() {
  const scrollButton = document.createElement("button");
  scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollButton.className = "scroll-to-top";
  scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(112, 9, 179, 0.3);
        transform: translateY(100px);
        transition: transform 0.3s ease;
        z-index: 1000;
    `;

  document.body.appendChild(scrollButton);

  // Show/hide button based on scroll position
  const toggleScrollButton = () => {
    if (window.pageYOffset > 300) {
      scrollButton.style.transform = "translateY(0)";
    } else {
      scrollButton.style.transform = "translateY(100px)";
    }
  };

  window.addEventListener("scroll", toggleScrollButton);

  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialize scroll to top
initScrollToTop();


