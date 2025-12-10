import { Link, useLocation } from "react-router-dom";
import { IconHome, IconFileText, IconList, IconSettings } from "@tabler/icons-react";

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        {
            path: "/",
            label: "Strona główna",
            icon: IconHome,
        },
        {
            path: "/wniosek",
            label: "Wniosek",
            icon: IconFileText,
        },
        {
            path: "/wnioski",
            label: "Lista wniosków",
            icon: IconList,
        },
        {
            path: "/settings",
            label: "Ustawienia",
            icon: IconSettings,
        },
    ];

    const isActive = (path: string) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <aside className="position-fixed top-0 start-0 h-100 bg-white border-end shadow-sm sidebar-container">
            <div className="bg-primary text-white p-4 border-bottom">
                <h4 className="mb-0 fw-semibold">ZUS</h4>
            </div>
            <nav className="flex-grow-1 overflow-auto py-3">
                <ul className="list-group list-group-flush">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <li key={item.path} className="list-group-item border-0 px-0 py-0">
                                <Link
                                    to={item.path}
                                    className={`d-flex align-items-center text-decoration-none px-4 py-3 sidebar-link ${
                                        active 
                                            ? "bg-light text-primary fw-semibold" 
                                            : "text-body"
                                    }`}
                                >
                                    <Icon size={20} className="me-3 flex-shrink-0" />
                                    <span className="d-none d-md-inline">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;

