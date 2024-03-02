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


    //save to server

    //display the task
}

function init(){
    console.log("this is a task manager");
    //lad data


    //hook events
    $("#btnSave").click(saveTask);
    //document.getElementById("btnSave").click();
}

window.onload=init;