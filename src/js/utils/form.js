// Form handling and validation
export class FormHandler {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.terminalOutput = document.querySelector('.terminal-output');
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Add button click handlers
    this.setupButtonHandlers();
  }

  setupButtonHandlers() {
    // Project buttons
    document.querySelectorAll('.project-button').forEach(button => {
      button.addEventListener('click', () => {
        const url = button.dataset.url;
        if (url) {
          window.open(url, '_blank');
        }
      });
    });

    // Social buttons
    document.querySelectorAll('.social-button').forEach(button => {
      button.addEventListener('click', () => {
        const url = button.dataset.url;
        if (url) {
          if (url.startsWith('mailto:')) {
            window.location.href = url;
          } else {
            window.open(url, '_blank');
          }
        }
      });
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Validate
    if (!this.validate(data)) {
      this.addTerminalMessage('> ERROR: INVALID INPUT DETECTED', true);
      return;
    }

    // Add transmitting message
    this.addTerminalMessage('> TRANSMITTING MESSAGE...');

    // Simulate sending (replace with actual backend/EmailJS)
    await this.simulateSend(data);

    // Success message
    this.addTerminalMessage('> MESSAGE TRANSMITTED SUCCESSFULLY', false);
    this.addTerminalMessage('> AWAITING RESPONSE...');

    // Reset form
    this.form.reset();

    // Show notification
    this.showNotification('MESSAGE SENT SUCCESSFULLY');
  }

  validate(data) {
    if (!data.name || data.name.trim().length < 2) {
      return false;
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      return false;
    }

    if (!data.message || data.message.trim().length < 10) {
      return false;
    }

    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async simulateSend(data) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Log to console (replace with actual API call)
    console.log('Form submission:', data);

    // In a real implementation, you would send to a backend or use EmailJS:
    // await emailjs.send('service_id', 'template_id', data);
  }

  addTerminalMessage(message, isError = false) {
    const line = document.createElement('p');
    line.classList.add('terminal-line');
    if (isError) {
      line.style.color = '#ff00a0';
    }
    line.textContent = message;
    this.terminalOutput.appendChild(line);

    // Auto-scroll
    this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
  }

  showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
}
