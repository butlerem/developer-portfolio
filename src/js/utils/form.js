// Contact and button handling
export class ContactHandler {
  constructor() {
    this.terminalOutput = document.querySelector('.terminal-output');
  }

  init() {
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

    // Contact links
    document.querySelectorAll('.contact-link').forEach(button => {
      button.addEventListener('click', () => {
        const url = button.dataset.url;
        if (url) {
          this.handleContactClick(url);
        }
      });
    });

    // Social buttons (if any remain)
    document.querySelectorAll('.social-button').forEach(button => {
      button.addEventListener('click', () => {
        const url = button.dataset.url;
        if (url) {
          this.handleContactClick(url);
        }
      });
    });
  }

  handleContactClick(url) {
    // Add terminal message for contact interaction
    if (this.terminalOutput) {
      this.addTerminalMessage('> INITIATING CONNECTION...');
    }

    // Handle different contact methods
    if (url.startsWith('mailto:')) {
      window.location.href = url;
      if (this.terminalOutput) {
        this.addTerminalMessage('> EMAIL CLIENT OPENED');
      }
    } else if (url.startsWith('tel:')) {
      window.location.href = url;
      if (this.terminalOutput) {
        this.addTerminalMessage('> DIALING NUMBER...');
      }
    } else {
      window.open(url, '_blank');
      if (this.terminalOutput) {
        this.addTerminalMessage('> OPENING EXTERNAL LINK');
      }
    }

    // Show success notification
    this.showNotification('CONTACT METHOD ACTIVATED');
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
