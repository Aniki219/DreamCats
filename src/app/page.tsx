"use server"

import GameWindow from "./components/game/GameWindow";
import GetExpeditions from './actions/GetExpeditions';

export default async function Home() {
    const expeditions = await GetExpeditions();

    return (
        <div className="game-window">
            <GameWindow expeditions = {expeditions}/>
        </div>
    );
}
