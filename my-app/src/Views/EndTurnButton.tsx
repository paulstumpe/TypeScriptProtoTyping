type endTurnProps = {
    endTurn: () => void
}

function EndTurnButton({endTurn}:endTurnProps) {

  return (
        <div>
          <button onClick={endTurn}>End Turn</button>
        </div>

  );
}

export default EndTurnButton;
