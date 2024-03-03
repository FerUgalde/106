// Doing in class

function saveTask(){
    console.log("saving...");
    //get values
    const title = $("#inputTitle").val();
    const description = $("#inputDescription").val();
    const startDate = $("#inputStartDate").val();
    const budget = $("#inputBudget").val();
    const status = $("#inputStatus").val();
    const color = $("#inputColor").val();

    console.log(title, description, startDate, budget, status, color);

    //build the object
    let task =  new Task(title,description,startDate,budget,status,color);
    console.log(task);

    //save to server
    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/", 
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    });

    //display the task
}

function testRequest(){
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/", 
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    });
}

function init(){
    console.log("this is a task manager");
    //lad data


    //hook events
    $("#btnSave").click(saveTask);
    //document.getElementById("btnSave").click();
}

window.onload=init;