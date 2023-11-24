import IdeaService from '../service/IdeasApi';
import { Toast } from './IdeaForm';

class IdeaList {
  constructor() {
    this.listContainer = document.getElementById('idea-list');
    this.ideas = [];
    this.getIdeas();
  }

  eventLisneners() {
    this.listContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('fa-times')) {
        event.stopImmediatePropagation();
        const id =
          event.target.parentElement.parentElement.getAttribute('data-id');
        this.removeIdea(id);
      }
    });
  }

  async getIdeas() {
    try {
      const {data} = await IdeaService.getIdeas();
      this.ideas = data.data;
      this.render();
    } catch (error) {
      Toast.fire({
        icon: 'info',
        title: 'Somethig went wrong',
      });
    }
  }

  async removeIdea(id) {
    try {
      await IdeaService.deleteIdea(id);
      this.getIdeas();
      Toast.fire({
        icon: 'success',
        title: 'Idea has been deleted',
      });
    } catch (error) {
      console.log(error);
    }
  }

  addIdeaToList(idea) {
    this.ideas.push(idea);
    this.render();
  }

  randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  setTagColor() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach((tag) => {
      tag.style.background = this.randomColor();
    });
  }

  render() {
    this.listContainer.innerHTML = this.ideas
      .map((idea) => {
        return `
      <div class='card' data-id=${idea._id}>
        <button class='delete'>
        ${
          localStorage.getItem('user') === idea.author
            ? `<i class='fas fa-times'></i>`
            : ''
        }
        </button>
        <h3>
          ${idea.text}
        </h3>
        <a class='tag'
        href="https://google.com/search?q=${idea.tag}" 
        target="_blank">${idea.tag.toUpperCase()}</a>
        <p>
          Posted on <span class='date'>${new Date(idea.createdAt)
            .toUTCString()
            .slice(0, 16)}</span> by
          <span class='author'>${idea.author}</span>
        </p>
      </div>`;
      })
      .join('');
    this.setTagColor();
    this.eventLisneners();
  }
}

export default IdeaList;
