"use strict";

$(document).ready(function(){
  $("#clicky-button").on('click', ()=>{
    let tasky = $('#todo-input').val();
    console.log("its working");
    $('#output').append(`<div class="col-md-4"><span>${tasky}</span><button class="btn btn-md btn-space delete-btn">Delete</button><button class="btn btn-md btn-space edit-btn">Edit</button><input class="btn-space checkbox" type="checkbox" id="cbox1" value="first_checkbox"> Complete?<br></div>`);
  });
  $(document).on('click', '.delete-btn',function(){
    $(this).closest('div').remove();
  });
  // $(document).on('click', '.edit-btn',function(){
  //   $(this).closest('div').html(this);
  // });
  $(document).on('click', '.edit-btn', function(){
    $("#todo-input").focus();
    $("#todo-input").val("");
    let editItem = $("#todo-input").val();
    $(this).siblings('span').text(editItem);
  });

  $(document).on("click", ".completed", function(){
    let moveMessage = $(this).closest('div').remove();
    completed.append(moveMessage);
    });
  // $(document).on('change', '.checkbox', function(){
  //      this.checked ? '#output'.append() : $('#todoOutput').appendTo('#completeOutput');
  //      console.log(this);
  //   });
  });
