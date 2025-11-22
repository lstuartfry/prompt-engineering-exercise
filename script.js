// Get DOM elements
const promptForm = document.getElementById('prompt-form');
const promptTitle = document.getElementById('prompt-title');
const promptContent = document.getElementById('prompt-content');
const promptsContainer = document.getElementById('prompts-container');

// Load prompts from localStorage
function loadPrompts() {
    const prompts = JSON.parse(localStorage.getItem('prompts')) || [];
    return prompts;
}

// Save prompts to localStorage
function savePrompts(prompts) {
    localStorage.setItem('prompts', JSON.stringify(prompts));
}

// Display prompts
function displayPrompts() {
    const prompts = loadPrompts();
    
    if (prompts.length === 0) {
        promptsContainer.innerHTML = '<div class="empty-state">No prompts saved yet. Create your first prompt above!</div>';
        return;
    }
    
    promptsContainer.innerHTML = '';
    
    prompts.forEach((prompt, index) => {
        const card = document.createElement('div');
        card.className = 'prompt-card';
        
        // Create preview (first 50 characters)
        const preview = prompt.content.length > 50 
            ? prompt.content.substring(0, 50) + '...' 
            : prompt.content;
        
        card.innerHTML = `
            <h3>${prompt.title}</h3>
            <p class="prompt-preview">${preview}</p>
            <button class="btn-delete" data-index="${index}">Delete</button>
        `;
        
        promptsContainer.appendChild(card);
    });
    
    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deletePrompt);
    });
}

// Add new prompt
function addPrompt(e) {
    e.preventDefault();
    
    const title = promptTitle.value.trim();
    const content = promptContent.value.trim();
    
    if (!title || !content) {
        return;
    }
    
    const prompts = loadPrompts();
    
    const newPrompt = {
        title: title,
        content: content,
        id: Date.now()
    };
    
    prompts.push(newPrompt);
    savePrompts(prompts);
    
    // Clear form
    promptTitle.value = '';
    promptContent.value = '';
    
    // Update display
    displayPrompts();
}

// Delete prompt
function deletePrompt(e) {
    const index = parseInt(e.target.getAttribute('data-index'));
    const prompts = loadPrompts();
    
    prompts.splice(index, 1);
    savePrompts(prompts);
    
    displayPrompts();
}

// Event listeners
promptForm.addEventListener('submit', addPrompt);

// Initial display
displayPrompts();

