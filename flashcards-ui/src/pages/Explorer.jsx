import PreviewPanel from "../components/PreviewPanel";
import EditPanel from "../components/EditPanel";
import CreatePanel from "../components/CreatePanel";
import FileExplorer from "../components/FileExplorer";
import CramMode from "../components/CramMode";
import { useState } from "react";

export default function Explorer() {
    const [selectedMode, setSelectedMode] = useState("preview");
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedType, setSelectedType] = useState("root");
    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = () => setRefreshKey(prev => prev + 1);

    function handleCardCreated() {
        triggerRefresh();
        setSelectedMode("preview");
    }

    function handleSelect(item, type, mode) {
        setSelectedMode(mode);
        setSelectedItem(item);
        setSelectedType(type);
    }

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
            <div>
                {selectedMode === "preview" && <PreviewPanel item={selectedItem} type={selectedType} onPlay={handleCramMode} onCreate={selectedType => handleCreateMode(selectedType)} onEdit={handleEditMode}/>} 
                {selectedMode === "edit" && <EditPanel item={selectedItem} type={selectedType} onCardEdited={handleCardCreated}/>} 
                {selectedMode === "create" && <CreatePanel type={selectedType} onCardCreated={handleCardCreated} /> }
                {selectedMode === "cram" && <CramMode/>} 
                <FileExplorer onSelectItem={handleSelect} refreshKey={refreshKey} onCreate={triggerRefresh}/>
            </div>
    );
}