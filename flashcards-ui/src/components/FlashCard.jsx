
function BackSide({answer}) {
    return (
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl shadow-2xl flex p-4 bg-main ">
            <h2 className="select-none whitespace-normal
            wrap-break-words">{answer}</h2>
        </div>
    );
}


function FrontSide({question}) {
    return (
        <div className="absolute inset-0 backface-hidden rounded-3xl shadow-2xl flex p-4 bg-main ">
            <h2 className="select-none whitespace-normal
            wrap-break-words">{question}</h2>
        </div>
    );
}

export default function FlashCard({ question, answer, isFlipped,setFlipped }) {
    

    return (
        
        

        <div className="perspective-1000 w-80 h-100  ">
        <div className="absolute inset-0 bg-white/40 rounded-3xl rotate-2 translate-y-2 translate-x-1 -z-10 shadow-md"></div>
        <div className="absolute inset-0 bg-white/20 rounded-3xl -rotate-1 translate-y-4 -z-20 shadow-sm"></div>
        <div className={`relative w-full h-full
            border-gray-200          
            rounded-3xl               
            shadow-xl                 
            border     
            p-6
            transition-transform 
            duration-700 
            transform-style-3d
            cursor-pointer
            perspective-1000
            
            ${isFlipped ? 'rotate-y-180' : ''}`} 
            onClick={() => !isFlipped && setFlipped(true)}>
                
                <FrontSide question={question} />
                <BackSide answer={answer} />
           
        </div>
        </div>
    );
}

