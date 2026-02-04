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

    function handleCreate() {
        navigate(`/explorer/create/deck/${id}`, {replace : true});
    }

    function handleEdit() {
        navigate(`/explorer/edit/${type}/${id}`, {replace : true});
    }

    function handlePlay() {
        navigate(cramModeUrl);
    }

    return (
        <div>
            <h2>{type !== "root" ? item.name : ''}</h2>
            
            <button onClick={ handlePlay }>Play</button>
            {type === "deck" && <button onClick={ handleCreate }>Create</button>}
            {type !== "root" &&<button onClick={ handleEdit }>Edit</button>}
        </div>
    );
}