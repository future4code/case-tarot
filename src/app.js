import axios from 'axios';
import { useEffect, useState } from 'react';
import { 
    CardsContainer,
    AppFrame,
    BackCard,
    Footer,
    StartButton
} from './styles';
import { Modal } from './modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [backCardImageUrl, setBackCardImageUrl] = useState("");
    const [cardBaseUrl, setCardBaseUrl] = useState("");
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(undefined);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get('tarot.json');
            setBackCardImageUrl(response.data.imageBackCard);
            setCardBaseUrl(response.data.imagesUrl);
            setCards(response.data.cards.map(card => ({...card, visible: true})));
        }
        fetch().catch(e => console.log('fetch error:',e));
    }, []);

    useEffect(() => {
        if(selectedCard) setModalVisible(true);
    }, [selectedCard]);

    const shuffle = () => {
        const cardsNumbered = cards.map(card => ({...card, sortNumber: Math.random()}));
        const cardsTurned = cardsNumbered.map(card => ({...card, visible: false}));
        const cardsSorted = cardsTurned.sort((a,b) => a.sortNumber - b.sortNumber);
        setCards(cardsSorted);
        console.log("cards have shuffled");
        toast.success("Cartas embaralhadas com sucesso!");
    };

    // sanity check for tests
    useEffect(() => {
        console.log("cards all invisible:",cards.reduce((c, p) => !c.visible && !p.visible, true));
    }, [cards]);

    const handleClickBackCard = (card) => {
        const newCard = cards.find(c => c.name === card.name);
        card.visible = true;
        setCards([...cards, newCard]);
        setSelectedCard(card);
        setModalVisible(true);
    }

    return (
        <>
            <AppFrame>
                <CardsContainer>
                    {cards.map((card, i) => {
                        return (
                            <li>
                                {card.visible ? <img key={i} src={`${cardBaseUrl}${card.image}`} alt={`carta de tarot do ${card.name}`}/> : <BackCard key={i} src={backCardImageUrl} alt="carta virada" onClick={() => handleClickBackCard(card)} />}
                            </li>
                        )
                    })}
                </CardsContainer>
            </AppFrame>
            <Footer><StartButton onClick={shuffle}>Começar</StartButton></Footer>
            {modalVisible && (
                <Modal onClose={() => setModalVisible(false)} role="dialog">
                    <h3>{selectedCard.name}</h3>
                    <img src={`${cardBaseUrl}${selectedCard.image}`}/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Modal>
            )}
            <ToastContainer />
        </>
    );
}

export default App;