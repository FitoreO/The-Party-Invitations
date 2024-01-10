'use client';
import styles from '../styles/page.module.css'
import Form from "@/components/Form";
import {useState} from "react";
import LoginForm from "@/components/LoginForm";

export default function Home() {
    const [showForm, setShowForm] = useState(true);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [loginBtn, setLoginBtn] = useState(true);

    const handleLoginBtn = () => {
        setShowLoginForm(true);
        setShowForm(false);
        setLoginBtn(false);
    }

    return (
        <main className={styles.main}>
            {loginBtn && <button className="login-btn" onClick={handleLoginBtn}>Login</button>}
            {showLoginForm && <LoginForm/>}
            {showForm && <Form/>}
        </main>
    )
}
