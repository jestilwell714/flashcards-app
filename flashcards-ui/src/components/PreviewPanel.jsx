import { useNavigate, useParams } from 'react-router-dom';

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
        <div className="mx-6 mt-4 flex-1 flex flex-col items-center justify-center h-full gap-4">
            <h2 className="self-start overflow-hidden whitespace-nowrap w-full cursor-pointer text-white" onClick={ handleEdit}>{type !== "root" ? item.name : ''}</h2>
            
            <button className="px-10 py-3 text-white font-black uppercase tracking-widest rounded-full
                   transition-all duration-100 active:scale-95 bg-linear-to-br from-amber-400 to-orange-500 hover:to-orange-600 hover:scale-105 shadow-lg shadow-black/30" onClick={ handlePlay }>Play</button>
        </div>
    );
}