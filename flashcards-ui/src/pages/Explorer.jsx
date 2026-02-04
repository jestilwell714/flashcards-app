import PreviewPanel from "../components/PreviewPanel";
import EditPanel from "../components/EditPanel";
import CreatePanel from "../components/CreatePanel";
import FileExplorer from "../components/FileExplorer";
import CramMode from "../components/CramMode";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Explorer() {
    const { id, type} = useParams();
    const [selectedMode, setSelectedMode] = useState("preview");
    const [selectedItem, setSelectedItem] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = () => setRefreshKey(prev => prev + 1);

    function handleCardCreated() {
        triggerRefresh();
        setSelectedMode("preview");
    }

    function handleCardEdited(updatedItem) {
        setSelectedItem(updatedItem);
        setSelectedMode("preview");
    }

    function handleSelect(item, mode) {
        setSelectedMode(mode);
        setSelectedItem(item);

    }

    useEffect(() => {
        if (id && type && type !== "root") {
       fetch(`http://localhost:8080/api/${type}s/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': '1'
            }
        })
        .then(response => response.json())
        .then(data => {
            setSelectedItem(data);
        }).catch(err => console.error("Fetch failed:", err));
    }
        }, [id, type]);
    

    function handleCramMode() {
        setSelectedMode("cram");
    }

    function handleCreateMode() {
        setSelectedMode("create");
    }

    function handleEditMode() {
        setSelectedMode("edit");
    }

    

    return (   
            <div className="grid grid-cols-[38.2%_1fr] h-screen">
                <main className="overflow-y-auto p-12 flex justify-center items-start">
                <div className="w-full max-w-3xl">
                    {selectedMode === "preview" && <PreviewPanel item={selectedItem} onPlay={handleCramMode} onCreate={handleCreateMode} onEdit={handleEditMode}/>} 
                    {(selectedMode === "edit" && type !== "root") && <EditPanel item={selectedItem} onCardEdited={handleCardEdited} onc/>} 
                    {(selectedMode === "create" && type === "deck") && <CreatePanel onCardCreated={handleCardCreated} /> }
                    {selectedMode === "cram" && <CramMode/>} 
                </div>
                </main>
                <FileExplorer onSelectItem={handleSelect} refreshKey={refreshKey} onCreate={triggerRefresh}/>
            </div>
    );
}