import React, {useContext, useState} from 'react';
import {Card} from "../components/Card";
import styles from "./RegisterPage.module.css";
import {useForm} from "react-hook-form";
import {Button} from "../components/Button";
import classNamesBind from "classnames/bind";
import {Input} from "../components/Input";
import {LoginContext} from "../state/loginContext";
import {Policy} from "../components/Policy";

const cx = classNamesBind.bind(styles);

const RegisterPage: React.FC = () => {
    const [policy, setPolicy] = useState(false);
    const {register, handleSubmit, errors} = useForm();
    const { signup, serverErrors } = useContext(LoginContext);
    const onSubmit = (data: any) => {
        signup(data);
    };
    const commonErrors = Object.assign({}, errors, serverErrors);
    const handleOpen = () => {
        setPolicy(!policy);
    };

    return (
        <Card>
            <div className={styles.Text}>
                Зарегистрируйтесь, чтобы принять участие в&nbsp;мероприятии
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.Row}>
                    <Input
                        name="first_name"
                        placeholder="Имя"
                        register={register}
                        errors={commonErrors}
                    />
                    <Input
                        name="last_name"
                        placeholder="Фамилия"
                        register={register}
                        errors={commonErrors}
                    />
                    <Input
                        name="middle_name"
                        placeholder="Отчество"
                        register={register}
                        errors={commonErrors}
                    />
                </div>
                <div className={styles.Row}>
                    <Input
                        name="city"
                        placeholder="Город"
                        register={register} errors={commonErrors}/>
                    <Input name="email" placeholder="Email" register={register} errors={commonErrors}/>
                </div>
                <div className={styles.Row}>
                    <Input name="phone" placeholder="Телефон" register={register}
                           errors={commonErrors}/>
                    <div className={styles.AddText}>
                        Для участия в&nbsp;мероприятии, укажите корректный номер телефона
                    </div>
                </div>
                <div className={styles.Row}>
                    <label className={styles.Label}>
                        <input name="accept" id="accept" type="checkbox" ref={register({required: true})} className={cx(styles.Checkbox, {
                            Error: errors.accept
                        })}/>
                        Я&nbsp;принимаю&nbsp;<span className={styles.Link} onClick={handleOpen}>соглашение на&nbsp;обработку персональных данных</span>.
                    </label>
                </div>
                <input name="partner" defaultValue="bcs" ref={register({required: true})} hidden />
                <Button wide blue type={"submit"}>
                    Войти
                </Button>
            </form>
            {policy && <Policy onClose={handleOpen} />}
        </Card>
    );
}

export {RegisterPage};