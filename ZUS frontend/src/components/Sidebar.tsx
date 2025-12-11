import { Link, useLocation } from "react-router-dom";
import { IconHome, IconFileText, IconSettings } from "@tabler/icons-react";

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
        <aside className="sidebar">
            <div className="sidebar-header">
                <h4 className="sidebar-title">ZUS</h4>
            </div>
            <nav className="sidebar-nav">
                <ul className="sidebar-menu">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.path} className="sidebar-menu-item">
                                <Link
                                    to={item.path}
                                    className={`sidebar-menu-link ${
                                        isActive(item.path) ? "active" : ""
                                    }`}
                                >
                                    <Icon className="sidebar-icon" size={20} />
                                    <span className="sidebar-label">{item.label}</span>
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







