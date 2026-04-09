class PortfolioChatbot {
    constructor() {
        // ← CHANGE THIS TO YOUR ACTUAL API KEY (starts with 'gsk_')
        this.apiKey = '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';
        this.apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
        this.init();
    }

    init() {
        this.toggleBtn = document.querySelector('.chatbot-toggle');
        this.chatWindow = document.getElementById('portfolio-chatbot').querySelector('.chatbot-window');
        this.closeBtn = document.querySelector('.close-chat');
        this.messages = document.getElementById('chat-messages');
        this.input = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-chat');

        this.toggleBtn.addEventListener('click', () => this.toggle());
        this.closeBtn.addEventListener('click', () => this.close());
        this.sendBtn.addEventListener('click', () => this.send());
        this.input.addEventListener('keypress', (e) => e.key === 'Enter' && this.send());

        this.addBotMessage("Hi! 👋 Ready to chat about my portfolio!");
    }

    toggle() { this.chatWindow.classList.toggle('active'); }
    close() { this.chatWindow.classList.remove('active'); }

    async send() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMessage('user', text);
        this.input.value = '';
        this.sendBtn.disabled = true;
        this.input.disabled = true;

        try {
            const response = await this.getAIResponse(text);
            this.addMessage('bot', response);
        } catch (error) {
            console.error('❌ Error:', error);
            this.addMessage('bot', `⚠️ Sorry! Error: ${error.message}. Check console for details.`);
        } finally {
            this.sendBtn.disabled = false;
            this.input.disabled = false;
            this.input.focus();
        }
    }

    addMessage(type, text) {
        const div = document.createElement('div');
        div.className = `message ${type}`;
        div.innerHTML = `<div class="msg-bubble">${this.escapeHtml(text)}</div>`;
        this.messages.appendChild(div);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    addBotMessage(text) {
        this.addMessage('bot', text);
    }

    async getAIResponse(message) {
        console.log('🔄 Sending to Groq:', message);

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",  // ✅ Updated model name
                messages: [
                    {
                        role: "system", 
                        content: "You are a helpful assistant for a portfolio website. Keep answers short, friendly, and professional."
                    },
                    { role: "user", content: message }
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });

        console.log('📡 Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ API Error:', errorText);
            throw new Error(`API Error ${response.status}: ${errorText.slice(0, 100)}`);
        }

        const data = await response.json();
        console.log('✅ Success:', data);
        
        if (!data.choices || !data.choices[0]) {
            throw new Error('No response from AI');
        }

        return data.choices[0].message.content.trim();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Chatbot starting...');
    new PortfolioChatbot();
});