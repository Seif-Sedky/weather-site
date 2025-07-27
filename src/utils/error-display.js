export function displayError(error, dom) {
    // Remove any existing error popup
    const existingPopup = document.querySelector('.error-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'error-popup';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    `;

    // Create popup content
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: rgba(15, 25, 70, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 40px;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(20px);
    `;

    // Error icon
    const icon = document.createElement('div');
    icon.innerHTML = '⚠️';
    icon.style.cssText = `
        font-size: 3rem;
        margin-bottom: 20px;
    `;

    // Error message
    const message = document.createElement('p');
    message.textContent = error.message?.includes('fetch') || error.message?.includes('network')
        ? 'Unable to fetch weather data. Please check your connection.'
        : 'Something went wrong. Please check the spelling of the location.';
    message.style.cssText = `
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.1rem;
        margin: 0 0 30px 0;
        line-height: 1.5;
    `;

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'OK';
    closeBtn.style.cssText = `
        background: linear-gradient(135deg, #00d9ff, #7c3aed);
        border: none;
        border-radius: 12px;
        padding: 12px 30px;
        color: white;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: transform 0.2s ease;
    `;

    // Close button hover
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.transform = 'translateY(-2px)';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.transform = 'translateY(0)';
    });

    // Close popup functionality
    const closePopup = () => overlay.remove();
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });

    // Escape key to close
    document.addEventListener('keydown', function escClose(e) {
        if (e.key === 'Escape') {
            closePopup();
            document.removeEventListener('keydown', escClose);
        }
    });

    // Assemble popup
    popup.appendChild(icon);
    popup.appendChild(message);
    popup.appendChild(closeBtn);
    overlay.appendChild(popup);

    // Add to page
    document.body.appendChild(overlay);

    console.error('Weather App Error:', error);
}