import CreateFlashCard from "./CreateFlashCard";

export default function EditPanel({ item, type, onCardEdited}) {
    if(type == "flashcard") return <CreateFlashCard initialData={item} onSubmit={onCardEdited}/>;
}