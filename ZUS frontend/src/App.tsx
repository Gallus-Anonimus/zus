import { Route, Routes } from "react-router-dom";
import Wniosek from "./components/wniosek/Wniosek.tsx";
import WnioskiList from "./components/wniosek/WnioskiList.tsx";
import NotFound from "./components/NotFound/NotFound.tsx";
import Layout from "./components/Layout.tsx";
import Settings from "./components/Settings/Settings.tsx";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<h1 className="text-center mt-5">Strona Główna</h1>} />
                <Route path="wniosek" element={<Wniosek />} />
                <Route path="wnioski" element={<WnioskiList />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
}

export default App;
