import React, { useState } from 'react';

const quotes = [
    { text: "La vie est ce qui arrive quand on est occupé à faire d'autres projets.", author: "John Lennon" },
    { text: "Le succès, c'est d'aller d'échec en échec sans perdre son enthousiasme.", author: "Winston Churchill" },
    { text: "Soyez le changement que vous voulez voir dans le monde.", author: "Gandhi" },
    { text: "Le code est comme l'humour. Quand vous devez l'expliquer, c'est mauvais.", author: "Cory House" },
    { text: "La simplicité est la sophistication suprême.", author: "Leonardo da Vinci" },
];

const QuoteGenerator = () => {
    const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

    const generateNewQuote = () => {
        const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(newQuote);
    };

    return (
        <div className="quote-widget">
            <div className="quote-text">"{quote.text}"</div>
            <div className="quote-author">- {quote.author}</div>
            <button onClick={generateNewQuote} className="generate-button">
                Nouvelle citation
            </button>
        </div>
    );
};

export default QuoteGenerator;