import { useState } from "react"


export default function Player({ initialName, symbol, isActive, OnChangeName }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    
    function handleEditClick(){
        setIsEditing((editing) => !editing)
        if (isEditing) {
            OnChangeName(symbol, playerName)
        }
    }
    
    function handleChangeName(event){
        setPlayerName(event.target.value)
    }
    
    let editablePlayerName = <span className="player-name">{playerName}</span>
    if (isEditing) {
        editablePlayerName = (
            <input type="text" required value={playerName} onChange={handleChangeName} /> // two way bidding, receiving value on value and setting on onChange
        )
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}