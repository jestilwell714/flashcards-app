import { useState } from "react";
import { useParams } from "react-router-dom";

export default function CreateFlashCard({ initialData, onSubmit }) {
    const { id } = useParams();
    const isEdit = !!initialData;
    const url = isEdit ? `http://localhost:8080/api/flashcards/${initialData.id}` : `http://localhost:8080/api/decks/${id}/flashcards`;
    const [formData, setFormData] = useState(initialData || { question: '', answer: ''});


    function handleSubmit(e) {
        e.preventDefault();
        fetch(url, {
            method: isEdit ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json',
                       'X-User-ID': '1'
                    },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) console.error("Database didn't create/edit flashcard");
            onSubmit();
        })
        .catch(error => console.error("Connection error", error));
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>Front</label>
            <textarea 
                name="question"
                value={formData.question}
                onChange={handleChange}
            />

            <label>Back</label>
            <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
            />
            <button type="submit">{isEdit ? "Edit" : "Create"}</button>
        </form>
        </div>
    )
}