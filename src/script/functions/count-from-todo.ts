



export function countLastDoneFromTodo(todo):number{

    const lastDoneTime = todo.done_times.reduce((done_time, latest)=>done_time > latest ? done_time : latest, 0);


    if(!lastDoneTime){
        return 0;
    }



    return(lastDoneTime);

}



export function countPeriodFromTodo(todo):number{
    return todo.period.value*todo.period.unit*1000;
}


export function countNextDoneFromTodo(todo):number{

    const lastDone = countLastDoneFromTodo(todo);

    if(!lastDone){
        return 0;
    }

    return lastDone+countPeriodFromTodo(todo);


}



export function countPercentsFromTodo(todo,now:Date):number{

    const now_ = now.getTime();

    const lastDone = countLastDoneFromTodo(todo);
    const period = countPeriodFromTodo(todo);


    if(!lastDone){
        return 0;
    }



    return (now_-lastDone)/period;


}