let taskID=0;
class Task{
    constructor(title, description, color, date, status, budget){
        this.title = title;
        this.description = description;
        this.color = color;
        this.date = date;
        this.status = status;
        this.budget = budget;
        this.id=taskID++;
    }
}