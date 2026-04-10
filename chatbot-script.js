class PortfolioChatbot {
    constructor() {
        this.chatWindow = document.querySelector('.chatbot-window');
        this.toggleBtn = document.querySelector('.chatbot-toggle');
        this.closeBtn = document.querySelector('.close-chat');
        this.chatInput = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-chat');
        this.messagesContainer = document.getElementById('chat-messages');
        this.historyContainer = document.getElementById('history-container');
        this.historyList = document.getElementById('history-list');
        this.chatMessagesContainer = document.querySelector('.chat-messages-container');
        
        this.currentChatId = this.getOrCreateSessionId();
        this.chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || {};
        this.isHistoryView = false;
        this.hasWelcomeMessage = false;
        
        this.init();
    }
    
    getOrCreateSessionId() {
        let sessionId = localStorage.getItem('currentSessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('currentSessionId', sessionId);
        }
        return sessionId;
    }
    
    init() {
        if (!this.toggleBtn || !this.chatWindow) {
            console.error('Chatbot elements not found!');
            return;
        }
        
        this.toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleChat();
        });
        
        this.closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.closeChat();
        });
        
        this.sendBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.sendMessage();
        });
        
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        const newChatBtn = document.querySelector('.new-chat');
        const historyBtn = document.querySelector('.history-btn');
        const clearAllBtn = document.getElementById('clear-all-history');
        
        if (newChatBtn) newChatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.newChat();
        });
        
        if (historyBtn) historyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleHistory();
        });
        
        if (clearAllBtn) clearAllBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.clearAllHistory();
        });
        
        this.loadCurrentChat();
        this.renderHistory();
    }
    
    // ✅ FIXED: New Chat - Creates NEW Session
    newChat() {
        console.log('Creating NEW chat session...');
        
        // ✅ STEP 1: Save current session BEFORE creating new
        if (this.messagesContainer.children.length > 0) {
            this.saveCurrentSession();
        }
        
        // ✅ STEP 2: Generate COMPLETELY NEW unique ID
        this.currentChatId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        // ✅ STEP 3: Reset everything
        this.messagesContainer.innerHTML = '';
        this.hasWelcomeMessage = false;
        this.isHistoryView = false;
        this.historyContainer.style.display = 'none';
        if (this.chatMessagesContainer) {
            this.chatMessagesContainer.style.display = 'block';
        }
        
        // ✅ STEP 4: Show fresh welcome
        setTimeout(() => {
            this.showWelcomeMessage();
        }, 200);
        
        this.chatInput.focus();
        
        console.log('New session created:', this.currentChatId);
    }
    
    toggleChat() {
        this.chatWindow.classList.toggle('active');
        if (this.chatWindow.classList.contains('active')) {
            if (!this.hasWelcomeMessage) {
                setTimeout(() => this.showWelcomeMessage(), 300);
            }
            this.chatInput.focus();
        }
    }
    
    closeChat() {
        this.saveCurrentSession(); // ✅ Save before close
        this.chatWindow.classList.remove('active');
        this.isHistoryView = false;
        this.historyContainer.style.display = 'none';
        if (this.chatMessagesContainer) {
            this.chatMessagesContainer.style.display = 'block';
        }
    }
    
    showWelcomeMessage() {
        const welcomeMessages = [
            "Hello! 👋 How can I assist you with my portfolio today?",
            "Hi there! 😊 Ready to explore my work? Ask me anything!",
            "Hey! 🌟 What would you like to know about my projects or skills?",
            "Hello! 💼 How can I help you learn more about my experience?",
            "Hi! 🚀 Ask me about my projects, skills, or how to get in touch!"
        ];
        
        const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        this.addMessage('bot', randomWelcome);
        this.hasWelcomeMessage = true;
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        this.addMessage('user', message);
        this.chatInput.value = '';
        this.chatInput.disabled = true;
        
        setTimeout(() => {
            const aiResponse = this.getAIResponse(message);
            this.addMessage('bot', aiResponse);
            this.chatInput.disabled = false;
            this.chatInput.focus();
            this.saveCurrentSession(); // ✅ Save after AI response
        }, 800);
    }
    
    addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';
        bubble.textContent = text;
        
        messageDiv.appendChild(bubble);
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    getAIResponse(message) {
        const lowerMsg = message.toLowerCase().trim();
        const responses = {
            "hello|hi|hey|good morning|good afternoon|good evening": "Hello! Thanks for visiting my portfolio. How can I assist you today?",
            "how are you|how's it going|how is your day": "I'm doing well, thank you! Ready to help you explore my work. What interests you?",
            "project|projects|work|portfolio|what have you built": "I've worked on a variety of projects including responsive web applications, modern UI/UX designs, and full-stack solutions. Scroll up to see my featured projects or ask about a specific technology!",
            "skills|skill|tech|technology|technologies|stack|what technologies": "My core skills include:\n• Frontend: React, JavaScript, Tailwind CSS, HTML5, CSS3\n• Backend: Node.js, Express, Python\n• Tools: Git, Figma, VS Code\n• Databases: MongoDB, PostgreSQL\n\nNeed details on any of these?",
            "contact|email|phone|reach|message|get in touch|hire|job|freelance|collaborate": "I'd love to connect! Here's how:\n📧 **your-email@domain.com**\n📱 **+1 (555) 123-4567**\n💼 **LinkedIn: linkedin.com/in/yourname**\n🌐 **Portfolio: yourwebsite.com**\n\nUse the contact form above or email me directly!",
            "default": "Thanks for your message! To give you the best help, could you tell me more? You can ask about:\n• My projects & portfolio\n• Skills & technologies\n• Contact information\n• Availability & rates"
        };
        
        for (let key in responses) {
            if (key === "default") continue;
            const keywords = key.split("|");
            if (keywords.some(keyword => lowerMsg.includes(keyword.trim()))) {
                return responses[key];
            }
        }
        return responses["default"];
    }
    
    // ✅ SAVES ENTIRE SESSION
    saveCurrentSession() {
        if (this.messagesContainer.children.length === 0) return;
        
        const messages = Array.from(this.messagesContainer.querySelectorAll('.message')).map(msg => {
            const bubble = msg.querySelector('.msg-bubble');
            return {
                sender: msg.classList.contains('user') ? 'user' : 'bot',
                text: bubble ? bubble.textContent : '',
                timestamp: new Date().toISOString()
            };
        });
        
        const sessionData = {
            messages: messages,
            title: this.generateSessionTitle(messages),
            timestamp: new Date().toLocaleString(),
            messageCount: messages.length,
            lastUpdated: new Date().toISOString()
        };
        
        this.chatHistory[this.currentChatId] = sessionData;
        localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
    }
    
    generateSessionTitle(messages) {
        const firstMsg = messages[0]?.text?.toLowerCase() || '';
        if (firstMsg.includes('hello') || firstMsg.includes('hi')) return 'Welcome Chat';
        if (firstMsg.includes('project')) return 'Projects Discussion';
        if (firstMsg.includes('contact')) return 'Contact Info';
        if (firstMsg.includes('skill')) return 'Skills & Tech';
        return 'Portfolio Chat';
    }
    
    loadCurrentChat() {
        const savedSession = this.chatHistory[this.currentChatId];
        if (savedSession && savedSession.messages.length > 0) {
            this.messagesContainer.innerHTML = '';
            savedSession.messages.forEach(msg => {
                if (msg.text) {
                    this.addMessage(msg.sender, msg.text);
                    if (msg.sender === 'bot' && !this.hasWelcomeMessage) {
                        this.hasWelcomeMessage = true;
                    }
                }
            });
        }
    }
    
    toggleHistory() {
        this.isHistoryView = !this.isHistoryView;
        if (this.isHistoryView) {
            this.historyContainer.style.display = 'block';
            if (this.chatMessagesContainer) this.chatMessagesContainer.style.display = 'none';
            this.renderHistory();
        } else {
            this.historyContainer.style.display = 'none';
            if (this.chatMessagesContainer) this.chatMessagesContainer.style.display = 'block';
        }
    }
    
    renderHistory() {
        this.historyList.innerHTML = '';
        const sessions = Object.values(this.chatHistory)
            .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
        
        if (sessions.length === 0) {
            this.historyList.innerHTML = '<div style="text-align:center;padding:40px;color:rgba(255,255,255,0.5);">No chat history yet</div>';
            return;
        }
        
        sessions.forEach(session => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.dataset.chatId = Object.keys(this.chatHistory).find(key => 
                this.chatHistory[key].timestamp === session.timestamp
            );
            
            historyItem.innerHTML = `
                <div class="history-title">${session.title}</div>
                <div class="history-preview">${session.messages[0]?.text?.substring(0, 50) + '...'}</div>
                <div class="history-meta">
                    <span class="history-time">${session.timestamp}</span>
                    <span class="history-count">${session.messageCount} msgs</span>
                </div>
                <button class="history-delete">×</button>
            `;
            
            historyItem.addEventListener('click', (e) => {
                if (!e.target.classList.contains('history-delete')) {
                    this.loadChat(historyItem.dataset.chatId);
                }
            });
            
            historyItem.querySelector('.history-delete').addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteChat(historyItem.dataset.chatId);
            });
            
            this.historyList.appendChild(historyItem);
        });
    }
        
    loadChat(chatId) {
        this.currentChatId = chatId;
        this.isHistoryView = false;
        this.historyContainer.style.display = 'none';
        if (this.chatMessagesContainer) this.chatMessagesContainer.style.display = 'block';
        this.loadCurrentChat();
    }
    
    deleteChat(chatId) {
        if (confirm('Delete this entire chat session?')) {
            delete this.chatHistory[chatId];
            localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
            this.renderHistory();
        }
    }
    
    clearAllHistory() {
        if (confirm('Delete ALL chat sessions? This cannot be undone.')) {
            this.chatHistory = {};
            localStorage.removeItem('chatHistory');
            localStorage.removeItem('currentSessionId');
            this.renderHistory();
        }
    }
}

// ✅ Auto-save every 10 seconds during active chat
let autoSaveInterval;
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new PortfolioChatbot();
    
    // Auto-save during active session
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && chatbot.chatWindow.classList.contains('active')) {
            chatbot.saveCurrentSession();
        }
    });
});
