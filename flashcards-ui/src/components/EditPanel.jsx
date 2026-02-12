import { useParams } from "react-router-dom";
import CreateDeckOrFolder from "./CreateDeckOrFolder";
import CreateFlashCard from "./CreateFlashCard";

export default function EditPanel({ item, onCardEdited, handlePlay}) {
    const {type, cardId} = useParams();

    if(cardId) return <CreateFlashCard key={cardId} initialData={item} onSubmit={onCardEdited}/>;
    else if(type == "deck") return <CreateDeckOrFolder initialData={item} handlePlay={handlePlay} onSubmit={onCardEdited}/>;
    else if(type == "folder") return <CreateDeckOrFolder initialData={item} handlePlay={handlePlay} onSubmit={onCardEdited}/>;
}