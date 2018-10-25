console.log("DOM loaded");

fetch("http://localhost:3000/api/v1/notes")
  .then(resp => resp.json())
  .then(json => addNotesNImagestopage(json))


  function addNotesNImagestopage(notesNImages){
    const noteCollectionDiv = document.getElementById('notes')
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
