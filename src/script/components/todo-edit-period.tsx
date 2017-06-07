import * as React from "react";
import * as FontAwesome from 'react-fontawesome';



export function TodoEditPeriod(props) {

    const {store} = props;
    const stateJS = store.getState().toJS();



    return (
        <div>

            <h2>Period</h2>



            <input
                type="number"
                defaultValue={stateJS.todos[stateJS.current_todo_id].period.value}
                onChange={(event)=>store.dispatch({type:'TODO_CHANGE_PERIOD_VALUE',todo_id: stateJS.current_todo_id,value:event.target.value})}
            />


            <select
                value = {stateJS.todos[stateJS.current_todo_id].period.unit}
                onChange={(event)=>store.dispatch({type:'TODO_CHANGE_PERIOD_UNIT',todo_id: stateJS.current_todo_id,value:event.target.value})}
            >

                <option value={1}>Seconds</option>
                <option value={60}>Minutes</option>
                <option value={3600}>Hours</option>
                <option value={3600*24}>Days</option>
                <option value={3600*24*7}>Weeks</option>
                <option value={3600*24*30.4375}>Months</option>
                <option value={3600*24*30*365.25}>Years</option>



           </select>



        </div>
    );

}
