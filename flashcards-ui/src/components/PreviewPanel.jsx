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
        <div className="m-2 flex-1 flex flex-col items-center h-full">
            <h2 className="self-start mb-2 mt-2 ml-1 overflow-hidden whitespace-nowrap w-19/20 cursor-pointer" onClick={ handleEdit}>{type !== "root" ? item.name : ''}</h2>
            
            <button className="bg-amber-500 w-4/10 m-2" onClick={ handlePlay }>Play</button>
        </div>
    );
}