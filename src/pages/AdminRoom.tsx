import { useNavigate, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import deleteImg from '../assets/images/delete.svg';

import { Button } from '../components/Buttons'
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import { database, ref, remove, update } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const params = useParams() as RoomParams;
    const roomId = params.id;
    const navigate = useNavigate();

    const { questions, title } = useRoom(roomId);

    async function handleEndRoom() {
        await update(ref(database, `rooms/${roomId}`), {
            closedAt: new Date(),
        });

        navigate('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (confirm('Tem certeza que você deseja excluir está pergunta?')) {
            await remove(ref(database, `rooms/${roomId}/questions/${questionId}`));
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
            isAnswered: true,
        });
    }

    async function handleHighliteQuestion(questionId: string) {
        await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
            isHighlighted: true,
        });
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleHighliteQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque à pergunta" />
                                        </button>
                                    </>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    )
}