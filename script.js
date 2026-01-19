// Get all color elements
const colors = document.querySelectorAll('.color');
const notification = document.getElementById('notification');

// Add click event listener to each color
colors.forEach(color => {
    color.addEventListener('click', () => {
        const hexCode = color.getAttribute('data-hex');
        
        // Copy to clipboard
        copyToClipboard(hexCode);
        
        // Show notification
        showNotification(`Copied ${hexCode} to clipboard!`);
    });
});

// Function to copy text to clipboard
function copyToClipboard(text,int) {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Failed to copy:', err);
    }
    
    // Remove the temporary element
    document.body.removeChild(textarea);
}

// Function to show notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide notification after 2 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 400);
}

// Add keyboard accessibility
colors.forEach(color => {
    color.setAttribute('tabindex', '0');
    color.setAttribute('role', 'button');
    color.setAttribute('aria-label', `Copy ${color.getAttribute('data-hex')} to clipboard`);
    
    color.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            color.click();
        }
    });
});
