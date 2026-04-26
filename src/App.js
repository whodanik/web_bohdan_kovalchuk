import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './style.css'; 

const initialEvents = [
    { id: 1, title: 'Благодійний Рок-Концерт', date: '2026-05-15', type: 'Концерт', location: 'Палац Спорту, Київ', price: 800, img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop' },
    { id: 2, title: 'Театральна вистава "Тіні"', date: '2026-05-22', type: 'Театр', location: 'Оперний театр, Львів', price: 500, img: 'https://theatre.com.ua/uploads/play/odessa-vasilka/tini-zabutih-predkiv/13.jpg' },
    { id: 3, title: 'Виставка сучасного мистецтва', date: '2026-06-10', type: 'Виставка', location: 'Мистецький Арсенал, Київ', price: 300, img: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=800&auto=format&fit=crop' }, 
    { id: 4, title: 'IT Конференція 2026', date: '2026-06-01', type: 'Конференція', location: 'КВЦ Парковий, Київ', price: 1200, img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop' },
    { id: 5, title: 'Стендап: Великий сольний концерт', date: '2026-07-15', type: 'Стендап', location: 'Жовтневий палац, Київ', price: 600, img: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=800&auto=format&fit=crop' },
    { id: 6, title: 'Футбольний матч: Динамо - Шахтар', date: '2026-08-24', type: 'Спорт', location: 'НСК Олімпійський, Київ', price: 400, img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&h=500&auto=format&fit=crop' } 
];

function EventCard({ event, onBook }) {
    const [quantity, setQuantity] = useState(1);

    const handleBookClick = () => {
        onBook(event, quantity);
        setQuantity(1); 
    };


    const totalPrice = event.price * quantity;

    return (
        <div className="event-card">
            <div className="card-image-wrapper">
                <img src={event.img} alt={event.type} />
                <span className="badge event-badge">{event.type}</span>
            </div>
            <div className="card-content">
                <h3>{event.title}</h3>
                <div className="event-details">
                    <p>📅 {event.date}</p>
                    <p>📍 {event.location}</p>
                </div>
                <div className="card-footer">
                    {/* ДИНАМІЧНА ЦІНА */}
                    <p className="event-price">{totalPrice} грн</p>
                    
                    <div className="booking-controls card-booking-controls">
                        <label>Квитки:</label>
                        <input 
                            type="number" 
                            className="ticket-quantity ticket-input"
                            min="1" 
                            max="10" 
                            value={quantity} 
                            onChange={(e) => setQuantity(Number(e.target.value))} 
                        />
                        <button onClick={handleBookClick} className="btn book-btn">Забронювати</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BookingList({ bookings }) {
    if (bookings.length === 0) return <p className="empty-message">У вас ще немає бронювань.</p>;

    return (
        <div className="booking-list">
            {bookings.map((b, index) => (
                <div key={index} className="booking-item booked-item">
                    <div className="booking-info">
                        <h3 className="booked-title">{b.event.title}</h3>
                        <p className="booked-meta">{b.event.date} | {b.event.location}</p>
                        <p className="booked-details">Кількість: <strong>{b.quantity} шт.</strong> | Сума: <strong>{b.quantity * b.event.price} грн</strong></p>
                    </div>
                    <div className="status-badge paid status-success">Оплачено</div>
                </div>
            ))}
        </div>
    );
}

function Toast({ message, show, onClose }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // Закрити через 3 секунди
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <div className={`toast-notification ${show ? 'show' : ''}`}>
            <span className="toast-icon">✅</span>
            <span>{message}</span>
        </div>
    );
}

// СТОРІНКА: Події (з фільтрами згідно завданню)
function EventsPage({ onBook }) {
    const [filterType, setFilterType] = useState('Всі');
    const [sortOrder, setSortOrder] = useState('asc');

    // Логіка фільтрації та сортування
    const filteredEvents = initialEvents
        .filter(e => filterType === 'Всі' ? true : e.type === filterType)
        .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

    return (
        <div className="content-section">
            <h2 className="section-title">🔥 Топ події</h2>
            
            <div className="filters-panel">
                <label className="filter-label"><strong>Тип заходу:</strong>
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
                        <option value="Всі">Всі події</option>
                        <option value="Концерт">Концерти</option>
                        <option value="Театр">Театри</option>
                        <option value="Виставка">Виставки</option>
                        <option value="Конференція">Конференції</option>
                        <option value="Стендап">Стендап</option>
                        <option value="Спорт">Спорт</option>
                    </select>
                </label>

                <label className="filter-label"><strong>Сортувати за датою:</strong>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="filter-select">
                        <option value="asc">Спочатку найближчі</option>
                        <option value="desc">Спочатку пізніші</option>
                    </select>
                </label>
            </div>

            <div className="events-grid">
                {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} onBook={onBook} />
                ))}
            </div>
        </div>
    );
}

// СТОРІНКА: Інформація про організаторів
function OrganizersPage() {
    return (
        <div className="content-section">
            <h2 className="section-title">🚀 Про організаторів</h2>
            <div className="about-grid about-panel">
                <div className="about-text">
                    <p className="about-paragraph">Платформа <strong>EventTicket</strong> створена для того, щоб зробити пошук квитків на івенти максимально швидким та зручним. Ми співпрацюємо з провідними концертними та театральними майданчиками України, щоб забезпечити вам доступ до найкращих подій.</p>
                </div>
            </div>
        </div>
    );
}

// ГОЛОВНИЙ КОМПОНЕНТ APP
export default function App() {
    const [bookings, setBookings] = useState([]);
    const [toast, setToast] = useState({ show: false, message: '' });

    const handleBook = (event, quantity) => {
        setBookings([...bookings, { event, quantity }]);
        // Показуємо спливаюче повідомлення
        setToast({ 
            show: true, 
            message: `Успішно додано ${quantity} квитків на "${event.title}" у кошик!` 
        });
    };

    return (
        <Router>
            <div className="header">
                <Link to="/" className="logo">🎟️ EventTicket</Link>
                <div className="nav">
                    <ul className="nav-menu">
                        <li><Link to="/" className="nav-link">Події</Link></li>
                        <li><Link to="/bookings" className="nav-link">Мої бронювання</Link></li>
                        <li><Link to="/organizers" className="nav-link">Про організаторів</Link></li>
                    </ul>
                </div>
            </div>

            <div className="main app-main">
                <Routes>
                    <Route path="/" element={<EventsPage onBook={handleBook} />} />
                    <Route path="/bookings" element={
                        <div className="content-section">
                            <h2 className="section-title">🎫 Мої бронювання</h2>
                            <BookingList bookings={bookings} />
                        </div>
                    } />
                    <Route path="/organizers" element={<OrganizersPage />} />
                </Routes>
            </div>
            
            <div className="footer">
                <div className="footer-bottom">
                    <p>© 2026 EventTicket. Всі права захищено.</p>
                </div>
            </div>

            {/* Компонент спливаючого повідомлення */}
            <Toast 
                message={toast.message} 
                show={toast.show} 
                onClose={() => setToast({ ...toast, show: false })} 
            />
        </Router>
    );
}