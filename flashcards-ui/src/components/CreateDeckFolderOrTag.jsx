import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from "../config"; 

export default function CreateDeckFolderOrTag( {parentId, type, initialData, onSubmit, onBlur, handlePlay} ) {
    const params = useParams();
    
    const isEdit = !!initialData;
    if(isEdit) {
        type = params.type;
    }
    const createUrl = `${API_BASE_URL}/api/${type}s`;

    const url = isEdit ?  createUrl+'/'+ initialData.id : createUrl;
    const defaultData = type === "tag" ? {name: ''} : type === "folder" 
    ? { name: '', parentFolderId: parentId} 
    : { name: '', folderId: parentId };
    const [formData, setFormData] = useState(initialData || defaultData);
    const cramModeUrl = isEdit ? type === "root" ? '/explorer/cram/root/0' : `/explorer/cram/${type}/${initialData.id}` : ``;


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
            if (!response.ok) console.error("Database didn't create/edit deck, folder or tag");
            isEdit ? onSubmit(formData) : onSubmit();
        })
        .catch(error => console.error("Connection error", error));
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return (
        <div className={isEdit ? `mx-6 mt-4 flex-1 flex flex-col items-center justify-center h-full gap-10` : ``}>
            
                <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    className={`${isEdit ? "w-70 overflow-hidden font-medium text-center text-3xl text-bold truncate text-white" : " self-baseline text-white font-bold text-lg leading-tight"} bg-transparent border-none outline-none `}
                    autoFocus
                    onBlur={onBlur}
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}>
                </input>
            </form>
            {isEdit && <button className="px-10 py-3 text-white font-black uppercase tracking-widest rounded-full
                   transition-all duration-100 active:scale-95 bg-linear-to-br from-amber-400 to-orange-500 hover:to-orange-600 hover:scale-105 shadow-lg shadow-black/30" onClick={ () => handlePlay(cramModeUrl) }>Play</button>}
        </div>
    )
}