import React from 'react';
import './App.css';

class SendFile extends React.Component {
  constructor(props) {
    super(props);
	console.log("In SendFile Constructor");
	//Create 
	 console.log("Props", props);
	 this.state = {
		apiResponse: "",
	  };
	 //console.log("Document: ", document);

	//this.inputValue = document.getElementById("exampleInputFile");
	//console.log("Input file name = ",this.input.value);
	//console.log("Input file name = ", this);
	console.log("Leaving SendFile Constructor");
  }
  
  componentDidMount() {
	console.log("In componentDidMount");
	//button.addEventListener("click", sendFiletoCallAPI);
	console.log("Leaving componentDidMount");
  }

  sendFiletoCallAPI() {
		//alert(this);
		 console.log("In sendFileCallAPI");
		 console.log("Input = ", this);
		 //this.setState({apiResponse: "The Send File was very successful"});
		 console.log("Leaving sendFileCallAPI");
  }

  render(){
	console.log("In render()");
	return (
	<div className="SendFIle">
      <h1>The Send File was very successful</h1>
    </div>
	)
  }
}

export default SendFile;