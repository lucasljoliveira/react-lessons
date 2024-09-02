import Player from './components/Player.jsx';
import TimeChallenge from './components/TimeChallenge.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimeChallenge title="Easy" targetTime={1}></TimeChallenge>
        <TimeChallenge title="Not Easy" targetTime={5}></TimeChallenge>
        <TimeChallenge title="Getting tough" targetTime={10}></TimeChallenge>
        <TimeChallenge title="Pros only" targetTime={15}></TimeChallenge>
      </div>
    </>
  );
}

export default App;
