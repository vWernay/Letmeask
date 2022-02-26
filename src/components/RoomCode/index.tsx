import copyImg from '../../assets/images/copy.svg';

import './styles.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomToClipboard() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button className="room-code" onClick={copyRoomToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room rode" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}