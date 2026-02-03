import CreateDeckOrFolder from "./CreateDeckOrFolder";
import CreateFlashCard from "./CreateFlashCard";

export default function EditPanel({ item, type, onCardEdited}) {
    if(type == "flashcard") return <CreateFlashCard initialData={item} onSubmit={onCardEdited}/>;
    if(type == "deck") return <CreateDeckOrFolder initialData={item} type="deck" onSubmit={onCardEdited}/>;
    if(type == "folder") return <CreateDeckOrFolder initialData={item} type="folder" onSubmit={onCardEdited}/>;
}