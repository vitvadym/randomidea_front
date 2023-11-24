class Modal {
  constructor() {
    this.modal = document.getElementById('modal');
    this.buttonAdd = document.getElementById('modal-btn');
    this.addEventListeners();
  }

  showModal() {
    this.modal.style.display = 'block';
  };

  closeModal(event) {
    if (event.target.classList.contains('modal')) {
      this.modal.style.display = 'none';
    }
  };

  addEventListeners() {
    this.buttonAdd.addEventListener('click', this.showModal.bind(this));
    window.addEventListener('click', this.closeModal.bind(this));
  }
}

export default Modal;
