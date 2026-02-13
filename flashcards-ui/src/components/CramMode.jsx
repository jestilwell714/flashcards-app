import { API_BASE_URL } from "../config"; 
import { useState } from 'react';
import FlashCard from './FlashCard';
import { useNavigate, useParams } from 'react-router-dom';
import FeedBackControls from './FeedBackControls';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import LoadingSpinner from "./LoadingSpinner";


export default function CramMode({item}) {
    const {type, id} = useParams();
    const [cards,setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isFlipped, setFlipped] = useState(false);
    const navigate = useNavigate();

    const fetchMoreCardsUrl = type === "root" ? `${API_BASE_URL}/api/cram` : `${API_BASE_URL}/api/cram/${type}/${id}`;
    const submitScoreUrl = `${API_BASE_URL}/api/flashcard`;

    const card = cards[currentIndex];

    const fetchMoreCards = () => {
        if (isLoading) return;
        setIsLoading(true);
        fetch(fetchMoreCardsUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': '1'
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((newCards) => {
            setCards((prevDeck) => [...prevDeck, ...newCards]);
            setIsLoading(false);

        })
        .catch((error) => {
            console.error('Error fetching more cards:', error);
            setIsLoading(false);
        });
    };

    function newCard() {
        if(currentIndex >= cards.length - 2) {
            fetchMoreCards();
        }
        setCurrentIndex(currentIndex+1);

    }

    const submitScore = (score) => {
        fetch(`${submitScoreUrl}/${cardId}/score`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'X-User-ID': '1'
                     },
            body: JSON.stringify(score)
        })
        .then(response => {
            if (!response.ok) console.error("Database didn't update the score");
            newCard();
            setFlipped(false);
        })
        .catch(err => console.error("Connection error", err));

        
    }

  
    if (cards.length === 0 || !card) {
        fetchMoreCards();
        return <div className="text-center p-10"><LoadingSpinner /><p className="text-white mt-4 font-medium">Loading your flashcards...</p></div>;
    }


    
    const question = card.question;
    const answer = card.answer;
    const cardId = card.id;

    return (
        <div className="grad-back h-screen w-screen flex flex-col content-between items-center justify-between gap-4">
        
            <nav className="flex flex-row items-center justify-between h-24 w-full p-4">
                <a className="z-99 cursor-pointer" onClick={() => navigate(`/explorer/preview/${type}/${id}`, {replace : true} )}><IoMdArrowRoundBack className="text-white" size={26}/></a>
                {type != "root" && <h2 className=" mx-5 text-3xl text-bold truncate text-white">{ item.name}</h2>}
                <h3 className="w-6 text-white text-xl font-bold">{currentIndex}</h3>
            </nav>

            <FlashCard 
                key={currentIndex}
                question={question}
                answer={answer}
                isFlipped={isFlipped}
                setFlipped={setFlipped}
            />

            <div className="h-32">
            { isFlipped &&
                <FeedBackControls onScore={submitScore}/>
            }
            </div>
        </div>
    )
}