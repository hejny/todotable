



export const INITIAL_APP_STATE = {

    observer_position:{x:0,y:0},
    observer_zoom_logarithm:1,


    current_todo_id: null,


    todos:
    {/*
        'uuid':{
            name:'todo',
            description:'',
            color: '#f00',
            done:true,
            position:{x:0,y:0,z:0}
        }*/
    }

};



export const INITIAL_TODO = {

    name:'',
    description: '## todo\n1) \n2) \n3) \n\n',
    color: '#ccc',
    done:false

};