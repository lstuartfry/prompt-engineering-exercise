// Get DOM elements
const promptForm = document.getElementById('promptForm');
const promptTitleInput = document.getElementById('promptTitle');
const promptContentInput = document.getElementById('promptContent');
const promptsContainer = document.getElementById('promptsContainer');
const emptyState = document.getElementById('emptyState');

// Storage key
const STORAGE_KEY = 'promptLibrary';

// Load prompts from localStorage
function loadPrompts() {
    const promptsJson = localStorage.getItem(STORAGE_KEY);
    return promptsJson ? JSON.parse(promptsJson) : [];
}

// Save prompts to localStorage
function savePrompts(prompts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

// Generate a unique ID for each prompt
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get preview text (first few words)
function getPreview(content, wordCount = 10) {
    const words = content.trim().split(/\s+/);
    if (words.length <= wordCount) {
        return content;
    }
    return words.slice(0, wordCount).join(' ') + '...';
}

// Render all prompts
function renderPrompts() {
    const prompts = loadPrompts();
    promptsContainer.innerHTML = '';

    if (prompts.length === 0) {
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
        prompts.forEach(prompt => {
            const card = createPromptCard(prompt);
            promptsContainer.appendChild(card);
        });
    }
}

// Create a prompt card element
function createPromptCard(prompt) {
    const card = document.createElement('div');
    card.className = 'prompt-card';
    card.dataset.id = prompt.id;

    const title = document.createElement('h3');
    title.textContent = prompt.title;

    const preview = document.createElement('p');
    preview.className = 'prompt-preview';
    preview.textContent = getPreview(prompt.content);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deletePrompt(prompt.id));

    card.appendChild(title);
    card.appendChild(preview);
    card.appendChild(deleteBtn);

    return card;
}

// Delete a prompt
function deletePrompt(id) {
    const prompts = loadPrompts();
    const filteredPrompts = prompts.filter(prompt => prompt.id !== id);
    savePrompts(filteredPrompts);
    renderPrompts();
}

// Handle form submission
promptForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = promptTitleInput.value.trim();
    const content = promptContentInput.value.trim();

    if (!title || !content) {
        return;
    }

    const prompts = loadPrompts();
    const newPrompt = {
        id: generateId(),
        title: title,
        content: content,
        createdAt: new Date().toISOString()
    };

    prompts.push(newPrompt);
    savePrompts(prompts);

    // Reset form
    promptForm.reset();

    // Re-render prompts
    renderPrompts();
});

// Initialize: render prompts on page load
renderPrompts();

