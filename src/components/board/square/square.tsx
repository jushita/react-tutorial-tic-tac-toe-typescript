import React from 'react';

interface SquareProps {
    value: string;
    onClick: () => void;
}

interface State {
    value: string
}

export default class Square extends React.Component<SquareProps, State> {
    constructor(props: SquareProps) {
        super(props);
        this.state = {
            value: ''
        };
        
    }
    render() {
        return ( 
            <button 
                className="square"    
                onClick = { () => { this.props.onClick() }}>
            {this.props.value}
            </button>
        );
    }
} 