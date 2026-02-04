import { useParams } from "react-router-dom";
import CreateDeckOrFolder from "./CreateDeckOrFolder";
import CreateFlashCard from "./CreateFlashCard";

export default function EditPanel({ item, onCardEdited}) {
    const {type} = useParams;

    if(type == "flashcard") return <CreateFlashCard initialData={item} onSubmit={onCardEdited}/>;
    if(type == "deck") return <CreateDeckOrFolder initialData={item} type="deck" onSubmit={onCardEdited}/>;
    if(type == "folder") return <CreateDeckOrFolder initialData={item} type="folder" onSubmit={onCardEdited}/>;
}