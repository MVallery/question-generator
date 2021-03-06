import "./App.css";
import React, { useState, useEffect } from "react";
import Problems from "./problems";
import Star from './assets/images/star.png';
import Check from './assets/images/check.png';
import RedX from './assets/images/redx.png';
import Blank from './assets/images/blank.png';




function App() {
  const [questionList, setQuestionList] = useState([]);
  const [inputAnswer, setInputAnswer] = useState("");
  const [autoFocus, setAutoFocus] = useState("autoFocus");
  const [count, setCount] = useState(0);
  const [accuracy, setAccuracy] = useState("");

  const [message, setMessage] = useState("");
  const [stars, setStars] = useState("")
  const [startTime, setStartTime] = useState(0);
  const [goodMessages, setGoodMessages] = useState([]);

  useEffect(() => {
    handleMultiplyClick()
  }, []);
  const handleMultiplyClick = () => {

    var E = Math.floor(Math.random() * 9 + 2);
    var G = Math.floor(Math.random() * 9 + 2);
    var answer = E * G;
    var question = E + " × " + G + " = ";
    // var wrongAnswerList = questionList.filter(q => q.status.includes("wrong"))
    // var tempWrongAnswerList = wrongAnswerList;
    // tempWrongAnswerList =
    // var wrongAnswerList = questionList.filter((q) => { //should this be it's own state variable so that I can use the status to find accuracy?
    //   var tempList = []
    //   if (q.status === "wrong"){
    //     tempList.push(q)
    //   }
    //   return (
    //     tempList
    //   );
    // })

    if (wrongAnswerList().length > 1) {
      var wrong = wrongAnswerList()[Math.floor(Math.random() * wrongAnswerList().length)];
        if (Math.random()<0.6) {
          question = wrong.text
          answer = wrong.correctAnswer
          console.log("This is a repeated wrong Q" + question)
        }
    } 

    var questionData = {
      text: question,
      type: 'Multiplying',
      correctAnswer: answer,
      userAnswer: "",
      status: 'unanswered',
      image: Blank,
    };

    var tempQuestionList = JSON.parse(JSON.stringify(questionList));
    tempQuestionList.push(questionData);
    setQuestionList(tempQuestionList);
    setAutoFocus("autoFocus");
  };

  const handleDivideClick = (e) => {
    var G = Math.floor(Math.random() * 9 + 2);
    var answer = Math.floor(Math.random() * 9 + 2);
    var T = answer * G;
    var question = T + " ÷ " + G + " = ";
    setAutoFocus("autoFocus");
  };

  const handleInputAnswer = (e) => {
    e.preventDefault();
    var tempList = questionList;
    tempList[tempList.length-1].userAnswer = e.target.value;
    setQuestionList(tempList);
    setInputAnswer(e.target.value);
  };
  const wrongAnswerList = () => {
    return(questionList.filter(q => q.status ===("wrong")))
  }
  const answerCheck = () => {
    var image = ""
    var answerDisplay = ""
    setTimeout(() => {image=""; answerDisplay=""}, 3000);
    // not sure why it needs to check length rather than just checking unanswered status?? gives cannot read status of undefined
    if (questionList.length===0) {
      return(["", ""]);
    }
    else if (questionList[questionList.length-1].status==="wrong"){
      image =<img className="star" alt="redx" src={RedX}></img>;
      answerDisplay = "  (" + questionList[questionList.length-1].correctAnswer + ")";
      return([image, answerDisplay]);
  } 
    else if (questionList[questionList.length-1].status==="correct!") {
      image = <img className="star" alt="check" src={Check}></img>
      answerDisplay =""
      return([image, answerDisplay]);
    } 

    else {
      return([image, answerDisplay]);
    }     
}
  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    setInputAnswer("")
    if (questionList.length < 100) {

      if (String(questionList[questionList.length-1].correctAnswer) === String(questionList[questionList.length-1].userAnswer)) {
        var tempList = questionList
        tempList[tempList.length-1].image = Check;
        // <img className= "star" alt="correct" src={Check}></img>;
        setQuestionList(tempList)

        // let messages = [
        //   "Wow super fast!",
        //   "Lightning Speed",
        //   "Faster than the speed of light!",
        // ]
        // setGoodMessages(messages)
        // var qListLength = questionList.length
        // const messageFunction = () => {
        //   if (qListLength === questionList.length){
        //      let newGoodMessages = [
        //       "Great job",
        //       "Awesome!",
        //       "Wow keep it up!",
        //       "You got it!!",
        //     ]
        //     setGoodMessages(newGoodMessages)
        //     console.log("after timeout " +goodMessages)
        //   }

        // }
        // setTimeout(messageFunction, 3000);
        var tempList = questionList;
        tempList[tempList.length-1].status = "correct!";
        setQuestionList(tempList)
        // var randomMessage =
        //   goodMessages[Math.floor(Math.random() * goodMessages.length)];

        // setMessage(randomMessage);
        setCount(count + 1);
       

        if (questionList[questionList.length-1].type === "Multiplying") {
          setTimeout(handleMultiplyClick, 1000);
          // setTimeout(() => {
          //   setMessage("");
          // }, 1000);
        } else {
          setTimeout(handleDivideClick, 2000);
          // setTimeout(() => {
          //   setMessage("");
          // }, 2000);
        }
      } else {
        var tempList = questionList
        tempList[tempList.length-1].image = RedX
          // img className= "star" alt="wrong" src={RedX}></img>;

        setQuestionList(tempList);

        let inputSelect = document.querySelectorAll("input");
        console.log(inputSelect)
        for(var i = 0; i < inputSelect.length; i++) {
          inputSelect[i].style.borderColor = 'red';
        }

        const normalBackground = () => {
            for (var i = 0; i < inputSelect.length; i++){
              inputSelect[i].style.borderColor = 'grey';
            }
          }
        setTimeout (normalBackground, 2000)
      
        // inputSelect.style.background = "purple";
        var badMessages = [
          "Uh oh try again! ", "So close, yet so far away ",
          "Better luck next time! ", "I wish this was good news...",
          "We can't all be perfect. ", "Ouch, that sucks try again! ",
        ];

        var tempQuestionList = questionList;
        tempQuestionList[tempQuestionList.length-1].status = "wrong";
        setQuestionList(tempQuestionList);

        var randomMessage =
          badMessages[Math.floor(Math.random() * badMessages.length)];
        var tempList = [];
        tempList.push(
          questionList[questionList.length-1].text +
            " " +
            questionList[questionList.length-1].userAnswer +
            ": Wrong (Correct answer: " +
            questionList[questionList.length-1].correctAnswer +
            ")"
        );
        
        setMessage(
          "Your answer: " + questionList[questionList.length-1].userAnswer + " " + randomMessage + questionList[questionList.length-1].text + " " + questionList[questionList.length-1].correctAnswer
        );
        if (questionList[questionList.length-1].type === "Multiplying") {
          setTimeout(handleMultiplyClick, 3000);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        } else {
          setTimeout(handleDivideClick, 4000);
          setTimeout(() => {
            setMessage("");
          }, 4000);
        }
      }
      setAccuracy(
        Math.floor((((questionList.length - wrongAnswerList().length) / questionList.length) * 100)).toString() + " %"
      );

    } else {
      // console.log(accuracy);
      // setCompletedQList([]);
    };
  };





  const starImages = (c) => {
    if (c === 1) {
      return (
        <img className= "star" alt="star" src={Star}></img>
      )
    }
    if (c === 2) {
      return (
        <div>
        <img className= "star" alt="star" src={Star}></img>
        <img className= "star" alt="star" src={Star}></img>
        </div>
      )
    }
    if (c > 2) {
      return (
        <div>
        <img className= "star" alt="star" src={Star}></img>
        <img className= "star" alt="star" src={Star}></img>
        <img className= "star" alt="star" src={Star}></img>
        </div>
      )
    }

  }
  const keypress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitAnswer(e);
    };
  };
  // useEffect(() => {
  //   questionCompletedDisplay()
  // }, [questionList]);


  // const questionCompletedDisplay = () => {
  //   if (questionList.length > 9) {
  //     console.log("questionlist>9trigger")
  //     // var tempList= []
  //     // setQuestionList(tempList)
  //     var tableArray = []
  //     var i;
  //     for (i=0; i<9; i++){
  //       console.log("This is for loop trigger"+ i)
        
      
  //       <div>
  //       <tr>
  //       <td>questionList[i].status</td>
  //       <td> questionList[i].text</td>
  //       <td> questionList[i].userAnswer</td>
  //       <td> <img src= {questionList[i].image}></img></td>
  //     </tr>
  //     </div>
        
  //       )

  //   }
  //   else {
  // };
  //     //   "<tr>" +
      //   "<td>" + questionList[i].status+ "</td>" +
      //   "<td>" + + questionList[questionList.length-1].correctAnswer + "</td>" +
      //   "<td>" + questionList[i].userAnswer + "</td>" +
      //   "<td>" + questionList[i].text + "</td>" +
      // "</tr>"
/* <tr>
<td>{questionList[i].status}+ </td>
<td>{questionList[i].text + questionList[questionList.length-1].correctAnswer}</td>
<td>{questionList[i].userAnswer}</td>
<td>{questionList[i].text}</td>
</tr> */

        // <ul className="ul-completedQ">
        //   {questionList.map((question, index) => {
        //     return (
        //       <li className="li-completedQ" key={index}>
        //         {question.text + " " + question.userAnswer + " " + question.status}
        //       </li>
        //     );
        //   })}
        // </ul>
      

  return (
    <div className="Giant-container">
      <h1>Math Fact Trainer</h1>
      <p className="Giant-container-p">Use the math fact trainer to improve your math skills. If you miss any questions it will adjust to show you more of that type until you get it correct.</p>
       <ul className="ul-nav"> 
       <div>
        {/* <li>
          <a className="nav-bar" href="default.asp">Home</a>
        </li> */}
        <li>
        <button className="nav-bar"
          onClick={() => {
            handleMultiplyClick();
          }}
        >
          Multiplying Practice
        </button>
        </li>
        <li >
        <button className="nav-bar"
          onClick={() => {
            handleDivideClick();}}>
          Dividing Practice
        </button>
        </li>
        {/* <li>
          <a className="nav-bar" href="news.asp">Multiplying Help</a>
        </li>
        <li>
          <a className="nav-bar" href="contact.asp">Dividing Help</a>
        </li> */}
        </div>
      </ul>
      <div className="problem-card">
      <div className="card-title">
      {/* <p>{questionList[questionList.length-1].type} Practice</p> Sometimesworks sometimes*/}
      <p>Multiplying Practice</p>

      </div>
      <div className="card-top">
            <p>Progress: {count} / {questionList.length-1} = {accuracy}</p>
      </div>
        <div className="question-answer">
          <div className="question">
          <Problems questionList={ questionList.length>0 ? questionList[questionList.length-1].text : ""} />
          </div>
          {/* {setStartTime(begTime)} */}
          <input id="inputAnswer"
            type="text"
            onChange={handleInputAnswer}
            onSubmit={handleSubmitAnswer}
            autoFocus={autoFocus}
            value={inputAnswer}
            onKeyPress={keypress}
            placeholder=""
          ></input>
          
        <div className="answerCheck">
        {answerCheck()[0]}
        {answerCheck()[1]}
        {/* <Problems questionList={ questionList.length>0 ? questionList[questionList.length-1].image : ""} /> */}

        {/* {questionList[questionList.length-1].text} */}
        </div>
        {/* {starImages(count)} */}

        </div>
      </div>

      <header className="App-header">
        {/* {message} */}
        <div className="tableData">
          {/* <table>{questionCompletedDisplay()}</table> */}
         
          {questionList.filter(r => r.userAnswer).length > 10 ? (
            <table> 
            <tr>
              <td>{questionList[0].status} </td>
              <td>{questionList[0].text + questionList[0].correctAnswer}</td>
              <td>{questionList[0].userAnswer}</td>
              <td><img className="star" alt="redx" src={questionList[0].image}></img></td>
            </tr>
            <tr>
              <td>{questionList[1].status} </td>
              <td>{questionList[1].text + questionList[1].correctAnswer}</td>
              <td>{questionList[1].userAnswer}</td>
              <td><img className="star" alt="redx" src={questionList[1].image}></img></td>
            </tr>
            <tr>
              <td>{questionList[2].status} </td>
              <td>{questionList[2].text + questionList[2].correctAnswer}</td>
              <td>{questionList[2].userAnswer}</td>
              <td><img className="star" alt="redx" src={questionList[2].image}></img></td>
            </tr>
            <tr>
              <td>{questionList[3].status} </td>
              <td>{questionList[3].text + questionList[3].correctAnswer}</td>
              <td>{questionList[3].userAnswer}</td>
              <td><img className="star" alt="redx" src={questionList[3].image}></img></td>
            </tr>
            <tr>
              <td>{questionList[4].status} </td>
              <td>{questionList[4].text + questionList[4].correctAnswer}</td>
              <td>{questionList[4].userAnswer}</td>
              <td><img className="star" alt="redx" src={questionList[4].image}></img></td>
            </tr>
            <tr>
              <td>{questionList[5].status} </td>
              <td>{questionList[5].text + questionList[5].correctAnswer}</td>
              <td>{questionList[5].userAnswer}</td>
              <td><img className="star" alt="redx" src={questionList[5].image}></img></td>
            </tr>
            <tr>
              <td>{questionList[6].status} </td>
              <td>{questionList[6].text + questionList[6].correctAnswer}</td>
              <td>{questionList[6].userAnswer}</td>
              <td><img className="star" alt="redx" src={questionList[6].image}></img></td>
            </tr>
            <tr>
              <td>{questionList[7].status} </td>
              <td>{questionList[7].text + questionList[7].correctAnswer}</td>
              <td>{questionList[7].userAnswer}</td>
              <td><img className="star" alt="redx" src={questionList[7].image}></img></td>
            </tr>
            <tr>
              <td>{questionList[8].status} </td>
              <td>{questionList[8].text + questionList[8].correctAnswer}</td>
              <td>{questionList[8].userAnswer}</td>
              <td><img className="star" alt="redx" src={questionList[8].image}></img></td>
            </tr>
            <tr>
              <td>{questionList[9].status} </td>
              <td>{questionList[9].text + questionList[9].correctAnswer}</td>
              <td>{questionList[9].userAnswer}</td>
              <td><img className="star" alt="redx" src={questionList[9].image}></img></td>
            </tr>
</table>
          ) : null}
        
          {/* {accuracy} */}
        </div>
      </header>
    </div>
  );
}

export default App;
