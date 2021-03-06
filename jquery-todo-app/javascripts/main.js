"use strict";

let apiKeys = {};
let uid = "";

function putTodoInDOM (){
    FbAPI.getTodos(apiKeys, uid).then(function(items){
      console.log("items from Firebase", items);
      $('#completed-tasks').html("");
      $('#incomplete-tasks').html("");
      items.forEach(function(item){
        if(item.isCompleted === true){
        let newListItem = `<li data-completed="${item.isCompleted}">`;
        newListItem+=`<div class="col-xs-8" data-fbid="${item.id}">`;
        newListItem+='<input class="checkboxStyle" type="checkbox" checked>';
        newListItem+=`<label class="inputLabel">${item.task}</label>`;
        newListItem+='<input type="text" class="inputTask">';
        //apend to list
        $('#completed-tasks').append(newListItem);
      }else{
        let newListItem = `<li data-completed="${item.isCompleted}">`;
        newListItem+=`<div class="col-xs-8" data-fbid="${item.id}">`;
        newListItem+='<input class="checkboxStyle" type="checkbox">';
        newListItem+=`<label class="inputLabel">${item.task}</label>`;
        newListItem+='<input type="text" class="inputTask">';
        newListItem+='</div>';
        newListItem+='<div class="col-xs-4">';
        newListItem+=`<button class="btn btn-default col-xs-6 edit"  data-fbid="${item.id}">Edit</button> `;
        newListItem+=`<button class="btn btn-danger col-xs-6 delete"  data-fbid="${item.id}">Delete</button> `;
        newListItem+='</div>';
        newListItem+='</li>'; 
        $('#incomplete-tasks').append(newListItem);
      }
    });
    });
}

function createLogoutButton(){
  FbAPI.getUser(apiKeys, uid).then(function(userResponse){
    console.log("userResponse", userResponse);
    $('#logout-container').html("");
    let currentUsername = userResponse.username;
    let logoutButton = `<button class="btn btn-danger" id="logoutButton">LOGOUT ${currentUsername}</button>`;
    $('#logout-container').append(logoutButton);
  });
}

$(document).ready(function(){
  FbAPI.firebaseCredentials().then(function(keys){
    console.log("keys", keys);
    apiKeys=keys;
    firebase.initializeApp(apiKeys);
  });

  $('#clicky-button').on('click', function(){
    let newItem = {
      "task": $("#todo-input").val(),
      "isCompleted": false,
      "uid": uid
    };
    FbAPI.addTodo(apiKeys, newItem).then(function(){
      putTodoInDOM();
    });
  });

  $("ul").on("click", ".delete", function(){
    let itemId = $(this).data("fbid");
    FbAPI.deleteTodo(apiKeys, itemId).then(function(){
      putTodoInDOM();
    });
  });

  $("ul").on("click", ".edit", function(){
    let itemId = $(this).data("fbid");
    let parent = $(this).closest("li");
    if(!parent.hasClass("editMode")){
      parent.addClass("editMode");
    } else {
    let editedItem = {
      "task": parent.find(".inputTask").val(),
      "isCompleted": false,
      "uid": uid
    };
    FbAPI.editTodo(apiKeys, itemId, editedItem).then(function(response){
      parent.removeClass("editMode");
      putTodoInDOM();
    });
      //firebase stuff
    }
  });

$("ul").on('change', "input[type='checkbox']", function(){
  let updatedIsCompleted = $(this).closest("li").data("completed");
  let itemId = $(this).parent().data("fbid");
  let task= $(this).siblings("inputLabel").html();

  let editedItem = {
    "task": task,
    "isCompleted": !updatedIsCompleted,
    "uid": uid
  };

  FbAPI.editTodo(apiKeys, itemId, editedItem).then(function(){
    putTodoInDOM();
  });
});

$("#registerButton").on('click', function(){
  let email = $('#inputEmail').val();
  let password = $('#inputPassword').val();
  let username = $('#inputUsername').val();
  let user ={
    "email": email,
    "password": password
  };

  FbAPI.registerUser(user).then(function(registerResponse){
    console.log("register response", registerResponse);
    let uid = registerResponse;
    let newUser ={
      "username": username,
      "uid": registerResponse.uid
    };
    return FbAPI.addUser(apiKeys, newUser);
  }).then(function(addUserResponse){
    return FbAPI.loginUser(user);

  }).then(function(loginResponse){
    console.log("login Response", loginResponse);
    uid = loginResponse.uid;
    createLogoutButton();
    putTodoInDOM();
  });
  $('#login-container').addClass('hide');
  $('#todo-container').removeClass('hide');
});


$('#loginButton').on('click', function(){
  let email = $('#inputEmail').val();
  let password = $('#inputPassword').val();

  let user ={
    "email": email,
    "password": password
  };
  FbAPI.loginUser(user).then(function(loginResponse){
    console.log("login", loginResponse);
    uid = loginResponse.uid;
    createLogoutButton();
    putTodoInDOM();
  $('#login-container').addClass('hide');
  $('#todo-container').removeClass('hide');
  });
});

$('#logout-container').on("click", '#logoutButton', function(){
  FbAPI.logoutUser();
  uid = "";
  $('#incomplete-tasks').html("");
  $('#completed-tasks').html("");
  $('#inputEmail').val("");
  $('#inputPassword').val("");
  $('#inputUsername').val("");
  $('#login-container').removeClass('hide');
  $('#todo-container').addClass('hide');
});

});


  

























  // $("#clicky-button").on('click', ()=>{
  //   let tasky = $('#todo-input').val();
  //   console.log("its working");
  //   $('#output').append(`<div class="col-md-4"><span>${tasky}</span><button class="btn btn-md btn-space delete-btn">Delete</button><button class="btn btn-md btn-space edit-btn">Edit</button><input class="btn-space checkbox" type="checkbox" id="cbox1" value="first_checkbox"> Complete?<br></div>`);
  // });
  // $(document).on('click', '.delete-btn',function(){
  //   $(this).closest('div').remove();
  // });
  // // $(document).on('click', '.edit-btn',function(){
  // //   $(this).closest('div').html(this);
  // // });
  // $(document).on('click', '.edit-btn', function(){
  //   $("#todo-input").focus();
  //   $("#todo-input").val("");
  //   let editItem = $("#todo-input").val();
  //   $(this).siblings('span').text(editItem);
  // });

  // $(document).on("click", ".completed", function(){
  //   let moveMessage = $(this).closest('div').remove();
  //   completed.append(moveMessage);
  //   });
  // // $(document).on('change', '.checkbox', function(){
  // //      this.checked ? '#output'.append() : $('#todoOutput').appendTo('#completeOutput');
  // //      console.log(this);
  // //   });
