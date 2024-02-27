let task=[];
let taskID=0;

$(document).ready(function(){
    $("#btnSaveTask").click(saveTask);
    $("#btnHidde").click(hiddeForm);
    $("#btnView").click(viewForm);

    displayTask(task);
});

function Task(title, description, color, date, status, budget){
    this.title = title;
    this.description = description;
    this.color = color;
    this.date = date;
    this.status = status;
    this.budget = budget;
    this.id=taskID++;
}


function saveTask(){
    let inputTitle = $("#inputTitle");
    let inputDescription = $("#inputDescription");
    let inputColor = $("#inputColor");
    let inputDate = $("#inputDate");
    let inputStatus = $("#inputStatus");
    let inputBudget = $("#inputBudget");
    let newTask = new Task(inputTitle.val(), inputDescription.val(), inputColor.val(), inputDate.val(), inputStatus.val(), inputBudget.val());
    task.push(newTask);

    displayTask();

    inputTitle.val("");
    inputDescription.val("");
    inputColor.val("");
    inputDate.val("");
    inputStatus.val("");
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

        if(dtask.status == "Important"){
            dispTask += `
            <div>
                <hr>
                <i class="fa-solid fa-star"></i>
                <p>Title: ${dtask.title}</p>
                <p>Description: ${dtask.description}</p>
                <p>Color: ${dtask.color}</p>
                <p>Start Date: ${dtask.date}</p>
                <p>Status: ${dtask.status}</p>
                <p>Budget: ${dtask.budget}</p>
            </div>    
            `;
        }else if (dtask.status == "NotImportant") {
            dispTask += `
            <div>
                <hr>
                <i class="fa-regular fa-star"></i>
                <p>Title: ${dtask.title}</p>
                <p>Description: ${dtask.description}</p>
                <p>Color: ${dtask.color}</p>
                <p>Start Date: ${dtask.date}</p>
                <p>Status: ${dtask.status}</p>
                <p>Budget: ${dtask.budget}</p>
            </div>    
            `;
        } else {
            dispTask += `
            <div>
                <hr>
                <p>Title: ${dtask.title}</p>
                <p>Description: ${dtask.description}</p>
                <p>Color: ${dtask.color}</p>
                <p>Start Date: ${dtask.date}</p>
                <p>Status: ${dtask.status}</p>
                <p>Budget: ${dtask.budget}</p>
            </div>    
            `;
        }
    }
    $("#list").html(dispTask);
}