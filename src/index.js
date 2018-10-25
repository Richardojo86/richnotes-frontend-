console.log("DOM loaded");
const noteCollectionDiv = document.getElementById('notes')

function addSubmitListener () {
 //FIND THE ELEMENT
 //ATTACH THE EVENT LISTENER
 const form = document.getElementById('note-form')
 const button = document.getElementById('button')
 button.addEventListener("click", function(event){
   event.preventDefault();
   //grab values from the form
   const payload = {
     note: {
       content: form.content.value,
       title: form.title.value,
     },
     image: form.image.value
   }
   postAnote(payload)
 })
}
addSubmitListener();

function postAnote(note) {
  fetch("http://localhost:3000/api/v1/notes", {
    method: "POST",
    body: JSON.stringify(note),
    headers: {
    'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then((payload) => {
      renderNote(payload)
    })
    .catch (err => console.error(err))

}

fetch("http://localhost:3000/api/v1/notes")
  .then(resp => resp.json())
  .then(json => addNotesNImagestopage(json))


  function addNotesNImagestopage(notesNImages){
    const notes = notesNImages.notes
    const images = notesNImages.images
    notes.forEach(function(note) {
      note.images = []
      images.forEach(function(image){
        if(note.id === image.note_id) {
          note.images.push(image)
        }
      });
        let imageString = ''
      note.images.forEach(function(image) {
           imageString += `
            <h3>
              ${image.title}
            </h3>
            <img src= "${image.url}"  >
          `
      })
      noteCollectionDiv.innerHTML += `
        <li class="note">
          <h2> ${note.title}</h2>
          <p> ${note.content}<p>
          <div> ${imageString} </div>
          <button class="delete-btn"> Delete </button>
        </li>
      `
      })
}


function renderNote(payload) {
  const note = payload.note
  const image = payload.image
  //
  const imageString = `
        <h3>
          ${image.title}
        </h3>
        <img src= "${image.url}"  >
      `
  noteCollectionDiv.innerHTML += `
    <li class="note">
      <h2> ${note.title}</h2>
      <p> ${note.content}<p>
      <div> ${imageString} </div>
      <button class="delete-btn"> Delete </button>
    </li>
  `
}
