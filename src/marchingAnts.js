import React from 'react';
import './App.css';

class marchingAnts extends React.Component {
  constructor(props) {
    super(props);
	console.log("In marchingAnts Constructor");
	this.canvasRef = React.createRef();
	//Create 
	 console.log("Props", props);
	 this.canvas = document.getElementById('canvas');
  	 this.ctx = this.canvas.getContext('2d');
  	 this.y = 15;
	 this.state = {
		apiResponse: "",
	  };
	 
	console.log("Leaving marchingAnts Constructor");
  }

	componentDidUpdate() {
		
	}

	componentDidMount() {
		this.canvas = this.canvasRef.current;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}
	
	drawDashedLine() {
		this.ctx.beginPath();
		this.ctx.setLineDash([5, 15]);
		this.ctx.moveTo(0, 50);
		this.ctx.lineTo(300, 50);
		this.ctx.stroke();
	}

	// Solid line
	drawSolidedLine(){
		this.ctx.beginPath();
		this.ctx.setLineDash([]);
		this.ctx.moveTo(0, 100);
		this.ctx.lineTo(300, 100);
		this.ctx.stroke();
	}
	
	drawDottedLine(x1,y1,x2,y2,dotRadius,dotCount,dotColor){
		console.log("In drawDottedLine");
		var dx=x2-x1;
		var dy=y2-y1;
		var spaceX=dx/(dotCount-1);
		var spaceY=dy/(dotCount-1);
		var newX=x1;
		var newY=y1;
		for (var i=0;i<dotCount;i++){
				this.drawDot(newX,newY,dotRadius,dotColor);
				newX+=spaceX;
				newY+=spaceY;              
		}
		this.drawDot(x1,y1,3,"red");
		this.drawDot(x2,y2,3,"red");
		console.log("Leaving drawDottedLine");
	}
        
	drawDot(x,y,dotRadius,dotColor){
		console.log("In drawDot");
		this.ctx.beginPath();
		this.ctx.arc(x,y, dotRadius, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = dotColor;
		this.ctx.fill();   
		console.log("Leaving drawDot");           
	}

  render(){
	console.log("In render()");
	return (
		<div>
         	<canvas width="300" height="1" ref={this.canvasRef}>
				0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0 
			</canvas>;
      </div>
	)
  }
}

export default marchingAnts;