import React from 'react';

class Square extends React.Component{
    render(){
        if (this.props.value == 'X' && this.props.isChosen == false && this.props.isWin == true)
        {
            return(
                <button className="square x isWin" onClick={this.props.onClick}>{this.props.value}</button>
            );
        }
        else if (this.props.value == 'O' && this.props.isChosen == false && this.props.isWin == true)
        {
            return(
                <button className="square o isWin" onClick={this.props.onClick}>{this.props.value}</button>
            );
        }
        else if (this.props.value == 'X' && this.props.isChosen == true && this.props.isWin == false) 
        {
            return(
                <button className="square x isChosen" onClick={this.props.onClick}>{this.props.value}</button>
            );
        }
        else if (this.props.value == 'X' && this.props.isChosen == false && this.props.isWin == false)
        {
            return(
                <button className="square x" onClick={this.props.onClick}>{this.props.value}</button>
            );
        }
        else if (this.props.value == 'O' && this.props.isChosen == true && this.props.isWin == false)
        {
            return(
                <button className="square o isChosen" onClick={this.props.onClick}>{this.props.value}</button>
            );
        }
        else
        {
            return(
                <button className="square o" onClick={this.props.onClick}>{this.props.value}</button>
            );
        }
  }
}

export default Square;