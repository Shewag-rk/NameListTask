let appendDiv = $('.listTodoTask');
let editID;


// GET Request
function fetchData(){
  $.ajax({
    url: "http://localhost:3000/notes",
    method: "GET",
    success: function(response) {
        $.each(response, function(element, item){
          // appendList(item.Title, item.Descriptions, item.id)
          appendDiv.append(`
            <div class="todolists">
            <label>Name:</label>
            <h4>${item.Title}</h4>
            <label>Descriptions:</label>
            <p>${item.Descriptions}</p>
            <span>${new Date().toLocaleDateString()}</span>
            <button id=${item.id} class="edit">Edit</button>
            <button id=${item.id} class="delete">delete</button>
            </div>
            `)
        })
    }
});
}
fetchData();

// POST Request:

$('#submitBtn').click(function(){

  let inputValue = $('#inputTitle').val();
  let descriptionsValue = $('#descriptions').val();
  
  if(inputValue === '' || descriptionsValue === '' ){
    console.error("Please write somethings!");
    alert('Please write somethings!')
    return;
}

  let inputsValues = {Title: inputValue, Descriptions: descriptionsValue};
    if($('#submitBtn').text() == 'edit'){
      $.ajax({
        url: "http://localhost:3000/notes",
        method: "GET",
        success: function(response) {
    
        let matchedID = response.some(item => item.id ==editID)
        if(matchedID){
          $.ajax({
            url: `http://localhost:3000/notes/${editID}`,
            type: 'PUT',
            data: {
              Title: $('#inputTitle').val(),
              Descriptions: $('#descriptions').val()
            }
          })
        }
       
        $('#submitBtn').text('Submit')
      }})
    return;}
  
  $.ajax({
      url: 'http://localhost:3000/notes',
      type: 'POST',
      contentType:'application/json',
      data: JSON.stringify(inputsValues),
      success: function(response) {
          console.log('Server Response:', response);
      }
  });
})



appendDiv.on('click', '.delete', function(e){
  $.ajax({
    url: `http://localhost:3000/notes/${e.target.id}`,
    type: 'DELETE',
    success: function(){
      fetchData()
    },
    error: function(error){
      console.log(error);
    }
  })
})


appendDiv.on('click', '.edit', function(event){
  $.ajax({
    url: "http://localhost:3000/notes",
    method: "GET",
    success: function(response) {
      $.each(response, function(item,element){
        if(event.target.id === element.id){
          console.log(element)
          editID=element.id;
          $('#submitBtn').text('edit')
          $(".pop_inputs").show(); 
          $('#inputTitle').val(element.Title)
          $('#descriptions').val(element.Descriptions)
        }
      }) 
    }
});
})


$("#addTodo").click(function(){
  $(".pop_inputs").show(); // default need to display none
});

$('.closeIcon').click(function(){
  $(".pop_inputs").hide();
})