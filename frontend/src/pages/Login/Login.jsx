import PublicLayout from "../../layouts/PublicLayout/PublicLayout";
import LoginForm from "../../components/LoginForm/LoginForm";

import "./Login.css";

function Login() {
    return (
        <PublicLayout>
            <main className="login-page">
                <LoginForm />
            </main>
        </PublicLayout>
    );
}

export default Login;