import { useNavigate, useParams } from 'react-router-dom';

export default function PreviewPanel( {item, onPlay, onCreate, onEdit} ) { 
    const navigate = useNavigate();
    const {type} = useParams();

    if(!item && type != "root") {
        return (
            <div className="flex items-center justify-center p-12 text-react-cyan animate-pulse">
                Loading Details...
            </div>
        );
    }   
    const cramModeUrl = type === "root" ? '/cram/root/0' : `/cram/${type}/${item.id}`;

    function handleCreate() {
        onCreate();
    }

    function handleEdit() {
        onEdit();
    }

    function handlePlay() {
        navigate(cramModeUrl);
        onPlay();
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