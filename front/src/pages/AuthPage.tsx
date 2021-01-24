import React, {useContext} from 'react';
import {Card} from "../components/Card";
import styles from "./RegisterPage.module.css";
import {useForm} from "react-hook-form";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import {LoginContext} from "../state/loginContext";

const AuthPage: React.FC = () => {
    const {register, handleSubmit, errors} = useForm();
    const { login, serverErrors } = useContext(LoginContext);
    const onSubmit = (data: any) => {
        login(data);
    };
    const commonErrors = Object.assign({}, errors, serverErrors);

    return (
        <div className={styles.Centered}>
            <Card>
                <div className={styles.Text}>
                    Войдите, чтобы принять участие в&nbsp;мероприятии
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.Row}>
                        <Input name="phone" placeholder="Телефон" register={register}
                               errors={commonErrors} type={"tel"} />
                    </div>
                    <Button wide blue type={"submit"}>
                        Войти
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export {AuthPage};