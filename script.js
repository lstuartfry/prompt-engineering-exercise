// Prompt Library Application

// Get DOM elements
const promptForm = document.getElementById('promptForm');
const promptTitleInput = document.getElementById('promptTitle');
const promptContentInput = document.getElementById('promptContent');
const promptsContainer = document.getElementById('promptsContainer');
const emptyMessage = document.getElementById('emptyMessage');

// Storage key
const STORAGE_KEY = 'promptLibrary';

// Initialize: Load and display prompts on page load
document.addEventListener('DOMContentLoaded', () => {
    displayPrompts();
});

// Handle form submission
promptForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = promptTitleInput.value.trim();
    const content = promptContentInput.value.trim();
    
    if (!title || !content) {
        alert('Please fill in both title and content fields.');
        return;
    }
    
    // Save prompt
    savePrompt(title, content);
    
    // Clear form
    promptForm.reset();
    
    // Refresh display
    displayPrompts();
});

// Save prompt to localStorage
function savePrompt(title, content) {
    const prompts = getPrompts();
    const newPrompt = {
        id: Date.now().toString(),
        title: title,
        content: content,
        createdAt: new Date().toISOString()
    };
    
    prompts.push(newPrompt);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

// Get all prompts from localStorage
function getPrompts() {
    const promptsJson = localStorage.getItem(STORAGE_KEY);
    return promptsJson ? JSON.parse(promptsJson) : [];
}

// Display all prompts
function displayPrompts() {
    const prompts = getPrompts();
    
    // Clear container
    promptsContainer.innerHTML = '';
    
    if (prompts.length === 0) {
        promptsContainer.appendChild(emptyMessage);
        return;
    }
    
    // Create and append prompt cards
    prompts.forEach(prompt => {
        const card = createPromptCard(prompt);
        promptsContainer.appendChild(card);
    });
}

// Create a prompt card element
function createPromptCard(prompt) {
    const card = document.createElement('div');
    card.className = 'prompt-card';
    
    const header = document.createElement('div');
    header.className = 'prompt-card-header';
    
    const title = document.createElement('h3');
    title.className = 'prompt-card-title';
    title.textContent = prompt.title;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deletePrompt(prompt.id));
    
    header.appendChild(title);
    header.appendChild(deleteBtn);
    
    const content = document.createElement('div');
    content.className = 'prompt-card-content';
    content.textContent = prompt.content;
    
    card.appendChild(header);
    card.appendChild(content);
    
    return card;
}

// Delete a prompt
function deletePrompt(id) {
    if (confirm('Are you sure you want to delete this prompt?')) {
        const prompts = getPrompts();
        const filteredPrompts = prompts.filter(prompt => prompt.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPrompts));
        displayPrompts();
    }
}

