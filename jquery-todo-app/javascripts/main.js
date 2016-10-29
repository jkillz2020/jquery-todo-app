"use strict";

$(document).ready(function(){
  $("#clicky-button").on('click', ()=>{
    let tasky = $('#todo-search').val();
    console.log("its working");
    $('#output').append(`<div class="panel-body col-md-4">${tasky}<label><button class="btn btn-md delete-btn">Delete</button><button class="btn btn-md edit-btn">Edit</button><input type="checkbox" id="cbox1" value="first_checkbox"> Complete?</label><br></div>`);
  });
  $(document).on('click', '.delete-btn',function(){
    $(this).closest('div').remove();
  });
  $(document).on('click', '.edit-btn',function(){
    $(this).closest('div').remove();
  });

  // $('#checkbox').change(function(){
  //     var c = this.checked ? '#complete-list'.innerHTML;
  // });
});