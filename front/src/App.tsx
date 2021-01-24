import React, {useCallback, useEffect, useState} from 'react';
import { Layout } from "./components/Layout";
import { BeforeTranslation } from './pages/BeforeTranslation';
// @ts-ignore
import {navigate, useRoutes} from "hookrouter";
import {Header} from "./components/Header";
import {AboutPage} from "./pages/AboutPage";
import {StartLivePage} from "./pages/StartLivePage";
import { LoginContext } from './state/loginContext';
import {Path} from "./constants";
import Cookies from 'js-cookie';
import {LivePage} from "./pages/LivePage";

const routes = {
    [Path.about]: () => <AboutPage />,
    [Path.live]: () => <StartLivePage />,
};

function App() {
    const route = useRoutes(routes);
    const [logged, setLogged] = useState(false);
    const [serverErrors, setErrors] = useState({});

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            setLogged(true);
        }
    }, []);

    const signup = useCallback(async (params) => {
        try {
            const formData = new FormData();

            for (let key in params) {
                formData.append(key, params[key]);
            }

            const response = await fetch('http://localhost:5000/signup/', {
                method: 'POST',
                body: formData
            } as any);
            const res = await response.json();

            if (response.ok) {
                setLogged(true);
                Cookies.set('token', res.token);
                navigate(Path.main);
                return ;
            }

            setErrors(res);
            console.log(res);
        } catch (e) {}
    }, []);

    const login = useCallback(async (params) => {
        try {
            const formData = new FormData();

            for (let key in params) {
                formData.append(key, params[key]);
            }

            const response = await fetch('http://localhost:5000/login/', {
                method: 'POST',
                body: formData
            } as any);
            const res = await response.json();

            if (response.ok) {
                setLogged(true);
                Cookies.set('token', res.token);
                navigate(Path.main);
                return ;
            }

            setErrors(res);
            console.log(res);
        } catch (e) {}
    }, []);

    const logout = useCallback(() => {
        setLogged(false)
    }, []);

    return (
        <LoginContext.Provider value={{ logged, login, logout, signup, serverErrors }}>
            <Layout>
                <Header />
                {route || (logged ? <LivePage /> : <BeforeTranslation />)}
            </Layout>
        </LoginContext.Provider>
  );
}

export default App;
