import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import CreateDeckOrFolder from "./CreateDeckOrFolder";


export default function FileExplorer( {refreshKey, cards,onCreate} ) {
    const { type, id,mode } = useParams();
    const [content,setContent] = useState([]);
    const [isCreate, setIsCreate] = useState(false);
    const [createType, setCreateType] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    let fetchContentsUrl = type === "deck" ? `http://localhost:8080/api/decks/${id}/flashcards` : (type === "root" ? `http://localhost:8080/api/content` : `http://localhost:8080/api/content/${id}`);

    useEffect(() => {
        fetch(fetchContentsUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': '1'
            }
        })
        .then(response => response.json())
        .then(data => { 
                const sortedData = Array.isArray(data) 
                    ? data.sort((a, b) => b.id - a.id) 
                    : [data];
                    setContent(sortedData);
            }
        ).catch(err => console.error("Fetch failed:", err));
    }, [fetchContentsUrl,refreshKey]); 

    const navigate = useNavigate();

    function handleClick(item) {
        if(item.type == undefined) { 
            navigate(`/explorer/edit/${type}/${id}/card/${item.id}`);
        } else {
            navigate(`/explorer/preview/${item.type}/${item.id}`);
        }
    }

    function handleCreate(type ) {
            setShowDropdown(false);
            setIsCreate(true);
            setCreateType(type);
    }

    function handleSubmit() {
        setIsCreate(false);
        onCreate();
    }

    function handleDelete(e,item) {
        e.stopPropagation();
        const itemType = item.type || "flashcard";
        const confirmed = window.confirm(`Are you sure you want to delete this ${item.type}?`);

        if (confirmed) {
            executeDelete(item.id, itemType);
        }
    }

    const executeDelete = (itemId, itemType) => {
        
        fetch(`http://localhost:8080/api/${itemType}s/${itemId}`, {
        method: 'DELETE',
        headers: {
            'X-User-ID': '1'
        }
        })
        .then(response => {
            if(response.ok) {
                onCreate();
            }
        })
        .catch(err => console.error("Delete error:", err));
        }


    return (

            <ul className="overflow-y-auto w-screen p-4">
                <li className="p-2">
                    <nav className="flex flex-col">
                        { (mode != "cram") && (
                        <>
                            <button onClick={() => setShowDropdown(!showDropdown)}>Create</button>
                            {showDropdown && (
                                <ul>
                                    {type !== "deck" ?
                                    <>
                                    <li onClick={() => handleCreate("folder")}>
                                        <h4>Folder</h4>
                                    </li>
                                    <li onClick={() => handleCreate("deck")}>
                                        <h4>Deck</h4>
                                    </li>
                                    </> :
                                    <li onClick={() => handleCreate("flashcard")}>
                                        <h4>flashcard</h4>
                                    </li>
                                    }
                                </ul>
                            )}
                        </>
                        )}
                    </nav>
                </li>
                {isCreate ? <CreateDeckOrFolder parentId={type === "root" ? null : id} initialData={null} type={createType} onSubmit={handleSubmit}/> : ''}
                
                {(mode === "cram" ? cards : content).map((item) => (
                    <li className="flex flex-row justify-around items-center p-2 cursor-pointer border-b border-gray-700" key={`${item.type}-${item.id}`} onClick={() => handleClick(item)}>
                        
                        <h3 className="w-2/3"><span className="icon">
                                {item.type === "folder" ? '📁 ' : ''}
                                {item.type === "deck" ? '🎴 ' : ''}
                        </span>{item.type == null ? item.question : item.name}</h3>
                        <button onClick={(e) => handleDelete(e,item) }>Delete</button>
                    </li>
                ))}
            </ul>
        )
}