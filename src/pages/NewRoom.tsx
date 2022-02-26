import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ilustrattionImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Buttons';
import { useAuth } from '../hooks/useAuth';
import { database, ref, push } from '../services/firebase';

import '../styles/auth.scss';

export function NewRoom() {    
    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('');
    const navigate = useNavigate();

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') return;

        const roomRef = ref(database, 'rooms');

        const firebaseRoom = await push(roomRef, ({
            title: newRoom,
            authorId: user?.id,
        }));

        navigate(`/rooms/${firebaseRoom.key}`);
    }

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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to='/'>Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}