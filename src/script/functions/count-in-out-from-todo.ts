




export function countInOutFromTodo(todo,resources){


    let inOut = {i: 0, o: 0};

    const lastDoneTime = todo.done_times.reduce((done_time, latest)=>done_time > latest ? done_time : latest, 0);
    const s = Math.floor(((new Date() / 1) - lastDoneTime) / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(s / 60);
    const d = Math.floor(s / 24);
    resources.forEach((resource)=> {


        const expression = todo['inputs'][resource.key] || 0;
        let result;
        try {
            result = eval(expression);
        } catch (error) {
            result = 0;
        }

        inOut.i += result;
    });

    return(inOut);



}