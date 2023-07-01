import IdeasApi from "../services/IdeasApi";
import IdeaList from "./IdeaList";
class IdeaForm {
  constructor() {
    this._formModal = document.getElementById("form-modal");
    this._form = document.getElementById("idea-form");
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    if (!idea.text || !idea.tag || !idea.username) {
      alert("Please fill out all the fields");
      return;
    }

    try {
      const res = await IdeasApi.saveIdea(idea);
      this._ideaList.showIdea(res.data.data);

      // set username to local storage
      localStorage.setItem("username", res.data.data.username);
      // render modal form again
      this.render();
    } catch (error) {
      console.log(error);
    }

    this._form.elements.text.value = "";
    this._form.elements.username.value = "";
    this._form.elements.tag.value = "";

    document.dispatchEvent(new Event("closemodal"));
  }

  render() {
    this._formModal.innerHTML = `
    <form id="idea-form">
    <div class="form-control">
      <label for="idea-text">Enter a Username</label>
      <input type="text" name="username" id="username" value="${
        localStorage.getItem("username") ? localStorage.getItem("username") : ""
      }" />
    </div>
    <div class="form-control">
      <label for="idea-text">What's Your Idea?</label>
      <textarea name="text" id="idea-text"></textarea>
    </div>
    <div class="form-control">
      <label for="tag">Tag</label>
      <input type="text" name="tag" id="tag" />
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
  </form>
    `;
    this._form = document.getElementById("idea-form");
    this.addEventListeners();
  }
}

export default IdeaForm;
