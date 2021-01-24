import React, {useContext} from "react";
import styles from './Layout.module.css';
// @ts-ignore
import {useRoutes} from "hookrouter";
import {Path} from "../constants";
import {LoginContext} from "../state/loginContext";

const params = {
    [Path.signin]: () => ({ ballerina: true }),
    [Path.signup]: () => ({ ballerina: true }),
    [Path.main]: () => ({ ballerina: true }),
    [Path.about]: () => ({ ballerina: false }),
    [Path.live]: () => ({ ballerina: false })
};

const Layout: React.FC<any> = ({ children }) => {
    const { logged } = useContext(LoginContext);
    const { ballerina } = useRoutes(params) || {};

    return (
        <div className={styles.Layout}>
            {children}
            {ballerina && !logged && <>
                <div className={styles.Ballerina} />
                <div className={styles.Clock} />
            </>}
        </div>
    );
}

export { Layout };

