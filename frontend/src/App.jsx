import AppRoutes from "./routes/AppRoutes";
import AuthSessionManager from "./components/Auth/AuthSessionManager/AuthSessionManager";

function App() {
    return (
        <>
            <AuthSessionManager />
            <AppRoutes />
        </>
    );
}

export default App;