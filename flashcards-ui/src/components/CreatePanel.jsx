import CreateFlashCard from "./CreateFlashCard";

export default function CreatePanel({ type, onCardCreated}) {
    
    if(type === "deck") return <CreateFlashCard onSubmit={onCardCreated}/>;
}