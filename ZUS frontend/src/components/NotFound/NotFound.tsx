import { Link } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

function NotFound() {

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="text-center px-4" style={{ maxWidth: '600px' }}>
                <div className="mb-4">
                    <h1 
                        className="display-1 fw-bold text-primary mb-0" 
                        style={{ 
                            fontSize: '10rem',
                            lineHeight: '1',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        404
                    </h1>
                </div>
                <div className="mb-4">
                    <h2 className="h3 mb-3 fw-semibold">Strona nie została znaleziona</h2>
                    <p className="text-muted lead mb-0">
                        Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona.
                    </p>
                </div>
                <div className="mt-5">
                    <Link 
                        to="/" 
                        className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm"
                        style={{ 
                            fontSize: '1.1rem',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <IconArrowLeft stroke={2} /> Powrót do strony głównej
                    </Link>
                </div>
                <div className="mt-5 pt-4 border-top">
                    <div className="d-flex justify-content-center gap-4 flex-wrap">
                        <Link 
                            to="/" 
                            className="not-found-link small"
                        >
                            Strona główna
                        </Link>
                        <span className="text-muted">•</span>
                        <Link 
                            to="/wniosek" 
                            className="not-found-link small"
                        >
                            Wniosek
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;

