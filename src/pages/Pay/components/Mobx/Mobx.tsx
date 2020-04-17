import React from "react";
import { observer } from "mobx-react";
import { action, observable, autorun, when} from "mobx";

// create State object


// // create observer
// const appState = observable({ timer: 0 });

const addTimer = action(() => {
 setTimeout(()=>{ appState.timer += 1}, 1000)
})

const resetTimer = action(() => {
  appState.timer = 0;
})
/* 观察状态改变的函数 */
// autorun(function() {
//   console.log("appState.timer:", appState.timer );
// });
//
// when(function() {
//   console.log("appState.timer:", appState.timer );
// });
const App = observer((appState) => {
  const addTimer = () => {
    setTimeout(()=>{ appState.timer += 1}, 1000)
  }
  const resetTimer = () => {
    appState.timer = 0;
  }
  return (
    <div className="App">
      {appState.timer }
      <button onClick={addTimer}>add </button>
      <button onClick={resetTimer}>resetTimer </button>
    </div>
  );
});

export default App
