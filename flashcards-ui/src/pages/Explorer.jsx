import PreviewPanel from "../components/PreviewPanel";
import EditPanel from "../components/EditPanel";
import CreatePanel from "../components/CreatePanel";
import FileExplorer from "../components/FileExplorer";
import CramMode from "../components/CramMode";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Explorer() {
    const { mode, id, type, cardId} = useParams();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = () => setRefreshKey(prev => prev + 1);

    function handleCardCreated() {
        triggerRefresh();
        navigate(`/explorer/preview/deck/${id}`);
    }

    function handleCardEdited(updatedItem) {
        setSelectedItem(updatedItem);
        navigate(`/explorer/preview/deck/${id}`);
        triggerRefresh();
    }

    useEffect(() => {
        if (id && type && type !== "root") {
       fetch(/*cardId ? `http://localhost:8080/api/flashcards/${cardId}` :*/ `http://localhost:8080/api/${type}s/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': '1'
            }
        })
        .then(response => response.json())
        .then(data => {
            setSelectedItem(data);
            //setSelectedMode(cardId ? "edit" : "preview");
        }).catch(err => console.error("Fetch failed:", err));
    }
        }, [id, type, cardId]);


    

    return (   
            <div className="grid grid-cols-[38.2%_1fr] h-screen">
                <main className="overflow-y-auto p-12 flex justify-center items-start">
                <div className="w-full max-w-3xl">
                    {mode === "preview" && <PreviewPanel item={selectedItem} />} 
                    {(mode === "edit" && type !== "root") && <EditPanel item={selectedItem} onCardEdited={handleCardEdited} />} 
                    {(mode === "create" && type === "deck") && <CreatePanel onCardCreated={handleCardCreated} /> }
                    {(mode === "cram" && !cardId)&& <CramMode/>} 
                </div>
                </main>
                <FileExplorer  refreshKey={refreshKey} onCreate={triggerRefresh}/>
            </div>
    );
}