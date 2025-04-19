// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Add animation to the shapes in the hero section
    const shapes = document.querySelectorAll(".shape")
  
    shapes.forEach((shape) => {
      // Random initial position within a small range
      const randomX = Math.random() * 20 - 10 // -10 to 10
      const randomY = Math.random() * 20 - 10 // -10 to 10
  
      // Apply initial random position
      shape.style.transform += ` translate(${randomX}px, ${randomY}px)`
  
      // Create animation
      setInterval(() => {
        // Generate new random values for movement
        const moveX = Math.random() * 20 - 10
        const moveY = Math.random() * 20 - 10
  
        // Apply the animation
        shape.style.transition = "transform 3s ease-in-out"
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`
  
        // For square shapes, add rotation
        if (shape.classList.contains("square-yellow") || shape.classList.contains("square-blue")) {
          const rotation = Math.random() * 60 - 30 // -30 to 30 degrees
          shape.style.transform += ` rotate(${rotation + 45}deg)` // Add 45 because they start rotated
        }
      }, 3000) // Change position every 3 seconds
    })
  
    // Navigation active state
    const navIcons = document.querySelectorAll(".nav-icon")
  
    navIcons.forEach((icon) => {
      icon.addEventListener("click", function (e) {
        e.preventDefault()
  
        // Remove active class from all icons
        navIcons.forEach((i) => i.classList.remove("active"))
  
        // Add active class to clicked icon
        this.classList.add("active")
      })
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  
    // Contact form handling
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      // Add input focus effects
      const formInputs = contactForm.querySelectorAll("input, textarea")
  
      formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener("focus", function() {
          this.parentElement.classList.add("input-focused")
        })
  
        // Remove focus effect
        input.addEventListener("blur", function() {
          if (this.value === "") {
            this.parentElement.classList.remove("input-focused")
          }
        })
  
        // Check if input has value on page load
        if (input.value !== "") {
          input.parentElement.classList.add("input-focused")
        }
      })
  
      // Form submission with validation
      contactForm.addEventListener("submit", function(e) {
        e.preventDefault()
  
        // Get form values
        const fullName = document.getElementById("fullName").value.trim()
        const email = document.getElementById("email").value.trim()
        const subject = document.getElementById("subject").value.trim()
        const message = document.getElementById("message").value.trim()
  
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
        // Simple validation
        if (!fullName) {
          showFormError("fullName", "Please enter your full name")
          return
        } else {
          clearFormError("fullName")
        }
  
        if (!email) {
          showFormError("email", "Please enter your email address")
          return
        } else if (!emailRegex.test(email)) {
          showFormError("email", "Please enter a valid email address")
          return
        } else {
          clearFormError("email")
        }
  
        if (!message) {
          showFormError("message", "Please enter your message")
          return
        } else {
          clearFormError("message")
        }
  
        // Show loading state
        const submitBtn = contactForm.querySelector(".send-message-btn")
        submitBtn.disabled = true
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...'
  
        // Prepare email template parameters
        const templateParams = {
          from_name: fullName,
          from_email: email,
          subject: subject,
          message: `
Name: ${fullName}
Email: ${email}
Subject: ${subject}

Message:
${message}
          `,
          to_email: 'sharnadeep2812@gmail.com'
        }
  
        // Send email using EmailJS
        emailjs.send('service_ezkfokh', 'template_3u645vj', templateParams)
          .then(function(response) {
            console.log('SUCCESS!', response.status, response.text)
            // Show success message
            const formWrapper = contactForm.closest(".contact-form")
            formWrapper.innerHTML = `
              <div class="form-success">
                <div class="success-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out, ${fullName}. I'll get back to you as soon as possible.</p>
                <button class="send-another-btn" onclick="location.reload()">SEND ANOTHER MESSAGE</button>
              </div>
            `

            // Add success styles
            const style = document.createElement('style')
            style.textContent = `
              .form-success {
                text-align: center;
                padding: 40px 20px;
                background: rgba(42, 42, 42, 0.8);
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                animation: slideIn 0.5s ease;
              }

              @keyframes slideIn {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }

              .success-icon {
                font-size: 70px;
                color: #4caf50;
                margin-bottom: 25px;
                animation: scaleIn 0.5s ease;
              }

              @keyframes scaleIn {
                0% { transform: scale(0); }
                70% { transform: scale(1.2); }
                100% { transform: scale(1); }
              }

              .form-success h3 {
                color: #fff;
                font-size: 24px;
                margin-bottom: 15px;
                font-weight: 600;
              }

              .form-success p {
                color: #aaa;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 30px;
              }

              .send-another-btn {
                background: linear-gradient(135deg, #5d3bee, #4169e1);
                color: #fff;
                border: none;
                padding: 15px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                font-size: 16px;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
              }

              .send-another-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 20px rgba(93, 59, 238, 0.3);
              }

              .form-error {
                text-align: center;
                padding: 40px 20px;
                background: rgba(42, 42, 42, 0.8);
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                animation: slideIn 0.5s ease;
              }

              .error-icon {
                font-size: 70px;
                color: #ff5252;
                margin-bottom: 25px;
                animation: scaleIn 0.5s ease;
              }

              .form-error h3 {
                color: #fff;
                font-size: 24px;
                margin-bottom: 15px;
                font-weight: 600;
              }

              .form-error p {
                color: #aaa;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 30px;
              }
            `
            document.head.appendChild(style)
          })
          .catch(function(error) {
            console.log('FAILED...', error)
            // Show error message
            const formWrapper = contactForm.closest(".contact-form")
            formWrapper.innerHTML = `
              <div class="form-error">
                <div class="error-icon">
                  <i class="fas fa-exclamation-circle"></i>
                </div>
                <h3>Message Failed to Send</h3>
                <p>Sorry, there was an error sending your message. Please try again later.</p>
                <button class="send-another-btn" onclick="location.reload()">TRY AGAIN</button>
              </div>
            `
          })
      })
  
      // Helper functions for form validation
      function showFormError(inputId, message) {
        const inputElement = document.getElementById(inputId)
        const errorElement = inputElement.parentElement.querySelector(".error-message")
  
        // Create error message element if it doesn't exist
        if (!errorElement) {
          const errorDiv = document.createElement("div")
          errorDiv.className = "error-message"
          errorDiv.textContent = message
          inputElement.parentElement.appendChild(errorDiv)
  
          // Add error styles
          const style = document.createElement('style')
          style.textContent = `
            .error-message {
              color: #ff5252;
              font-size: 12px;
              margin-top: 5px;
              animation: fadeIn 0.3s ease;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .form-group.has-error input,
            .form-group.has-error textarea {
              border-color: #ff5252;
            }
          `
          document.head.appendChild(style)
        } else {
          errorElement.textContent = message
        }
  
        inputElement.parentElement.classList.add("has-error")
        inputElement.focus()
      }
  
      function clearFormError(inputId) {
        const inputElement = document.getElementById(inputId)
        const errorElement = inputElement.parentElement.querySelector(".error-message")
  
        if (errorElement) {
          errorElement.remove()
        }
  
        inputElement.parentElement.classList.remove("has-error")
      }
    }
  })

  // Add scroll animation to timeline items
document.addEventListener("DOMContentLoaded", () => {
  // Timeline items animation on scroll
  const timelineItems = document.querySelectorAll(".timeline-item")

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // Function to add animation class when element is in viewport
  function checkTimelineVisibility() {
    timelineItems.forEach((item) => {
      if (isInViewport(item)) {
        item.classList.add("visible")
      }
    })
  }

  // Add CSS for animation
  const style = document.createElement("style")
  style.innerHTML = `
        .timeline-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .timeline-item.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item.left {
            transform: translateX(-30px);
        }
        
        .timeline-item.right {
            transform: translateX(30px);
        }
        
        .timeline-item.left.visible,
        .timeline-item.right.visible {
            transform: translateX(0);
        }
        
        @media (max-width: 992px) {
            .timeline-item.left,
            .timeline-item.right {
                transform: translateY(30px);
            }
            
            .timeline-item.left.visible,
            .timeline-item.right.visible {
                transform: translateY(0);
            }
        }
    `
})

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-icon');
    
    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section id from the href attribute
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Smooth scroll to the target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-icon');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});



