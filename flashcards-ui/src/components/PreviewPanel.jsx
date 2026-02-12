import { useNavigate, useParams } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";

export default function PreviewPanel( {item} ) { 
    const navigate = useNavigate();
    const {type, id} = useParams();

    if(!item && type != "root") {
        return (
            <div className="flex items-center justify-center p-12 text-react-cyan animate-pulse">
                Loading Details...
            </div>
        );
    }   
    const cramModeUrl = type === "root" ? '/explorer/cram/root/0' : `/explorer/cram/${type}/${item.id}`;

    /*
    function handleCreate() {
        navigate(`/explorer/create/deck/${id}`, {replace : true});
    }
    */

    function handleEdit() {
        navigate(`/explorer/edit/${type}/${id}`, {replace : true});
    }

    function handlePlay() {
        navigate(cramModeUrl, { replace : true});
    }

    return (
        <div className="mx-6 mt-4 flex-1 flex flex-col items-center justify-center h-full gap-10 ">
            {type !== "root" ? <div className="flex flex-row gap-3 items-center justify-center cursor-pointer w-full" onClick={ handleEdit}>   
                <h2 className="max-w-70 overflow-hidden text-center text-bold truncate text-white" >{item.name}</h2>
                <FaRegEdit className="shrink-0 text-white text-bold flex-none" size={28} strokeWidth={9}/>
            </div> : <h2 className="text-center text-bold text-white" >Flashcards API</h2>}
            <button className="px-10 py-3 text-white font-black uppercase tracking-widest rounded-full
                   transition-all duration-100 active:scale-95 bg-linear-to-br from-amber-400 to-orange-500 hover:to-orange-600 hover:scale-105 shadow-lg shadow-black/30" onClick={ handlePlay }>Play</button>
        </div>
    );
}