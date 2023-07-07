import IdeasApi from "../services/IdeasApi";
class IdeaList {
  constructor() {
    this._ideaListEl = document.getElementById("idea-list");
    this._ideas = [];
    this.getIdeas();
    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("business");
    this._validTags.add("software");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }

  addEventListeners() {
    this._ideaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        console.log(ideaId);
        this.deleteIdea(ideaId);
      }
    });
  }

  async deleteIdea(ideaId) {
    console.log("ideaid", ideaId);
    try {
      await IdeasApi.deleteIdea(ideaId);
      // update dom
      this._ideas = this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      console.log(error);
      alert("You cannot delete this");
    }
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    if (this._validTags.has(tag)) {
      return `tag-${tag}`;
    } else {
      return "";
    }
  }

  showIdea(idea) {
    this._ideas.push(idea);
    this.render();
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        return `
      <div class="card" data-id="${idea._id}">
      ${
        idea.username === localStorage.getItem("username")
          ? '<button class="delete"><i class="fas fa-times"></i></button>'
          : ""
      }
      <h3>
       ${idea.text}
      </h3>
      <p class="tag ${tagClass}">${idea.tag}</p>
      <p>
        Posted on <span class="date">${idea.date.slice(0, 10)}</span> by
        <span class="author">${idea.username}</span>
      </p>
    </div>

    `;
      })
      .join("");

    this.addEventListeners();
  }
}

export default IdeaList;
