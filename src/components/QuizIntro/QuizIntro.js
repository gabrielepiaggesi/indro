import React from 'react';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import classes from './QuizIntro.module.css';

const QuizIntro = (props) => {
    return (
        <Card className="flex fColumn gap40 w80 mAuto pad20 boxSha br5">
            <p className={classes.title}>{props.title}</p>
            <p className={classes.bio}>Il Test dovra essere svolto in modalita completamente autonoma senza alcun aiuto esterno. Lo svolgimento del test, e la sua validita, richiede:</p>
            <ul className={classes.bio}>
                <li>Una connessione internet veloce e stabile.</li>
                {props.checkCam && <li>Consentire l'accesso alla fotocamera/webcam del computer.</li>}
                {props.checkMic && <li>Consentire l'accesso al microfono del computer.</li>}
                <li>Rispettare il timer che indica il tempo rimanente per completare il test o la domanda corrente.</li>
                <li>Non aggiornare la pagina web mentre si svolge il test, altrimenti i dati andranno perduti.</li>
                <li>Non visitare altre pagine web, o cambiare schede del browser, mentre si svolgono i test.</li>
            </ul>
            <Button className="fBold" onClick={props.onStartQuiz}>INIZIA TEST</Button>
        </Card>
    );
};

export default QuizIntro;