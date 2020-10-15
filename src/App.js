import React from 'react';
import './App.css';
import marchingAnts from './marchingAnts';
import Ant from "./ant";
// eslint-disable-next-line
import { GlobalContext } from "./context/GlobalState";

class App extends React.Component {
  constructor(props){
    super(props);
    console.log("In App Constructor");
    this.messageValue = "*** Application Running ****";
    this.state = {
      apiResponse: "*** Application Running ****",
      timeOffPole: "*** Calulating Time ****",
      minTimeOffPole: 0,
      maxTimeOffPole: 0,
      results:"",
      errorMessage: "",
      ant1: "L",
      ant2: "L",
      ant3: "L",
      ant4: "L",
      ant5: "L",
    };
    //**********ANTS ********* */
    /*const {
      showStartPage,
      handleTimer,
      time
      // toResetGame,
      // toStartGame ,
      // toStopGame
    } = this.useContext(GlobalContext);
    // eslint-disable-next-line
    const [timeLeft, setTimeLeft] = this.useState(27);
    // eslint-disable-next-line
    const [startGame, setStartGame] = this.useState(false);*/
  /*********ANTS ************** */

  /*TESTING
  const [startGame, setStartGame] = this.useState({startGame:false});
   /*TESTING*/
  }

  toStartGame() {
    this.setStartGame(true);
  }
  toStopGame() {
    this.setStartGame(false);
    this.setTimeLeft(this.timeLeft);
  }
  toResetGame() {
    this.setStartGame(false);
    this.setTimeLeft(27);
  }

  useEffect(){
    let timer = "";
    if (this.startGame) {
      this.timer = setInterval(() => {
        this.setTimeLeft(this.timeLeft - 1);
      }, 1000); // clearing interval
    }
    // handleTimer(time)
    return () => clearInterval(timer);
  }
  /*useEffect(() => {
    let timer = "";
    if (startGame) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000); // clearing interval
    }
    // handleTimer(time)
    return () => clearInterval(timer);
  });*/

  /***********ANTS **************************/

  startMarchingAnts(){
    //obj.drawDottedLine(300,400,7,7,7,20,"green");
    var obj = new marchingAnts();
    obj.drawDashedLine();
    this.calculateMinMaxTimeOffPole();
  }

  fillArrayWithNumbers(n) {
    var arr = Array.apply(null, Array(n));
    return arr.map(function (x, i) { return i });
  }

  calculateMinMaxTimeOffPole(){
    console.log("In calculateMinMaxTimeOffPole", this.state.maxTimeOffPole);
    //The total distance (that is, the total time) taken by each ant to fall can be expressed 
    //   by the distance from the original ant to both ends
    
    //var ants = this.fillArrayWithNumbers(5); //Get 1000 ants to work with
    var ants = [3, 7 , 11, 17, 23]; //position of Ants on the pole
    //console.log("Number of ants work with = ",ants.length);
    const poleLen = ants.length;
    const numOfAnts=5;

    //the Min time(length)
    var minL=0;
    for(var i=0;i<numOfAnts;i++)
    {
      var tmpmin=0;
      tmpmin=Math.min(ants[i],poleLen-ants[i]);
      minL=Math.max(minL,tmpmin);
    }

    //the max time(length)
    var maxL=0;
    for(i=0;i<numOfAnts;i++)
    {	
      var tmpmax=0;
      tmpmax=Math.max(ants[i],poleLen-ants[i]);
      maxL=Math.max(maxL,tmpmax);
    }
    //this.setState({maxTimeOffPole: maxL});
    this.setState({
      maxTimeOffPole: maxL
    }, () => console.log("maxL = ",this.state.maxTimeOffPole));
    //this.setState((state) => {
    //  return {maxTimeOffPole: maxL};
    //});
    this.setState({minTimeOffPole: minL});
    console.log("Max= ", maxL);
    console.log("Min= ", minL);
    console.log("Leaving calculateMinMaxTimeOffPole");
  }

  callAPI(){
    console.log("In callAPI");
    //var qs = "Results:"+this.state.results;
    var tmpBody = "Results: "+ this.state.results +
    " Ant1="+this.state.ant1+","+
    "Ant2="+this.state.ant2+","+
    "Ant3="+this.state.ant3+","+
    "Ant4="+this.state.ant4+","+
    "Ant5="+this.state.ant5;
    console.log("Body: ",tmpBody);
    var url = "http://localhost:9000/sendAPI";  //TEST ONLY
    console.log("URL: ",url);
     // POST request using fetch with error handling
     //headers: {'Content-Type':'application/x-www-form-urlencoded'},
     //headers: { 'Content-Type': 'application/json' },
     const requestOptions = {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: tmpBody
     }
     try {
  fetch(url, requestOptions)
      .then(async response => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
              // get error message from body or default to response status
              const error = response.status; //(data && data.message) || response.status;
              console.log("Getting Fetch Error msg", error);
              return Promise.reject(error);
          }

          console.log("postId: ", data.id );
      })
      .catch(error => {  
          this.setState({ errorMessage: error.toString() });
          this.messageValue = 'There was a Fetch error!';
          console.error("Fetch= ", error);
      });
    this.setState(
      {apiResponse: this.messageValue}, 
      function () {                        
        console.log("FETCH apiResponse= ",this.messageValue); 
        this.componentDidUpdate();
      }
    ); 
     } catch (e) {
      this.setState(
        {apiResponse: "Connection to API for call to Twilio was refused.  API may need to be started!"}, 
        function () {                        
          console.log("apiResponse= ",this.setState.apiResponse); 
          this.componentDidUpdate();
        }
      )
      console.log("Connection to API for call to Twilio was refused.  API may need to be started!", e);
     } finally {
       console.log("Leaving callAPI");
     }
  }


  textResultsToCallAPI(results) {
    //result of the current experiment (along with the input directions)
      console.log("In textResultsToCallAPI", this.state.results);
      this.callAPI();
      this.messageValue = "Sent Results from experience to Phone!";
      console.log("Leaving textResultsToCallAPI");

  }

  sendFiletoCallAPI1(qualitifiedFileName) {
		//alert(this);
		 console.log("In sendFileCallAPI1", qualitifiedFileName);
     var fileName = qualitifiedFileName.slice(12);
     this.messageValue = "File: "+fileName+" was texted to your mobile device.";
     this.setState(
      {apiResponse: this.messageValue}, 
      function () {                        
        console.log("apiResponse= ",this.setState.apiResponse); 
        this.componentDidUpdate();
      }
    ); 
    this.messageValue = "Sent Files from experience to Phone!";
		 console.log("Leaving sendFileCallAPI1");
  }

  changeTextAreaHandle(value) {
    //result of the current experiment (along with the input directions)
     //var newValue = this.state.results + value;
      this.setState({results: value});
    //console.log("Leaving changeHandle");
  }

  handleChange(evt,num) {
    //console.log("Ant Group chnage value = ", evt,num);
    //console.log("Ant Group ant1 state value = ", this.state.ant1);

    switch(num) {
      case(1):
      this.setState({ant1: evt});
      break;
      case(2):
      this.setState({ant2: evt});
      break;
      case(3):
      this.setState({ant3: evt});
      break;
      case(4):
      this.setState({ant4: evt});
      break;
      case(5):
      this.setState({ant5: evt});
      break;
      default:
      //Do nothing!
      break;
    }
    //console.log("Ant Group state values = ", this.state);
  }

  UNSAFE_componentWillMount(){
    console.log("IN UNSAFE_componentWillMount");
    //this.callAPI();
  }  

  componentDidUpdate() {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    console.log("IN componentDidUpdate");
    /***********ANTS *********** */
    let timer = "";
    if (this.startGame) {
      timer = setInterval(() => {
        this.setTimeLeft(this.timeLeft - 1);
      }, 1000); // clearing interval
    }
    // handleTimer(time)
    return () => clearInterval(timer);
    /***************************** */
    //console.log("Sate values", this.state);
    /*if (snapshot !== null) {
      console.log("Snapshot", snapshot);
      const min = this.minnRef;
      console.log("minnRef", min);
    }
    if (prevState !== null) {
      console.log("prevState", prevState);
    }
    if (prevProps !== null) {
      console.log("preProps", prevProps);
    }*/
    //console.log("Ant state values = ", this.state);
    //console.log("State results value", this.state.results);
  }

  componentDidMount(prevProps, prevState){
    //this.callAPI();
    //this.sendF.sendFiletoCallAPI();
    console.log("IN componentDidMount", prevState, prevProps);
  }  
  
render(){
  return (
    <div className="App">
      <h1>Tony Fields's Twilio Case Study!</h1>
      <form>
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg" alt="Twilio" width="100" height="70" >
          </img>
        </div>
      </form>
    <h2>Change the initial directions for each of the five ants below:</h2>
    <form onSubmit={(e) => this.startMarchingAnts(e.target.value) }>
      <label>
         Ant 1 
        <select type="text"
          name="antGroup1"
          onChange={ (e) => this.handleChange(e.target.value, 1) }>
          <option>L</option>
          <option>R</option>
        </select>
        </label>
      <label>
         Ant 2 
      <select type="text"
          name="antGroup2"
          onChange={ (e) => this.handleChange(e.target.value,2) }>
          <option>L</option>
          <option>R</option>
        </select>
        </label>
      <label>
         Ant 3 
      <select type="text"
          name="antGroup3"
          onChange={ (e) => this.handleChange(e.target.value,3) }>
          <option>L</option>
          <option>R</option>
        </select>
        </label>
      <label>
         Ant 4 
      <select type="text"
          name="antGroup4"
          onChange={ (e) => this.handleChange(e.target.value,4) }>
          <option>L</option>
          <option>R</option>
        </select>
        </label>
      <label>
         Ant 5 
      <select type="text"
          name="antGroup5"
          onChange={ (e) => this.handleChange(e.target.value,5) }>
          <option>L</option>
          <option>R</option>
        </select>
        </label>
        <input type="submit" value="Submit" />
    </form>
     <button onClick={this.toStartGame}>start</button>
      <button onClick={this.toStopGame}>stop</button>
      <button onClick={this.toResetGame}>reset</button>
      <h1>Time:</h1>
      <h2>{this.timeLeft}</h2>
      <div className={"ants-container"}>
        <Ant ant={1} position={3} timenow={this.timeLeft} />
        <Ant ant={2} position={7} timenow={this.timeLeft} />
        <Ant ant={3} position={11} timenow={this.timeLeft} />
        <Ant ant={4} position={17} timenow={this.timeLeft} />
        <Ant ant={5} position={23} timenow={this.timeLeft} />
      </div>
    <h2>This is the amount of time it will take for all ants to fall off the pole: </h2>
    <div>
      <p style={{ color: 'red' }}>Minimum Time (of length) = {this.state.minTimeOffPole}</p> 
      <p style={{ color: 'red' }}>Maximun Time (of length) = {this.state.maxTimeOffPole}</p> 
    </div>
    <div hidden className="form-file">
        <label htmlFor="exampleInputFile">Current Experiment File input (with the input directions)</label>
        <input type="file" onChange={(e) => this.sendFiletoCallAPI1(e.target.value) }  />
        <p className="help-block">Please select the file to be sent.</p>
        </div>
      
      <form onSubmit={(e) => this.textResultsToCallAPI(e.target.value) }>
        <label htmlFor="results">Enter results of the executions, so that it can be text to Twilio SMS.</label>
        <textarea rows={2} cols={30} value={this.state.results} 
            onChange={(event) => this.changeTextAreaHandle(event.target.value)}></textarea>
          <input type="submit" value="Submit" />
          <br/>
    </form>
    <p style={{ color: 'red' }}> {this.messageValue}</p>
    </div>
 );
}
}

export default App;
