import { useState, useCallback } from 'react';
import FlashCard from './FlashCard';
import { useParams } from 'react-router-dom';




export default function CramMode() {
    const {type, id} = useParams();
    const [cards,setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMoreCardsUrl = type === "root" ? `http://localhost:8080/api/cram` : `http://localhost:8080/api/cram/${type}/${id}`;
    const submitScoreUrl = 'http://localhost:8080/api/flashcard';

    const fetchMoreCards = useCallback(() => {
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
    }, [fetchMoreCardsUrl, isLoading]);

    function newCard() {
        if(currentIndex % 5 == 3) {
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
        })
        .catch(err => console.error("Connection error", err));

        newCard();
    }

   if (cards.length === 0) {
        fetchMoreCards();
        return <div className="text-center p-10">Loading deck...</div>;
    }


    const card = cards[currentIndex];
    const question = card.question;
    const answer = card.answer;
    const cardId = card.id;

    return (
        <FlashCard 
            key={currentIndex}
            question={question}
            answer={answer}
            onScore={submitScore}
        />
    )
}