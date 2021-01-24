import React, {useState} from 'react';
import styles from './MainPage.module.css';
import {Logo} from "../components/Logo";
import {Time} from "../components/Time";
import {Paragraph} from "../components/Paragraph";
import {Instruction} from "../components/Instruction";

const StartLivePage: React.FC = () => {
    const [opened, setOpened] = useState(false);
    const handleOpened = () => setOpened(!opened);

    return (
        <div className={styles.Block}>
            <div className={styles.Column}>
                <Logo />
                <Time />
                <Paragraph>
                    Погрузитесь в&nbsp;сказочную атмосферу классического балета &laquo;Щелкунчик&raquo;
                    в&nbsp;совершенно новом исполнении.
                </Paragraph>
                <Paragraph>
                    Всего несколько дней отделяют вас от&nbsp;истории, которая вызывает трепет с&nbsp;самого детства.
                    Прямо сейчас звезды балета оттачивают рисунок танца на&nbsp;репетициях, а&nbsp;костюмеры доводят
                    до&nbsp;идеала костюмы и&nbsp;припудривают пуанты, чтобы в&nbsp;назначенный день встретиться
                    с&nbsp;вами и&nbsp;поразить в&nbsp;самое сердце.
                </Paragraph>
                <Paragraph>
                    Пригласите своих друзей, отправив им&nbsp;приглашение со&nbsp;ссылкой на&nbsp;регистрацию
                    в&nbsp;мероприятии. Соберите близких за&nbsp;уютным праздничным столом.
                </Paragraph>
                <Paragraph>
                    Для просмотра трансляции и&nbsp;участия в&nbsp;голосовании мы&nbsp;рекомендуем заранее
                    ознакомиться с&nbsp;<span className={styles.Link} onClick={handleOpened}>инструкцией</span>.
                </Paragraph>
            </div>
            <div className={styles.ColumnSecond}>
                <div className={styles.StartPage}>
                    <Time rose />
                </div>
            </div>
            { opened && <Instruction onClose={handleOpened} /> }
        </div>
    );
}

export { StartLivePage };