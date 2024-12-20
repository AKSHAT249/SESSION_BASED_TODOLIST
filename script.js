const date_obj = new Date();
today_date = date_obj.toISOString().slice(0,10)


let today_todolist = []
let future_todolist = []
let completed_todolist = []

const todayTable = document.getElementById("today_todolist");
const futureTable = document.getElementById("future_todolist");
const completedTable = document.getElementById("completed_todolist");   


const renderTodayTodolist = (today_todolist) => {
    todayTable.innerHTML = ""
    today_todolist.map( (item, index) => {
        
        return(
            todayTable.innerHTML += `
            <div style="margin:20px 0px; display:flex; width:1200px; flex-direction:row; align-items:center; justify-content:space-between; padding:10px; background:black; color:white;  border: 1px solid black"; border-radius:25px; gap:10px;>
                <p>${index+1}.${item.item_name}</p>
                <p>${item.deadline}</p>
                <p>${item.priority}</p>
                <div style="display:flex; flex-direction:row;  gap:10px;">
                    <img onclick="shiftToComplete(today_todolist, ${index})"   style="color:white; background-color:white; color-fill:white; width:20px; height:20px;" src="./checkmark.png" />
                    <img onclick="deleted(today_todolist, ${index})"  style="color:white; background-color:white; color-fill:white; width:20px; height:20px;" src="./delete.png" />
                </div>
            </div>
            `
        )
    } )

}

const renderFutureTodolist = (future_todolist) => {
    futureTable.innerHTML  = ""
    future_todolist.map( (item,index) => {
        
        return(
            futureTable.innerHTML += `
            <div style="margin:20px 0px; display:flex; width:1200px; flex-direction:row; align-items:center; justify-content:space-between; padding:10px; background:black; color:white;  border: 1px solid black"; border-radius:25px; gap:10px;>
                <p>${index+1}.${item.item_name}</p>
                <p>${item.deadline}</p>
                <p>${item.priority}</p>
                <div style="display:flex; flex-direction:row;  gap:10px;">
                    <img onclick="shiftToComplete(future_todolist, ${index})"  style="color:white; background-color:white; color-fill:white; width:20px; height:20px;" src="./checkmark.png" />
                    <img onclick="deleted(future_todolist, ${index})" style="color:white; background-color:white; color-fill:white; width:20px; height:20px;" src="./delete.png" />
                </div>
            </div>
            `
        )
    } )

}

const renderCompletedTodolist = (completed_todolist) => {
    completedTable.innerHTML = ""
    completed_todolist.map( (item, index) => {
        return(
            completedTable.innerHTML += `
            <div style="margin:20px 0px; display:flex; width:1200px; flex-direction:row; align-items:center; justify-content:space-between; padding:10px; background:black; color:white;  border: 1px solid black"; border-radius:25px; gap:10px;>
                <p>${index+1}.${item.item_name}</p>
                <p>${item.deadline}</p>
                <p>${item.priority}</p>
                <div style="display:flex; flex-direction:row;  gap:10px;">
                    <img onclick="deleted(completed_todolist, ${index})" style="color:white; background-color:white; color-fill:white; width:20px; height:20px;" src="./delete.png" />
                </div>
            </div>
            `
        )
    } )

}

if(localStorage.getItem("today_todolist")){
    today_todolist = JSON.parse(localStorage.getItem("today_todolist"))
    console.log(today_todolist)
    renderTodayTodolist(today_todolist)
}

if(localStorage.getItem("future_todolist")){
    future_todolist = JSON.parse(localStorage.getItem("future_todolist"))
    console.log(future_todolist);
    renderFutureTodolist(future_todolist)
}
if(localStorage.getItem("completed_todolist")){
    completed_todolist = JSON.parse(localStorage.getItem("completed_todolist"))
    console.log(completed_todolist)
    renderCompletedTodolist(completed_todolist)
}

// renderTodayTodolist(today_todolist);
// renderFutureTodolist(future_todolist);
// renderCompletedTodolist(completed_todolist);

const addItem = () => {
    
    item_name = document.getElementById("item_name").value;
    deadline = document.getElementById("deadline").value;
    priority = document.getElementById("priority").value;

    let task = {
        "item_name":item_name,
        "deadline":deadline,
        "priority":priority,
    }

    if(deadline==today_date){
        today_todolist.push(task)
        localStorage.setItem("today_todolist", JSON.stringify(today_todolist))
    }else if(deadline>today_date){
        future_todolist.push(task)
        localStorage.setItem("future_todolist", JSON.stringify(future_todolist))
    }

    renderTodayTodolist(today_todolist);
    renderFutureTodolist(future_todolist);
    renderCompletedTodolist(completed_todolist);



}


const shiftToComplete = (list, index) => {
    // console.log("shift clicked");
    // // console.log(listname, index);
    // console.log(list, index);
    
    // console.log(list.filter( (item, i)=> i==index ))
    // let task = list.filter( (item, i)=> i==index )[0]
    // let remaining = list.filter( (item,i) => i!=index )
    // console.log("task", task);
    // console.log("remaining", remaining);
    // completed_todolist.push(task)
    completed_task = list.filter( (item, i)=> i==index )[0]
    // console.log("completed_task, ", completed_task)
    // console.log("list", list)
    if(list === today_todolist){
        // console.log("popped ele from today")
        // console.log("before", today_todolist)
        // console.log(today_todolist.filter( (item,index) =>  item!==completed_task ))
        localStorage.removeItem("today_todolist")
        today_todolist = list.filter( (item, i)=> i!=index )
        localStorage.setItem("today_todolist", JSON.stringify(today_todolist))

        // console.log("after", today_todolist)
    
        
    }else if(list=== future_todolist){
        // console.log("popped ele from future")
        localStorage.removeItem("future_todolist")
        future_todolist = list.filter( (item, i)=> i!=index )
        localStorage.setItem("future_todolist", JSON.stringify(future_todolist))
    }
    completed_todolist.push(completed_task)
    localStorage.setItem("completed_todolist", JSON.stringify(completed_todolist))
    // list = list.fil( (item, i)=> item!=task)
    // console.log("reduced list", list)
    renderTodayTodolist(today_todolist);
    renderFutureTodolist(future_todolist);
    renderCompletedTodolist(completed_todolist);
    

}




const deleted = (list, index) => {

    if(list == today_todolist){
        
        today_todolist = list.filter( (item, i)=> i!=index )
        localStorage.setItem("today_todolist", JSON.stringify(today_todolist))



    }else if(list == future_todolist){
        future_todolist = list.filter( (item, i)=> i!=index )
        localStorage.setItem("future_todolist", JSON.stringify(future_todolist))

    }else{
        completed_todolist = list.filter( (item, i)=> i!=index )
        localStorage.setItem("completed_todolist", JSON.stringify(future_todolist))

    }

    renderTodayTodolist(today_todolist)
    renderFutureTodolist(future_todolist)
    renderCompletedTodolist(completed_todolist)

}


