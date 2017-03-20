import * as React from "react";




import * as ReactMarkdown from "react-markdown";
//import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/chrome';



interface IMarkDownEditorProps {
    value: string;
    onChange(event: any): void;
}




export class MarkDownEditor extends React.Component<IMarkDownEditorProps,any> {

    constructor(props: IMarkDownEditorProps) {
        super(props);

        this.state = {
            editingMode: props.value?false:true
        };

    }

    handleKeyPress(event) {
        if (event.key == 'Enter') {

            event.stopPropagation();
            //event.preventDefault();

        }

    }


    render() {






        const style = {
            width: '100%',
            fontSize: '2rem',

        };

        /*$blockScrolling={true}*/
        return (
            <div onKeyPress={this.handleKeyPress.bind(this)}>

                {this.state.editingMode ?
                    <AceEditor
                        mode="markdown"
                        theme="chrome"
                        value={this.props.value}
                        onChange={this.props.onChange}
                        name="UNIQUE_ID_OF_DIV"


                        showGutter={false}
                        wrapEnabled={true}
                        fontSize={"1rem" as any}
                        width="100%"

                        focus={false}
                        onBlur={()=>this.setState({editingMode:false})}




                    />
                    :
                    <div onClick={()=>this.setState({editingMode:true})}>
                        <ReactMarkdown
                            source={this.props.value}

                        />
                    </div>
                }
            </div>
        );


    }
}