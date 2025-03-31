import { useState, useEffect } from 'react';
import './mainPage.css';
import Footer from '../../components/footer/Footer';
import FormOrder from '../../components/formOrder/FormOrder';

const MainPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const ads = [
        {
        id: 1,
        title: "Быстрая доставка за 2 часа",
        description: "Курьер приедет максимально быстро",
        image: "https://sportotvet.ru/wp-content/uploads/2016/06/1xbet-6.png"
        },
        {
        id: 2,
        title: "Выгодные тарифы",
        description: "Скидки до 30% для новых клиентов",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGgmegEZtKg3x2zdpuVibqJLDX5UgsqkSjw&s"
        },
        {
        id: 3,
        title: "Гарантия сохранности",
        description: "Страхование всех отправлений",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbLm-Zvwk9fg1pmQ_aJVJSMEPW-nY8NsUjrQ&s"
        },
        {
        id: 4,
        title: "Круглосуточная поддержка",
        description: "Работаем 24/7 без выходных",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnw5izYGlZyNf-4LaQK93mr3ZB_k1gWSpVOQ&s"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % ads.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [ads.length]);

    return (
        <div>
            <div className="delivery-service container">
                <header className="header">
                <div className="container">
                    <div className="header-top">
                    <div className="logo-container">
                        <h1 className="logo">ELZAexpress <span className="logo-sub">Быстро и надежно</span></h1>
                    </div>
                    
                    {isMobile ? (
                        <button 
                        className={`burger-menu ${menuOpen ? 'open' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Меню"
                        >
                        <span></span>
                        <span></span>
                        <span></span>
                        </button>
                    ) : (
                        <nav className="navigation">
                        <ul>
                            <li><a href="#services"><i className="icon-box"></i>Услуги</a></li>
                            <li><a href="#prices"><i className="icon-ruble"></i>Цены</a></li>
                            <li><a href="#about"><i className="icon-info"></i>О нас</a></li>
                            <li><a href="#contacts"><i className="icon-phone"></i>Контакты</a></li>
                        </ul>
                        </nav>
                    )}
                    </div>

                    {isMobile && (
                    <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
                        <ul>
                        <li><a href="#services" onClick={toggleMenu}><i className="icon-box"></i>Услуги</a></li>
                        <li><a href="#prices" onClick={toggleMenu}><i className="icon-ruble"></i>Цены</a></li>
                        <li><a href="#about" onClick={toggleMenu}><i className="icon-info"></i>О нас</a></li>
                        <li><a href="#contacts" onClick={toggleMenu}><i className="icon-phone"></i>Контакты</a></li>
                        </ul>
                    </nav>
                    )}
                </div>
                </header>

                {/* Рекламный баннер */}
                <section className="banner">
                <div className="slideshow">
                    {ads.map((ad, index) => (
                    <div 
                        key={ad.id}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${ad.image})` }}
                    >
                        <div className="slide-content">
                        <h2>{ad.title}</h2>
                        <p>{ad.description}</p>
                        <button className="banner-btn">Подробнее</button>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="slide-dots">
                    {ads.map((_, index) => (
                    <span 
                        key={index} 
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                    ))}
                </div>
                </section>

                {/* Основной контент */}
                <main className="main-content container">
                    <section className="order-form-section">
                        <h2><i className="icon-delivery"></i> Оформить доставку</h2>
                        <FormOrder/>
                    </section>

                    <section className="features">
                        <div className="feature">
                        <i className="icon-clock"></i>
                        <h3>Быстро</h3>
                        <p>Доставка от 2 часов по городу</p>
                        </div>
                        <div className="feature">
                        <i className="icon-shield"></i>
                        <h3>Надежно</h3>
                        <p>Страхование всех отправлений</p>
                        </div>
                        <div className="feature">
                        <i className="icon-wallet"></i>
                        <h3>Выгодно</h3>
                        <p>Лучшие цены на рынке</p>
                        </div>
                    </section>
                </main>
            </div>
            <Footer/>
        </div>
    );
};

export default MainPage;