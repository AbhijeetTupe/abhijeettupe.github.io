// PERFECTLY SIZED RESPONSIVE CHATBOT
(function() {
    'use strict';

    setTimeout(function() {

        // Responsive breakpoints
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024;

        // ================= COMPACT FAB BUTTON =================
        const chatBtn = document.createElement('button');
        chatBtn.innerHTML = isMobile ? 
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>' :
            `
                <div style="display:flex;align-items:center;justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                    <span style="margin-left:6px;font-size:13px;">Chat</span>
                </div>
            `;
            
        chatBtn.style.cssText = `
            position:fixed;bottom:20px;right:20px;
            ${isMobile ? 'width:56px;height:56px;' : 'width:110px;height:44px;'}
            border-radius:${isMobile ? '50%' : '22px'};
            background:#1f2937;border:1px solid #374151;color:#f9fafb;
            font-size:14px;font-weight:500;cursor:pointer;z-index:99999;
            box-shadow:0 4px 20px rgba(0,0,0,0.15);transition:all 0.2s;
            font-family:'Inter',-apple-system,system-ui,sans-serif;
        `;
        
        // Hover effects
        chatBtn.onmouseover = () => {
            if (!isMobile) {
                chatBtn.style.background = '#374151';
                chatBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                chatBtn.style.transform = 'translateY(-2px)';
            }
        };
        chatBtn.onmouseout = () => {
            if (!isMobile) {
                chatBtn.style.background = '#1f2937';
                chatBtn.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                chatBtn.style.transform = 'translateY(0)';
            }
        };

        // ================= COMPACT RESPONSIVE WINDOW =================
        const chatWindow = document.createElement('div');
        chatWindow.innerHTML = `
            <div style="
                padding:${isMobile ? '14px 16px' : '18px 22px'};
                background:linear-gradient(135deg,#1e40af 0%,#1e3a8a 100%);
                color:#f8fafc;border-radius:16px 16px 0 0;
                box-shadow:0 4px 20px rgba(30,64,175,0.3);
                font-family:'Inter',-apple-system,system-ui,sans-serif;
            ">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                    <div style="min-width:0;">
                        <div style="font-size:${isMobile ? '15px' : '17px'};font-weight:600;line-height:1.2;overflow:hidden;text-overflow:ellipsis;">
                            Technical Assistant
                        </div>
                        <div style="font-size:11px;opacity:0.85;margin-top:1px;">Portfolio Support</div>
                    </div>
                    <button id="close" style="
                        background:none;border:none;color:#f8fafc;
                        font-size:${isMobile ? '18px' : '22px'};cursor:pointer;
                        padding:2px;width:${isMobile ? '28px' : '36px'};
                        height:${isMobile ? '28px' : '36px'};border-radius:8px;
                        display:flex;align-items:center;justify-content:center;
                        transition:all 0.2s;margin-left:8px;flex-shrink:0;
                    " title="Close">×</button>
                </div>
            </div>

            <div id="infoBar" style="
                padding:${isMobile ? '10px 14px' : '12px 18px'};
                font-size:${isMobile ? '11px' : '12px'};background:#f8fafc;
                border-bottom:1px solid #e5e7eb;color:#6b7280;font-weight:500;
                font-family:'Inter',-apple-system,system-ui,sans-serif;
                white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
            ">
                Initializing...
            </div>

            <div id="messages" style="
                flex:1;overflow-y:auto;background:#ffffff;
                padding:${isMobile ? '12px 14px' : '20px 18px'};
                font-family:'Inter',-apple-system,system-ui,sans-serif;
                ${isMobile ? 'min-height:180px;' : 'min-height:220px;'}
            "></div>

            <div style="
                padding:${isMobile ? '14px 16px' : '16px 20px'};
                background:#f8fafc;border-radius:0 0 16px 16px;
                border-top:1px solid #e5e7eb;
                font-family:'Inter',-apple-system,system-ui,sans-serif;
            ">
                <div style="display:flex;gap:${isMobile ? '6px' : '10px'};${isMobile ? 'flex-direction:column-reverse;' : ''}">
                    <input id="input" placeholder="${isMobile ? 'Ask...' : 'Type your query...'}" 
                    style="
                        flex:1;padding:${isMobile ? '10px 14px' : '12px 16px'};
                        border-radius:10px;border:1px solid #d1d5db;outline:none;
                        font-size:${isMobile ? '13px' : '14px'};transition:all 0.2s;
                        font-family:'Inter',-apple-system,system-ui,sans-serif;
                        box-shadow:0 1px 3px rgba(0,0,0,0.08);
                        ${isMobile ? 'order:2;' : ''}
                    ">
                    <button id="send" style="
                        padding:${isMobile ? '10px 18px' : '12px 20px'};
                        border-radius:10px;background:#1e40af;border:none;
                        color:#f8fafc;cursor:pointer;font-size:${isMobile ? '13px' : '14px'};
                        font-weight:500;transition:all 0.2s;font-family:'Inter',-apple-system,system-ui,sans-serif;
                        white-space:nowrap;box-shadow:0 2px 8px rgba(30,64,175,0.3);
                        ${isMobile ? 'width:100%;order:1;' : 'flex-shrink:0;min-width:100px;'}
                    ">Send</button>
                </div>
            </div>
        `;

        // PERFECT RESPONSIVE SIZING
        chatWindow.style.cssText = `
            position:fixed;display:none;flex-direction:column;
            background:white;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,0.2);
            font-family:'Inter',-apple-system,system-ui,sans-serif;
            z-index:100000;
            ${isMobile ? `
                left:12px;right:12px;bottom:12px;top:80px;
                width:auto;height:auto;max-height:calc(100vh - 94px);
                max-width:calc(100vw - 24px);
            ` : isTablet ? `
                left:20px;right:20px;bottom:80px;top:60px;
                width:auto;height:auto;max-height:calc(100vh - 140px);
                max-width:calc(100vw - 40px);width:380px;height:480px;
            ` : `
                bottom:90px;right:30px;width:400px;height:460px;
            `}
            max-width:95vw;max-height:85vh;
        `;

        document.body.appendChild(chatBtn);
        document.body.appendChild(chatWindow);

        const messages = chatWindow.querySelector('#messages');
        const input = chatWindow.querySelector('#input');
        const sendBtn = chatWindow.querySelector('#send');
        const close = chatWindow.querySelector('#close');
        const infoBar = chatWindow.querySelector('#infoBar');

        // ================= EVENT HANDLERS =================
        chatBtn.onclick = () => {
            chatWindow.style.display = 'flex';
            setTimeout(() => input.focus(), 150);
        };

        close.onclick = () => chatWindow.style.display = 'none';

        // Enhanced focus & hover states
        input.onfocus = () => {
            input.style.borderColor = '#1e40af';
            input.style.boxShadow = '0 0 0 3px rgba(30,64,175,0.1)';
        };
        input.onblur = () => {
            input.style.borderColor = '#d1d5db';
            input.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
        };

        [sendBtn, close].forEach(btn => {
            btn.onmouseover = () => {
                btn.style.background = '#1e3a8a';
                btn.style.transform = 'translateY(-1px)';
            };
            btn.onmouseout = () => {
                btn.style.background = '#1e40af';
                btn.style.transform = 'translateY(0)';
            };
        });

        // ================= TIME & WEATHER =================
        function getCurrentTime() {
            return new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        }

        async function fetchWeather() {
            try {
                const response = await fetch("https://wttr.in/?format=%C+%t");
                return await response.text();
            } catch {
                return "Service unavailable";
            }
        }

        async function updateStatusBar() {
            const weather = await fetchWeather();
            const time = getCurrentTime();
            infoBar.innerHTML = `Time: ${time} | Weather: ${weather}`;
        }
        setInterval(updateStatusBar, 30000);
        updateStatusBar();

        // ================= MESSAGE SYSTEM =================
        let conversationContext = null;

        function addMessage(text, isUser, isQuestion = false) {
            const messageDiv = document.createElement('div');
            messageDiv.style.cssText = `
                margin:${isMobile ? '8px 0' : '12px 0'};
                padding:${isMobile ? '10px 14px' : '14px 18px'};
                border-radius:12px;max-width:94%;word-wrap:break-word;
                font-size:${isMobile ? '13px' : '14px'};line-height:1.5;
                box-shadow:0 1px 4px rgba(0,0,0,0.06);
                font-family:'Inter',-apple-system,system-ui,sans-serif;
            `;

            if (isUser) {
                messageDiv.style.cssText += `
                    background:#eff6ff;color:#1e40af;margin-left:auto;
                    border-right:3px solid #60a5fa;font-weight:500;text-align:right;
                `;
                messageDiv.innerHTML = `<div style="font-weight:600;color:#1e3a8a;margin-bottom:4px;">You:</div>${text}`;
            } else {
                messageDiv.style.cssText += `
                    background:#f8fafc;color:#1f2937;margin-right:auto;
                    border-left:3px solid #e5e7eb;
                `;
                const prefix = isQuestion ? 
                    '<div style="font-weight:600;color:#1e40af;margin-bottom:4px;">Assistant:</div>' : 
                    '<div style="font-weight:600;color:#374151;margin-bottom:4px;">Assistant:</div>';
                messageDiv.innerHTML = `${prefix}${text}`;
            }

            messages.appendChild(messageDiv);
            messages.scrollTop = messages.scrollHeight;
            return messageDiv;
        }

        function getPoliteReply(userMessage) {
            const msg = userMessage.toLowerCase().trim();

            // YES/NO FLOW with context recall
            if (msg.includes('yes') || msg.includes('yeah') || msg.includes('y')) {
                if (conversationContext === 'skills') {
                    return `Perfect. Technical skills: <strong>HTML, CSS, Java, C, C++</strong>. Need details on any specific skill?`;
                } else if (conversationContext === 'projects') {
                    return `Excellent. Projects: <strong>Portfolio website</strong>, <strong>Calculator webpage</strong>, <strong>Bluetooth enabled LED cricket scoreboard</strong>. Which interests you?`;
                }
                return "Thank you. How may I assist further?";
            }

            if (msg.includes('no') || msg.includes('nope') || msg.includes('n')) {
                conversationContext = null;
                return "Understood. What would you like to discuss? Skills, projects, time, or weather?";
            }

            // Context triggers
            if (msg.includes('skill') || msg.includes('skills')) {
                conversationContext = 'skills';
                return "Would you like information about technical skills?";
            }

            if (msg.includes('project') || msg.includes('projects')) {
                conversationContext = 'projects';
                return "Would you like details about portfolio projects?";
            }

            if (msg.includes('time')) return `Current time: ${getCurrentTime()}. Anything else?`;
            if (msg.includes('weather')) return "Weather shown above. What else can I help with?";
            if (msg.includes('help')) {
                conversationContext = null;
                return "Available: Skills, Projects, Time, Weather. What interests you?";
            }

            conversationContext = null;
            return "What would you like to discuss - skills, projects, time, or weather?";
        }

        // ================= SEND MESSAGE =================
        function sendMessage() {
            const text = input.value.trim();
            if (!text) return;

            addMessage(text, true);
            input.value = '';

            const typing = addMessage('Assistant is responding...', false);
            setTimeout(() => {
                messages.removeChild(typing);
                const reply = getPoliteReply(text);
                addMessage(reply, false, reply.includes('?'));
            }, 600);
        }

        sendBtn.onclick = sendMessage;
        input.onkeypress = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        };

        // Welcome
        setTimeout(() => {
            addMessage("Technical Assistant online. How may I assist?", false, true);
        }, 300);

        // Resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => location.reload(), 250);
        });

    }, 200);
})();

