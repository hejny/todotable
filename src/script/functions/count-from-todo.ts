



export function countLastDoneFromTodo(todo){

    const lastDoneTime = todo.done_times.reduce((done_time, latest)=>done_time > latest ? done_time : latest, 0);
    return(lastDoneTime);

}



export function countInOutFromTodo(todo,resources){


    let inOut = {i: 0, o: 0};

    let lastDoneTime = countLastDoneFromTodo(todo);
    if(lastDoneTime/1==0){
        lastDoneTime=new Date()/1;
    }



    const s = Math.floor(((new Date() / 1) - lastDoneTime) / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    const w = Math.floor(d / 7);
    const M = Math.floor(d / 30.436875);
    const y = Math.floor(d / 365.2425);
    const _ = w+M+y;//fake usage for compiler


    //todo reducer
    resources.forEach((resource,resource_id)=> {

        const expression = todo['inputs'][resource_id] || 0;
        let result;
        try {
            result = eval(expression);
        } catch (error) {
            result = 0;
        }

        inOut.i += result * resource.ratio;

    });


    resources.forEach((resource,resource_id)=> {
        const expression = todo['outputs'][resource_id] || 0;
        let result;
        try {
            result = eval(expression);
        } catch (error) {
            result = 0;
        }

        inOut.o += result * resource.ratio;


    });

    return(inOut);



}