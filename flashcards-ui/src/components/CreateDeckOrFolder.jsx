import { useState } from 'react';

export default function CreateDeckOrFolder( {parentId, type, initialData, onSubmit, onBlur} ) {
    const isEdit = !!initialData;
    const createUrl = `http://localhost:8080/api/${type}s`;

    const url = isEdit ?  createUrl+'/'+ initialData.id : createUrl;
    const defaultData = type === "folder" 
    ? { name: '', parentFolderId: parentId} 
    : { name: '', folderId: parentId };
    const [formData, setFormData] = useState(initialData || defaultData);

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
            if (!response.ok) console.error("Database didn't create/edit deck");
            isEdit ? onSubmit(formData) : onSubmit();
        })
        .catch(error => console.error("Connection error", error));
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return (
        <li>
            <form onSubmit={handleSubmit}>
                <input
                    className="bg-transparent border-none outline-none self-baseline text-white font-bold text-lg leading-tight"
                    autoFocus
                    onBlur={onBlur}
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}>
                </input>
            </form>
        </li>
    )
}