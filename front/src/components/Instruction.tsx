import React from "react";
import styles from './Instruction.module.css';
import classNamesBind from "classnames/bind";
import {Popup} from "./Popup";
import {Paragraph} from "./Paragraph";

const cx = classNamesBind.bind(styles);

const Instruction: React.FC<any> = ({ onClose }) => <Popup onCloseClick={onClose}>
    <div className={styles.Header}>Инструкция</div>
    <Paragraph>
        Для просмотра балета и&nbsp;участия в&nbsp;голосовании вам потребуется стабильное подключение к&nbsp;интернету
        и&nbsp;любое удобное для вас устройство: компьютер или SMART TV.
    </Paragraph>
    <Paragraph>
        Кнопки голосования появятся на&nbsp;экране вашего девайса, когда в&nbsp;прямой трансляции произойдет
        сюжетный поворот. У&nbsp;вас будет ровно 2&nbsp;минуты, чтобы сделать свой выбор и&nbsp;повлиять
        на&nbsp;развитие сюжета.
    </Paragraph>
    <Paragraph>
        Мы&nbsp;рекомендуем смотреть балет на&nbsp;большом экране. Используйте любой удобный для вас
        способ подключения, описанный ниже:
    </Paragraph>
    <div className={styles.HeaderContainer}>
        <div className={styles.Way}>Способ&nbsp;&#8470;&nbsp;1</div>
        <div className={styles.HeaderInner}>Просмотр через HDMI-подключение</div>
    </div>
    <div className={cx(styles.Container, styles.Horizontal)}>
        <div className={styles.InnerContainer}>
            <div className={cx(styles.Laptop, styles.Icon)} />
            <div className={styles.Text}>Откройте трансляцию на&nbsp;вашем ноутбуке</div>
            <div className={cx(styles.Next, styles.HideOnMobile)} />
        </div>
        <div className={cx(styles.Next, styles.HideOnDesktop)} />
        <div className={styles.InnerContainer}>
            <div className={cx(styles.Hdmi, styles.Icon)} />
            <div className={styles.Text}>Подключите к&nbsp;телевизору провод HDMI</div>
            <div className={cx(styles.Next, styles.HideOnMobile)} />
        </div>
        <div className={cx(styles.Next, styles.HideOnDesktop)} />
        <div className={styles.InnerContainer}>
            <div className={cx(styles.Play, styles.Icon)} />
            <div className={styles.Text}>Наслаждайтесь представлением на&nbsp;большом экране</div>
        </div>
    </div>
    <div className={styles.Line} />
    <div className={styles.HeaderContainer}>
        <div className={styles.Way}>Способ&nbsp;&#8470;&nbsp;2</div>
        <div className={styles.HeaderInner}>Просмотр на&nbsp;Smart TV&nbsp;через приложение Vimeo</div>
    </div>
    <div className={cx(styles.Container, styles.Horizontal)}>
        <div className={styles.InnerContainer}>
            <div className={cx(styles.Qr, styles.Icon)} />
            <div className={styles.Text}>Включите Smart TV&nbsp;и&nbsp;скачайте приложение Vimeo, если у&nbsp;вас его нет</div>
            <div className={cx(styles.Next, styles.HideOnMobile)} />
        </div>
        <div className={cx(styles.Next, styles.HideOnDesktop)} />
        <div className={styles.InnerContainer}>
            <div className={cx(styles.Phone, styles.Icon)} />
            <div className={styles.Text}>Откройте приложение Vimeo и&nbsp;найдите канал БКС в&nbsp;поиске</div>
            <div className={cx(styles.Next, styles.HideOnMobile)} />
        </div>
        <div className={cx(styles.Next, styles.HideOnDesktop)} />
        <div className={styles.InnerContainer}>
            <div className={cx(styles.Tap, styles.Icon)} />
            <div className={styles.Text}>Подключитесь к&nbsp;прямой трансляции и&nbsp;наслаждайтесь представлением на&nbsp;большом экране</div>
        </div>
    </div>
    <Paragraph>
        Выберите любое удобное для вас устройство, перейдите в&nbsp;полноэкранный режим и&nbsp;воспользуйтесь своим
        телефоном, как пультом управления голосованием, отсканировав QR-код.
    </Paragraph>
    <div className={styles.LastContainer}>
        <div className={styles.Container}>
            <div className={styles.InnerContainer}>
                <div className={cx(styles.Qr, styles.Icon)} />
                <div className={styles.Text}>Отсканируйте QR-код с&nbsp;помощью камеры телефона</div>
            </div>
            <div className={styles.Next} />
            <div className={styles.InnerContainer}>
                <div className={cx(styles.Phone, styles.Icon)} />
                <div className={styles.Text}>Авторизируйтесь на&nbsp;сайте с&nbsp;помощью вашего номера телефона</div>
            </div>
            <div className={styles.Next} />
            <div className={styles.InnerContainer}>
                <div className={cx(styles.Tap, styles.Icon)} />
                <div className={styles.Text}>Голосуйте и&nbsp;влияйте на&nbsp;ход событий</div>
            </div>
        </div>
        <div className={styles.BigQR} />
    </div>
</Popup>;

export { Instruction };