// Notification Toast System
export class Notification {
  constructor() {
    this.element = document.getElementById('notification');
  }

  show(message, duration = 3000) {
    this.element.textContent = message;
    this.element.classList.add('show');

    setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide() {
    this.element.classList.remove('show');
  }
}
