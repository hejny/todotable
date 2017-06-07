import * as React from "react";
import * as FontAwesome from 'react-fontawesome';
import * as Datetime from 'react-datetime';
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
                    <th>Time</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    stateJS.todos[stateJS.current_todo_id].done_times.map(
                        (done_time,index)=>
                            <tr key={index}>
                                <td>

                                    {/*{moment(done_time).calendar()}*/}

                                    <Datetime
                                        defaultValue={done_time}
                                        onChange={moment=>store.dispatch({type:'TODO_UPDATE_DONE_TIME',todo_id: stateJS.current_todo_id,index,date:moment.toDate()})}
                                    />

                                </td>
                                <td>
                                    <div className="clickable" onClick={()=>store.dispatch({type:'TODO_DELETE_DONE_TIME',todo_id: stateJS.current_todo_id,index})}>
                                        <FontAwesome name='trash-o' />Delete
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
