



export function countLastDoneFromTodo(todo){

    const lastDoneTime = todo.done_times.reduce((done_time, latest)=>done_time > latest ? done_time : latest, 0);
    return(lastDoneTime);

}



export function countInOutFromTodo(todo,resources){


    let inOut = {i: 0, o: 0};

    const lastDoneTime = countLastDoneFromTodo(todo);
    const s = Math.floor(((new Date() / 1) - lastDoneTime) / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(s / 60);
    const d = Math.floor(s / 24);

    //todo reducer
    resources.forEach((resource,resource_id)=> {

        const expression = todo['inputs'][resource_id] || 0;
        let result;
        try {
            result = eval(expression);
        } catch (error) {
            result = 0;
        }

        inOut.i += result;

    });


    resources.forEach((resource,resource_id)=> {
        const expression = todo['outputs'][resource_id] || 0;
        let result;
        try {
            result = eval(expression);
        } catch (error) {
            result = 0;
        }

        inOut.o += result;


    });

    return(inOut);



}