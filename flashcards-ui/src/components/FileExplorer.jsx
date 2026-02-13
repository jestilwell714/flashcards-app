import { API_BASE_URL } from "../config"; 
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import CreateDeckOrFolder from "./CreateDeckFolderOrTag";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoFolderOpenOutline } from "react-icons/io5";
import { TbCards } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { HiX } from "react-icons/hi";
import { TbTag } from "react-icons/tb";

export default function FileExplorer( {refreshKey, onCreate} ) {
    const { type, id,mode } = useParams();
    const [content,setContent] = useState([]);
    const [tags, setTags] = useState([]);
    const [isCreate, setIsCreate] = useState(false);
    const [createType, setCreateType] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [tagMode, setTagMode] = useState(false);
    const fetchContentsUrl = type === "deck" ? `${API_BASE_URL}/api/decks/${id}/flashcards` : (type === "root" ? `${API_BASE_URL}/api/content` : `${API_BASE_URL}/api/content/${id}`);
    const fetchTagUrl = `${API_BASE_URL}/api/tags`;

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
                    ? data.sort((a, b) => {
                        if(a.type == undefined) {
                            return b.id - a.id;
                        }

                        let rankA;
                        let rankB;
                        if (a.type == "folder") {
                            rankA = 1;
                        } else {
                            rankA = 2;
                        }
                        if(b.type == "folder") {
                            rankB = 1;
                        } else {
                            rankB = 2;
                        }

                        if(rankA !== rankB) {
                            return rankA - rankB;
                        }

                        const nameA = (a.name || "").toLowerCase();
                        const nameB = (b.name || "").toLowerCase();
                        if (nameA < nameB) return -1;
                        if (nameA > nameB) return 1;
                        return 0;
                    }
                    ): [data];
                    setContent(sortedData);
            }
        ).catch(err => console.error("Fetch failed:", err));
    }, [fetchContentsUrl,refreshKey]); 

    useEffect(() => {
        if(tagMode) {
        fetch(fetchTagUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': '1'
            }
        })
        .then(response => response.json())
        .then(data => { 
                const sortedData = Array.isArray(data) 
                    ? data.sort((a, b) => a.name.localeCompare(b.name))
                    : [data];
                    setTags(sortedData);
            }
        ).catch(err => console.error("Tag fetch failed:", err));
        }
    }, [tagMode,fetchTagUrl,refreshKey]);

    const navigate = useNavigate();

    function handleClick(item) {
        if(tagMode) {
            navigate(`/explorer/preview/tag/${item.id}`, {replace : true});
        } else if(item.type == undefined) { 
            navigate(`/explorer/edit/${type}/${id}/card/${item.id}`);
        } else {
            navigate(`/explorer/preview/${item.type}/${item.id}`);
        }
    }

    function handleCreate(type ) {
            setShowDropdown(false);
            if(type === "flashcard") {
                navigate(`/explorer/create/deck/${id}`);
            } else {
                setIsCreate(true);
                setCreateType(type);
            }
    }

    function handleSubmit() {
        setIsCreate(false);
        onCreate();
    }

    function handleBlur() {
        setIsCreate(false);
    }

    function handleDelete(e,item) {
        e.stopPropagation();
        const itemType = tagMode ? "tag" : item.type || "flashcard";
        const confirmed = window.confirm(`Are you sure you want to delete this ${itemType}?`);

        if (confirmed) {
            executeDelete(item.id, itemType);
        }
    }

    const executeDelete = (itemId, itemType) => {
        
        fetch(`${API_BASE_URL}/api/${itemType}s/${itemId}`, {
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

    function handleTagMode() {
        setTagMode(!tagMode);
        if(type == "tag") {
            navigate(-1);
        } else {
            navigate(`/explorer/${mode}/${type}/${id}`)
        }

    }

    return (
        <>
            <ul className={` w-screen flex flex-col gap-4 p-4 ${mode === "cram" ? "absolute inset-0 z-50 h-full" : ""}`}>
                <li className="flex flex-row bg-white/20 border-white/20 relative self-baseline border-2 rounded-3xl shadow-2xl shadow-black/40 transition-all hover:scale-[1.02] active:scale-95 hover:bg-slate-800/40">
                            <button className="m-1 p-2 hover:scale-[1.05] active:scale-95" onClick={handleTagMode}><IoMdPricetags className="text-white" size={27}/></button>
                            <button className="m-1 p-2 hover:scale-[1.05] active:scale-95" onClick={() => tagMode ? handleCreate("tag") : type === "deck" ? handleCreate("flashcard") : setShowDropdown(!showDropdown)}>{showDropdown ? <HiX className={`text-white`} size={27} strokeWidth={1.5}/>: <FaPlus className={`text-white`} size={25}/>}</button>
                            
                            
                        {showDropdown &&
                              
                                    (type !== "deck" &&
                                    <>
                                    <button className="m-1 p-1 hover:scale-[1.05] active:scale-95" onClick={() => handleCreate("folder")}>
                                        <IoFolderOpenOutline className="text-white drop-shadow-[text-shadow:0.5px_0_0_white,-0.5px_0_0_white,0_0.5px_0_white,0_-0.5px_0_white]" size={27} />
                                    </button>
                                    <button className="m-1 p-1 hover:scale-[1.05] active:scale-95" onClick={() => handleCreate("deck")}>
                                        <TbCards className="text-white " size={27} strokeWidth={3}/>
                                    </button>
                                    </> )
                                    
                                    
                      
                            }
                </li>
                

                {isCreate && 
                    <li className="bg-white/20 border-white/20 relative p-6 flex flex-row items-center cursor-pointer border-2 rounded-3xl shadow-2xl shadow-black/40 transition-all hover:scale-[1.02] active:scale-95 h-32 hover:bg-slate-800/40">
                        {createType === "folder" && <IoFolderOpenOutline className="shrink-0 mr-4 text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" size={60} />}
                        {createType === "deck" && <TbCards className="shrink-0 mr-4 text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" size={60} />}
                        {tagMode && <TbTag className="scale-x-[-1] shrink-0 mr-4 text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" size={60}/>}
                        <CreateDeckOrFolder parentId={type === "root" ? null : id} initialData={null} type={createType} onSubmit={handleSubmit} onBlur={handleBlur}/> 
                    </li> 
                }
                
                {(tagMode ? tags : content).map((item) => (
                    <li className="bg-white/20 border-white/20 relative p-6 flex flex-row items-center cursor-pointer border-2 rounded-3xl shadow-2xl shadow-black/40 transition-all hover:scale-[1.02] active:scale-95 h-32 hover:bg-slate-800/40" key={`${item.type}-${item.id}`} onClick={() => handleClick(item)}>
                        {item.type === "folder" && <IoFolderOpenOutline className="shrink-0 mr-4 text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" size={60} />}
                        {item.type === "deck" && <TbCards className="shrink-0 mr-4 text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" size={60} />}
                        {tagMode && <TbTag className="scale-x-[-1] shrink-0 mr-4 text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" size={60}/>}
                        <div className="flex-1 min-w-0">
                            <h3 className={`${!item.type && !tagMode ? "w-66 break-words overflow-y-hidden" : "truncate"} self-baseline text-white font-bold text-lg leading-tight`}>{(item.type == null && !tagMode) ? item.question : item.name}</h3>
                            {item.type && <p>{(item.childFoldersSize !== null) && <span className="mx-2 text-rose-600 text-sm font-bold leading-tight">{item.childFoldersSize} folder{item.childFoldersSize !== 1 ? "s" : ""}</span>} 
                            {(item.childDecksSize !== null) && <span className= "mx-2 text-cyan-300 text-sm font-bold leading-tight">{item.childDecksSize} deck{item.childDecksSize !== 1 ? "s" : ""}</span>}
                            {(item.flashcardsSize !== null) && <span className=" mx-2 text-yellow-300 text-sm font-bold leading-tight">{item.flashcardsSize} flashcard{item.flashcardsSize !== 1 ? "s" : ""}</span>}</p> }
                        </div>
                        <button className="absolute bottom-4 right-4 flex items-center justidy-center" onClick={(e) => handleDelete(e,item) }><FaRegTrashAlt className="text-red-600/90 hover:text-red-600 hover:scale-110 active:scale-90" size={22}/></button>
                    
                    </li>
                ))}
            </ul>
            </>
        )
        
}