let task=[];

function saveTask(){
    let inputTitle = $("#inputTitle");
    let inputDescription = $("#inputDescription");
    let inputDate = $("#inputDate");
    let inputBudget = $("#inputBudget");
    let inputStatus = $("#inputStatus");
    let inputImportance = $("#inputImportance");
    let inputColor = $("#inputColor");
    let newTask = new Task(inputTitle.val(), inputDescription.val(), inputDate.val(), inputBudget.val(), inputStatus.val(), inputImportance.val(), inputColor.val());

    task.push(newTask);

    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/", 
        data: JSON.stringify(newTask),
        contentType: "application/json",
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    });

    displayTask();

    inputTitle.val("");
    inputDescription.val("");
    inputColor.val("");
    inputDate.val("");
    inputStatus.val("");
    inputImportance.val("");
    inputBudget.val("");
}

function hiddeForm(){
    $("form").addClass("visually-hidden");
    $("#btnHidde").addClass("visually-hidden");
    $("#btnView").removeClass("visually-hidden");
}
function viewForm(){
    $("form").removeClass("visually-hidden");
    $("#btnHidde").removeClass("visually-hidden");
    $("#btnView").addClass("visually-hidden");
}

function displayTask(){
    $("#list").empty();
    let dispTask = "";
    for(i=0;i<task.length;i++){
        let dtask = task[i];
        let iconTask = "";
        if(dtask.importance == "important"){
            iconTask="fa-solid fa-star";
        }else if (dtask.importance == "not-important"){
            iconTask="fa-regular fa-star";
        }else{
            iconTask="";
        }

        dispTask += `
            <div>
                <hr>
                <i class="${iconTask}"></i>
                <p>Title: ${dtask.title}</p>
                <p>Description: ${dtask.description}</p>
                <p>Start Date: ${dtask.date}</p>
                <p>Budget: ${dtask.budget}</p>
                <p>Status: ${dtask.status}</p>
                <p>Color: ${dtask.color}</p>
                <button class="btn btn-sm btn-primary" onclick="deleteTask(${i})">Delete</button>
            </div>    
            `;
    }

    $("#list").html(dispTask);
}

function deleteTask(id){
    task.splice(id, 1);
    displayTask();
}

function deleteObjTask(id){
    $.ajax({
        type: "DELETE",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/" + id + "/", 
        success: function(response){
            taskRequest();
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    });
}

function taskRequest(){
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/", 
        success: function(response){
            dispObjTask="";
            let responseObj = JSON.parse(response);
            let objEntries = Object.entries(responseObj);
            data = objEntries.slice(-10);
            dispData = Object.fromEntries(data);
            
            for(let key in dispData){
                let objTask = dispData[key];
                let objTitle = objTask.title;
                let objDescription = objTask.description;
                let objDate = objTask.date;
                let objBudget = objTask.budget;
                let objStatus = objTask.status;
                let objColor = objTask.color;
                let objId = objTask._id;
                dispObjTask += `
                    <div>
                        <hr>
                        <p>Title: ${objTitle}</p>
                        <p>Description: ${objDescription}</p>
                        <p>Start Date: ${objDate}</p>
                        <p>Budget: ${objBudget}</p>
                        <p>Status: ${objStatus}</p>
                        <p>Color: ${objColor}</p>
                        <button class="btn btn-sm btn-primary" onclick="deleteObjTask('${objId}')">Delete</button>
                    </div>    
                `
                console.log(objId);
            }
            $("#list").html(dispObjTask);
        },
        error: function(error){
            console.log(error);
        }
    });
}

$(document).ready(function(){
    $("#btnSaveTask").click(saveTask);
    $("#btnHidde").click(hiddeForm);
    $("#btnView").click(viewForm);
    $("#lastTen").click(taskRequest);

    displayTask(task);
});