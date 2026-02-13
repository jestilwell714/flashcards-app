import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { API_BASE_URL } from "../config"; 

export default function CreateFlashCard({ onSubmit }) {
    const { id, cardId,mode } = useParams();
    const isEdit = mode == "edit";
    const [formData, setFormData] = useState({ question: '', answer: ''});
    const url = isEdit ? `${API_BASE_URL}/api/flashcards/${formData.id}` : `${API_BASE_URL}/api/decks/${id}/flashcards`;

    useEffect(() => {
            if(isEdit) {
           fetch(`${API_BASE_URL}/api/flashcards/${cardId}`,  {
                headers: {
                    'Content-Type': 'application/json',
                    'X-User-ID': '1'
                }
            })
            .then(response => response.json())
            .then(data => {
                setFormData(data);
            }).catch(err => console.error("Fetch failed:", err));
        }
            }, [cardId,isEdit]);


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
            isEdit ? onSubmit(formData) : onSubmit();
        })
        .catch(error => console.error("Connection error", error));
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return (
        
        <div>
        <form onSubmit={handleSubmit} className="relative flex flex-col items-center  gap-4 ">
            <div className=" border-gray-200          
            rounded-3xl               
            shadow-2xl                 
            border mt-8 p-4
            bg-main ">
            <div className="w-66% flex flex-col gap-2">
            <label className="text-black font-bold text-lg leading-tight ">Front</label>
            <textarea 
                name="question"
                value={formData.question}
                onChange={handleChange}
                rows={3}
                className="text-black leading-tight outline-none border-none resize-none"
            />
            </div>

            <div className="w-66% flex flex-col gap-2">
            <label className=" text-black font-bold text-lg leading-tight">Back</label>
            <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                rows={4}
                className="text-black leading-tight outline-none border-none resize-none"
            />
            </div>
            </div>
            <button className="absolute right-4.5 top-4.5 p-1 cursor-pointer transition-all hover:scale-[1.05] active:scale-95 " type="submit"><FaCheck className="text-white" size={20}/></button>
        </form>
        </div>
    )
}