import IdeasApi from '../service/IdeasApi';
import IdeaList from './IdeaList';

const Swal = require('sweetalert2');

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

class IdeaForm {
  constructor() {
    this.formModal = document.getElementById('form-modal');
  }

  addEventListeners() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();

    localStorage.setItem('user', this.form.elements.author.value)

    const idea = {
      text: this.form.elements.text.value,
      tag: this.form.elements.tag.value,
      author: this.form.elements.author.value,
    };

    const isEmptyField = Object.values(idea).some((elem) => !elem);

    if (isEmptyField) {
      Swal.fire({
        text: 'Pleade fill all fields',
        icon: 'error',
        confirmButtonText: 'Confirn',
      });
      return;
    }

    try {
      Swal.showLoading();
      const newIdea = await IdeasApi.createIdea(idea);
      const list = new IdeaList();
      Toast.fire({
        icon: 'success',
        title: 'Idea has been added',
      });
      list.addIdeaToList(newIdea);
    } catch (error) {
      console.log(error);
    }

    this.form.elements.text.value = '';
    this.form.elements.tag.value = '';
    this.form.elements.author.value = '';

    this.render()

    document.getElementById('modal').style.display = 'none';
  }

  isUser() {
    return localStorage.getItem('user')
      ? localStorage.getItem('user')
      : ''
  }

  render() {
    this.formModal.innerHTML = `
      <form id='idea-form'>
        <div class='form-control'>
          <label for='idea-text'>Enter a Username</label>
          <input type='text' name='author' id='author' value=${this.isUser()} />
        </div>
        <div class='form-control'>
          <label for='idea-text'>What's Your Idea?</label>
          <textarea name='text' id='idea-text'></textarea>
        </div>
        <div class='form-control'>
          <label for='tag'>Tag</label>
          <input type='text' name='tag' id='tag' />
        </div>
        <button class='btn' type='submit' id='submit'>
          Submit
        </button>
      </form>
    `;

    this.form = document.getElementById('idea-form');
    this.addEventListeners();
  }
}

export default IdeaForm;
