
document.addEventListener('DOMContentLoaded', function() {
    
    createFeelingHungryButton();
    
    
    initFeelingHungryButton();
});


function createFeelingHungryButton() {
    const button = document.createElement('button');
    button.id = 'feeling-hungry-btn';
    button.className = 'feeling-hungry tooltip';
    button.innerHTML = '<i class="fa fa-cutlery"></i> Feeling Hungry?';
    
    // Add tooltip
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltiptext';
    tooltip.textContent = 'Click for a random food suggestion!';
    button.appendChild(tooltip);
    
    const exploreHeading = document.querySelector('.categories h2');
    if (exploreHeading) {
        exploreHeading.style.display = 'inline-block';
        exploreHeading.parentNode.insertBefore(button, exploreHeading.nextSibling);
    }
}

function initFeelingHungryButton() {
    const button = document.getElementById('feeling-hungry-btn');
    if (!button) return;
    
    button.addEventListener('click', function() {
      
        const foodMenuBoxes = document.querySelectorAll('.food-menu-box');
        if (foodMenuBoxes.length === 0) return;
        
     
        document.querySelectorAll('.food-highlight').forEach(item => {
            item.classList.remove('food-highlight');
        });
       
        const randomIndex = Math.floor(Math.random() * foodMenuBoxes.length);
        const selectedFood = foodMenuBoxes[randomIndex];
        
        
        selectedFood.classList.add('food-highlight');
        
        
        selectedFood.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        const foodName = selectedFood.querySelector('h4').textContent;
        const foodPrice = selectedFood.querySelector('.food-price').textContent;
        
        // Show notification
        showNotification(`How about trying ${foodName} for ${foodPrice}?`);
    });
}

/**
 * Shows a temporary notification message
 * @param {string} message - The message to display
 */
function showNotification(message) {
    
    let notificationContainer = document.getElementById('notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.top = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '10000';
        document.body.appendChild(notificationContainer);
    }
    
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.backgroundColor = '#ff6b81';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.marginBottom = '10px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(50px)';
    notification.style.transition = 'all 0.3s ease';
    notification.textContent = message;
    
    notificationContainer.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}