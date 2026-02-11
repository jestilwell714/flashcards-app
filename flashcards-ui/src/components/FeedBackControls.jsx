export default function FeedBackControls({onScore}) {

    const handleButtonClick = (e, score) => {
        e.stopPropagation(); 
        onScore(score);      
    };

    const baseButtonClass = "w-18 h-18 flex-1 rounded-xl font-bold text-white shadow-m transition-all duration-100 transform hover:scale-105 active:scale-95 uppercase tracking-wide text-sm ";

    return (
        <div className="flex gap-2 m-4">
            <button className={`${baseButtonClass} bg-linear-to-br from-rose-400 to-red-500 hover:to-red-600 shadow-black-600/30`} onClick={(e) => handleButtonClick(e,1)}>Wrong</button>
            <button className={`${baseButtonClass} bg-linear-to-br from-amber-300 to-orange-400 hover:to-orange-500 shadow-black-600/30`} onClick={(e) => handleButtonClick(e,2)}>Bad</button>
            <button className={`${baseButtonClass} bg-linear-to-br from-yellow-200 to-amber-400 hover:to-amber-500 shadow-black-300/30`} onClick={(e) => handleButtonClick(e,3)}>Okay</button>
            <button className={`${baseButtonClass} bg-linear-to-br from-cyan-300 to-emerald-500 hover:to-emerald-600 shadow-black-600/30`} onClick={(e) => handleButtonClick(e,4)}>Good</button>
        </div>
    );
}

