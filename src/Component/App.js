import React,{useState} from "react";
import Die from "./Die";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";
export default function App() {
  const[dice,setDice]=React.useState(getNum());
  const [tenzies, setTenzies] = React.useState(false)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])
  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}
  function getNum(){
    const newArr=[];
    for(let i=0;i<10;i++){
     newArr.push(generateNewDie())
    }
    return newArr
  }
 function roll(){
   if(!tenzies){
   setDice(oldDice=>oldDice.map(ele=>{
     return ele.isHeld?ele:generateNewDie()
   }))
  }else{
    setTenzies(false)
    setDice(getNum())
  }
 }
 function getId(id){
        setDice(oldDice=>oldDice.map(ele=>{
          return ele.id===id?{...ele,isHeld:!ele.isHeld}:ele
        }))
 }
  const Arr=dice.map(ele=> <Die value={ele.value} isHeld={ele.isHeld} id={()=>getId(ele.id)}/>)
  return (
    <main>
      {tenzies &&<Confetti/>}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="container">
      {Arr}
      </div>
      <button className="roll" onClick={roll}>{tenzies ? "New Game":"Roll"}</button>
    </main>
  )
}

