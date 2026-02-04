import { useParams } from "react-router-dom";
import CreateFlashCard from "./CreateFlashCard";

export default function CreatePanel({ onCardCreated}) {
    const {type} = useParams();
    if(type === "deck") return <CreateFlashCard onSubmit={onCardCreated}/>;
}