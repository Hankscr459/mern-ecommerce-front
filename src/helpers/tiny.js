export const initPlugins = {
    selector: 'textarea',  // change this value according to your HTML
    height: 500,
    menubar: 'insert',
    plugins: [
        'advlist autolink lists link image', 
        'charmap print preview anchor help',
        'searchreplace visualblocks code',
        'insertdatetime media table paste wordcount'
    ],
    toolbar:
        'undo redo | formatselect | bold italic | \
        alignleft aligncenter alignright | \
        bullist numlist outdent indent | image media',
    mobile: {
      theme: "mobile",
      plugins: [ "autosave", "lists", "autolink" ],
      toolbar: [ "undo", "bold", "italic", "styleselect" ] 
  } 
}