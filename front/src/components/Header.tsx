import React, {useCallback, useContext, useReducer, useState} from "react";
import styles from './Header.module.css';
import classnames from 'classnames/bind';
// @ts-ignore
import {A, usePath} from "hookrouter";
import {InstructionAction, instructionReducer} from "../state/instructionAction";
import {Instruction} from "./Instruction";
import { LoginContext } from "../state/loginContext";
import {Path} from "../constants";

const cx = classnames.bind(styles);

const about = {
    text: 'О&nbsp;мероприятии',
    href: Path.about
};
const howto = {
    text: 'Инструкция',
    action: { type: InstructionAction.open }
};
const signin = {
    text: 'Войти',
    outline: true,
    href: Path.signin
};
const singnup = {
    text: 'Зарегистрироваться',
    outline: true,
    href: Path.signup
};

const useMenuItems = () => {
    const { logged } = useContext(LoginContext);
    const menuItems: any[] = [about];
    const path = usePath();

    if (logged) {
        menuItems.push(howto);
        return menuItems;
    }

    if (path === Path.signin) {
        menuItems.push(singnup);
        return menuItems;
    }

    menuItems.push(signin);
    return menuItems;
};

const MenuItem = (props: any) => {
    const path = usePath();

    const handleClick = useCallback(() => {
        props.onClick();

        if (props.action) {
            props.dispatch(props.action);
        }
    }, [ props.onClick ]);

    return (
        <>
            {props.showLine && <div className={styles.MenuItemLine} />}
            <A href={props.href || path} className={styles.MenuItem} onClick={handleClick}>
                <div className={cx({
                    MenuItemOutline: props.outline,
                    Active: path === props.href
                })} dangerouslySetInnerHTML={{ __html: props.text }} />
            </A>
        </>
    );
}

const Header: React.FC<any> = () => {
    const [opened, setOpened] = useState(false);
    const handleClick = useCallback(() => setOpened(!opened), [opened]);
    const [state, dispatch] = useReducer(instructionReducer, { opened: false });
    const handleClosePopup = useCallback(() => dispatch(({ type: InstructionAction.close })), []);
    const menuItems = useMenuItems();

    return (
        <>
            {opened && <div className={styles.FakeBlock} />}
            {opened && <div className={styles.Layout} onClick={handleClick} />}
            <header className={cx({
                Header: true,
                HeaderOpened: opened
            })}>
                <div className={styles.Top}>
                    <A href={'/'}><div className={styles.Logo} /></A>
                    <button className={styles.MenuButton} onClick={handleClick} />
                </div>
                <div className={cx({
                    HideMenu: true,
                    ShowMenu: opened
                })}>
                    {menuItems.map((item, index) => <MenuItem
                        {...item}
                        showLine={!!index}
                        key={item.text}
                        onClick={handleClick}
                        dispatch={dispatch}
                    />)}
                </div>
            </header>
            {state.opened && <Instruction onClose={handleClosePopup} />}
        </>
    )
}

export { Header };