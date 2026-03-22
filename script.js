
const eventsData = [
    { id: 1, title: 'Благодійний Рок-Концерт', date: '15 Травня 2026', location: 'Палац Спорту, Київ', price: 800, isFuture: true, img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop', badge: 'Концерт' },
    { id: 2, title: 'Театральна вистава "Тіні"', date: '22 Травня 2026', location: 'Оперний театр, Львів', price: 500, isFuture: true, img: 'https://theatre.com.ua/uploads/play/odessa-vasilka/tini-zabutih-predkiv/13.jpg', badge: 'Мистецтво' },
    { id: 3, title: 'Минула новорічна вечірка', date: '01 Січня 2025', location: 'Київ', price: 300, isFuture: false, img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop', badge: 'Вечірка' },
    { id: 4, title: 'IT Конференція 2026', date: '10 Червня 2026', location: 'КВЦ Парковий, Київ', price: 1200, isFuture: true, img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop', badge: 'IT' }
];

const eventsContainer = document.getElementById('events-container');

let i = 0;
while (i < eventsData.length) {
    let currentEvent = eventsData[i];

    if (currentEvent.isFuture === true) {
        let card = document.createElement('div');
        card.classList.add('event-card');
        
        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${currentEvent.img}" alt="${currentEvent.badge}">
                <span class="badge">${currentEvent.badge}</span>
            </div>
            <div class="card-content">
                <h3>${currentEvent.title}</h3>
                <div class="event-details">
                    <p>📅 ${currentEvent.date}</p>
                    <p>📍 ${currentEvent.location}</p>
                </div>
                <div class="card-footer">
                    <p class="event-price">${currentEvent.price} грн</p>
                    
                    <div class="booking-controls">
                        <label for="qty-${currentEvent.id}">Квитки:</label>
                        <input type="number" id="qty-${currentEvent.id}" class="ticket-quantity" min="1" max="10" value="1" style="width: 50px;">
                    </div>
                    
                    <button class="btn book-btn" data-id="${currentEvent.id}">Забронювати квиток</button>
                </div>
            </div>
        `;
        
        eventsContainer.appendChild(card);
    }
    i++;
}

const bookButtons = document.querySelectorAll('.book-btn');
const bookingListContainer = document.getElementById('booking-list-container');

bookButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        const eventId = parseInt(button.getAttribute('data-id'));
        let selectedEvent = null;
        for (let j = 0; j < eventsData.length; j++) {
            if (eventsData[j].id === eventId) {
                selectedEvent = eventsData[j];
                break;
            }
        }

        const quantityInput = document.getElementById(`qty-${eventId}`);
        const quantity = parseInt(quantityInput.value);

        const totalCost = quantity * selectedEvent.price;

        let bookingItem = document.createElement('div');
        bookingItem.classList.add('booking-item');
        bookingItem.innerHTML = `
            <div class="booking-info">
                <h3>${selectedEvent.title}</h3>
                <p>${selectedEvent.date} | ${selectedEvent.location}</p>
                <p>Кількість: <strong>${quantity} шт.</strong> | Загальна сума: <strong>${totalCost} грн</strong></p>
            </div>
            <div class="status-badge paid">Оплачено</div>
        `;
        
        bookingListContainer.appendChild(bookingItem);

        button.textContent = "Заброньовано";
        button.style.backgroundColor = "#28a745"; 
        button.disabled = true;
        quantityInput.disabled = true; 
    });
});