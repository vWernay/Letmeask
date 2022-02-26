import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import ilustrattionImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Buttons';
import { useAuth } from '../hooks/useAuth';
import { database, get, ref } from '../services/firebase';

import '../styles/auth.scss';

export function Home() {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        } else {
            navigate('rooms/new');
        }
    };

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') return;

        const roomRef = await get(ref(database, `rooms/${roomCode}`));

        if (!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        if (roomRef.val().closedAt) {
            alert('Room already closed.');
            return;
        }

        navigate(`/rooms/${roomCode}`);
    };

    return (
        <div id="page-auth">
            <aside>
                <img src={ilustrattionImg} alt="Ilustração simbolizando perguntas  e respostas" />
                <strong>Crie salas de Q&amp; A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask logo" />
                    <button onClick={handleCreateRoom} className="createRoom">
                        <img src={googleIconImg} alt="Logo do google" />
                        Crie a sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}