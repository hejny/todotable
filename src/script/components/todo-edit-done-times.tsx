import * as React from "react";
import * as FontAwesome from 'react-fontawesome';
import * as moment from "moment";



export function TodoEditDoneTimes(props) {

    const {store} = props;
    const stateJS = store.getState().toJS();

    return (
        <div>
            <h2>Done times</h2>
            <table>
                <thead>
                <tr>
                    <td>Time</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {
                    stateJS.todos[stateJS.current_todo_id].done_times.map(
                        (done_time,index)=>
                            <tr key={index}>
                                <td>{moment(done_time).calendar()}</td>
                                <td>
                                    <div onClick={store.dispatch.bind(this,{type:'CURRENT_TODO_DELETE_DONE_TIME',index})}>
                                        <FontAwesome name='trash-o' />
                                    </div>
                                </td>
                            </tr>
                    )
                }


                </tbody>
            </table>
        </div>
    );

}
