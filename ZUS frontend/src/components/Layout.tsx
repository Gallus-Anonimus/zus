import { ReactNode } from "react";
import Sidebar from "./Sidebar/Sidebar.tsx";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="d-flex min-vh-100 bg-light">
            <Sidebar />
            <main className="flex-grow-1" style={{ marginLeft: "260px", padding: "2rem" }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;

