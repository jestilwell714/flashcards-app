import PreviewPanel from "../components/PreviewPanel";
import EditPanel from "../components/EditPanel";
import CreatePanel from "../components/CreatePanel";
import FileExplorer from "../components/FileExplorer";
import CramMode from "../components/CramMode";
import { IoMdArrowRoundBack } from "react-icons/io";
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
        navigate(`/explorer/preview/deck/${id}`, {replace : true});
    }

    function handleCardEdited(updatedItem) {
        setSelectedItem(updatedItem);
        triggerRefresh();
        if(cardId) {
            navigate(-1);
        } else {
            navigate(`/explorer/preview/${type}/${id}`, {replace : true});
        }
    }

    useEffect(() => {
        if (id && type && type !== "root") {
       fetch( `http://localhost:8080/api/${type}s/${id}`, {
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
        }, [id, type, cardId]);

    function handlePlay(url) {
        navigate(url, { replace : true});
    }

    return (   
            <div className="grad overflow-y-auto grid grid-rows-[33vh_1fr] h-screen justify-around w-screen">
                <div className="relative">
                    {(type !== "root" && mode !== "cram")&& <a className="cursor-pointer absolute  left-4 top-5" onClick={() => navigate(-1)}><IoMdArrowRoundBack className="text-white hover:scale-[1.05] active:scale-95" size={26}/></a>}
                    {mode === "preview" && <PreviewPanel item={selectedItem} handlePlay={handlePlay}/>} 
                    {(mode === "edit" && type !== "root") && <EditPanel handlePlay={handlePlay} item={selectedItem}  onCardEdited={handleCardEdited} />} 
                    {(mode === "create" && type === "deck") && <CreatePanel onCardCreated={handleCardCreated} /> }
                    {(mode === "cram" && !cardId)&& <CramMode item={selectedItem}/>} 
                </div>

                <FileExplorer refreshKey={refreshKey} onCreate={triggerRefresh}/>
            </div>
    );    
}