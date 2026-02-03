import { useNavigate } from 'react-router-dom';

export default function PreviewPanel( {item, type, onPlay, onCreate, onEdit} ) { 
    const navigate = useNavigate();
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