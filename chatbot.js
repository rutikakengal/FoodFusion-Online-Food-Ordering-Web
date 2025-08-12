(function () {
    
    const KB = [
      {
        id: "categories",
        questions: [
          "what categories do you have",
          "categories",
          "what food categories are available",
          "show categories",
          "what can i order"
        ],
        answer:
          "We offer multiple categories: sandwiches, pizzas, momos, coffee etc. Use the site menu or the search bar to quickly find items in a category."
      },
      {
        id: "contact",
        questions: ["contact", "how to contact", "contact info", "phone", "email"],
        answer:
          "You can reach us at +91-98765-43210 or email support@foodfusion.gmail.com. For faster help, check the Contact Us page linked in the footer."
      },
      {
        id: "login",
        questions: ["login", "sign in", "how to login", "can't login"],
        answer:
          "Click the 'Login' button on the header, enter your email and password, and press Login. If you forgot your password use the 'Forgot Password' button."
      },
      {
        id: "signup",
        questions: ["signup", "sign up", "register", "create account"],
        answer:
          "Click the 'Sign Up' button to create an account. We need a name, email, password and profile picture and you can also add your address if you want."
      },
      {
        id: "order",
        questions: [
          "how to order",
          "place order",
          "order food",
          "ordering process",
          "track order"
        ],
        answer:
          "To order: 1) Browse categories or use the search bar, 2) Add items to cart, 3) Go to 'Order' or click on the cart icon in the top-right, 4) Provide your details and confirm the order."
      },
      {
        id: "who-we-are",
        questions: ["who are you", "who we are", "about", "about us", "our story", "what is foodfusion"],
        answer:
          "We're FoodFusion — we connect customers with local food centers, providing a seamless and delightful dining experience. Check 'Who we are' for our mission and team."
      },
      {
        id: "report-fraud",
        questions: [
          "report fraud",
          "fraud",
          "scam",
          "report a fraud",
          "fraudulent order"
        ],
        answer:
          "If you suspect fraud, immediately go to 'Report Fraud' linked in the footer and fill the form. Provide fraud type and fraud details. Our team will investigate and get back to you."
      },
      {
        id: "complaint",
        questions: ["complaint", "lodge a complaint", "report issue", "complain", "have a complaint"],
        answer:
          "Use 'Lodge Complaint' link in the footer to send details about your issue. Include order ID, complaint type, and provide the description of your complaint. Our support team will reply via email."
      },
      {
        id: "testimonials",
        questions: ["testimonials", "reviews", "customer feedback", "what people say"],
        answer:
          "Click on the 'Testimonials' link in the footer to read user reviews and customer stories. You can also submit your own feedback there."
      },
      {
        id: "blog",
        questions: ["blog", "articles", "food blog", "posts"],
        answer:
          "Our Blog contains recipes, food tips, and company news. Click on the 'Blog' link in the footer to explore recent articles."
      },
      {
        id: "work-with-us",
        questions: ["work with us", "careers", "join", "jobs"],
        answer:
          "Interested in joining? Click on 'Work with us' to see open roles and application details. We often look for delivery partners, cooks, and team members."
      },
      {
        id: "privacy",
        questions: ["privacy policy", "privacy", "data", "gdpr"],
        answer:
          "Privacy matters. Check our 'Privacy Policy' page for details on how we collect and use information. It's linked in the footer."
      },
      {
        id: "search",
        questions: ["search", "find", "how to search", "use search bar"],
        answer:
          "Use the search bar at the top to quickly find dishes, restaurants, or keywords. Try searching for 'pizza', 'momos', or a restaurant name."
      },
    ];
  
    // Suggested quick questions
    const SUGGESTIONS = [
      "What categories do you have?",
      "How to place an order?",
      "Contact information",
      "How to lodge a complaint?",
      "How do I sign up / login?",
      "Where is the blog?"
    ];
  
    const FALLBACKS = [
      "Sorry, I couldn't find an exact match. Try rephrasing or pick one of the suggestions above.",
      "I don't know that yet — you can try the search bar or visit the relevant page from the menu."
    ];
  
    function norm(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }
  
    function scoreMatch(query, candidatePhrases) {
      const qWords = norm(query).split(" ").filter(Boolean);
      let best = 0;
      for (const phrase of candidatePhrases) {
        const pWords = norm(phrase).split(" ").filter(Boolean);
        
        let shared = 0;
        for (const w of qWords) {
          if (pWords.includes(w)) shared++;
        }
        
        const score = shared / (1 + Math.abs(pWords.length - qWords.length));
        if (score > best) best = score;
      }
      return best; 
    }
  
    function findBestAnswer(query) {
      const threshold = 0.18; 
      let bestEntry = null;
      let bestScore = 0;
      for (const entry of KB) {
        const s = scoreMatch(query, entry.questions);
        if (s > bestScore) {
          bestScore = s;
          bestEntry = entry;
        }
      }
      if (bestScore >= threshold) return { entry: bestEntry, score: bestScore };
      return null;
    }
  
    const STYLE_ID = "ff-chatbot-styles";
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.innerHTML = `
  /* Chatbot injected styles (FoodFusion - minimalist, friendly) */
  .ff-chat-btn {
    position: fixed;
    right: 8px;
    bottom: 18px;
    z-index: 999999;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: linear-gradient(135deg,#ff7a59,#ff4b7b);
    color: #fff;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:26px;
    cursor:pointer;
    box-shadow: 0 12px 26px rgba(0,0,0,0.18);
    transition: transform .12s ease;
    border: none;
  }
  .ff-chat-btn:active { transform: scale(.98); }
  .ff-chat-container {
    position: fixed;
    right: 18px;
    bottom: 92px;
    width: 360px;
    max-width: calc(100% - 48px);
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(11,22,40,0.16);
    overflow: hidden;
    z-index: 999998;
    display: flex;
    flex-direction: column;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  }
  .ff-chat-header {
    padding: 12px 14px;
    background: linear-gradient(90deg,#ff7a59,#ff4b7b);
    color: #fff;
    font-weight: 600;
    display:flex;
    align-items:center;
    gap:10px;
  }
  .ff-chat-header .title { font-size:14px; }
  .ff-chat-close {
    margin-left:auto;
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.95);
    font-size: 18px;
    cursor:pointer;
  }
  .ff-chat-suggest {
    display:flex;
    gap:8px;
    padding:10px;
    overflow-x:auto;
    background: #fafafa;
  }
  .ff-sugg-chip {
    background: linear-gradient(180deg,#fff,#fafafa);
    border: 1px solid #eee;
    padding:8px 10px;
    border-radius: 999px;
    font-size:13px;
    cursor:pointer;
    white-space:nowrap;
    box-shadow: 0 6px 14px rgba(14,30,60,0.04);
  }
  .ff-chat-messages {
    padding: 12px;
    height: 260px;
    overflow-y: auto;
    background: linear-gradient(180deg,#fbfbfd,#fff);
  }
  .ff-msg {
    max-width: 78%;
    margin: 8px 0;
    padding:10px 12px;
    border-radius: 12px;
    line-height:1.35;
    box-shadow: 0 1px 0 rgba(0,0,0,0.02);
    font-size:14px;
  }
  .ff-msg.bot {
    background: #fff;
    color: #0b1a2b;
    border: 1px solid #f0f2f5;
  }
  .ff-msg.user {
    margin-left:auto;
    background: linear-gradient(90deg,#ff7a59,#ff4b7b);
    color: #fff;
    border-radius: 12px;
  }
  .ff-quick-actions {
    padding: 8px 12px;
    display:flex;
    gap:8px;
    flex-wrap:wrap;
    background: #fff;
    border-top: 1px solid #f3f4f6;
  }
  .ff-qbtn {
    background: #fff;
    border: 1px solid #eee;
    padding:8px 10px;
    border-radius:8px;
    cursor:pointer;
    font-size:13px;
  }
  .ff-input-row {
    display:flex;
    gap:10px;
    padding: 10px;
    border-top: 1px solid #eee;
    background: #fff;
  }
  .ff-input-row input {
    flex:1;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #e6e9ef;
    font-size: 14px;
    outline: none;
  }
  .ff-input-row button.send {
    padding: 10px 14px;
    background: linear-gradient(90deg,#ff7a59,#ff4b7b);
    border: none;
    color: #fff;
    border-radius: 8px;
    cursor:pointer;
    font-weight:600;
  }
  .ff-small {
    font-size:12px;
    color:#6b7280;
    padding:8px 12px;
  }
  @media (max-width:420px) {
    .ff-chat-container { width: 92%; right:4%; bottom:86px; }
    .ff-chat-messages { height: 220px; }
  }
  `;
      document.head.appendChild(style);
    }
  
    const existingBtn = document.getElementById("ff-chatbot-btn");
    if (existingBtn) return; 

    const btn = document.createElement("button");
    btn.id = "ff-chatbot-btn";
    btn.className = "ff-chat-btn";
    btn.setAttribute("aria-label", "Open chat");
    btn.title = "Chat with FoodFusion helper";
    btn.innerHTML = "💬";
    document.body.appendChild(btn);
  
    const container = document.createElement("div");
    container.className = "ff-chat-container";
    container.setAttribute("role", "dialog");
    container.setAttribute("aria-label", "FoodFusion helper chat");
    container.style.display = "none";
    container.innerHTML = `
      <div class="ff-chat-header">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:40px;height:40px;border-radius:8px;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;font-weight:700;">FF</div>
          <div>
            <div class="title">FoodFusion Helper</div>
            <div class="ff-small">Ask about orders, pages, or policies</div>
          </div>
        </div>
        <button class="ff-chat-close" aria-label="Close chat">✕</button>
      </div>
      <div class="ff-chat-suggest" role="list" aria-label="Suggested questions"></div>
      <div class="ff-chat-messages" aria-live="polite"></div>
      <div class="ff-quick-actions"></div>
      <div class="ff-input-row">
        <input type="text" aria-label="Type your question" placeholder="Try: How to place an order?" />
        <button class="send" aria-label="Send message">Send</button>
      </div>
    `;
    document.body.appendChild(container);
  
    const suggestEl = container.querySelector(".ff-chat-suggest");
    const messagesEl = container.querySelector(".ff-chat-messages");
    const inputEl = container.querySelector(".ff-input-row input");
    const sendBtn = container.querySelector(".ff-input-row button.send");
    const closeBtn = container.querySelector(".ff-chat-close");
    const quickActions = container.querySelector(".ff-quick-actions");
  
    function renderSuggestions() {
      suggestEl.innerHTML = "";
      for (const s of SUGGESTIONS) {
        const chip = document.createElement("button");
        chip.className = "ff-sugg-chip";
        chip.type = "button";
        chip.textContent = s;
        chip.addEventListener("click", () => {
          inputEl.value = s;
          handleSend();
          inputEl.focus();
        });
        suggestEl.appendChild(chip);
      }
    }
  
    function addMessage(text, from = "bot") {
      const el = document.createElement("div");
      el.className = "ff-msg " + (from === "user" ? "user" : "bot");
      el.textContent = text;
      messagesEl.appendChild(el);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  
    //quick action buttons for common actions
    function renderQuickActions() {
      quickActions.innerHTML = "";

      const actions = [
        { label: "Open Categories", action: () => goTo("categories") },
        { label: "Order Page", action: () => goTo("order") },
        { label: "Contact", action: () => goTo("contact") },
        { label: "Login / Signup", action: () => goTo("login") },
        { label: "Report a Fraud", action: () => goTo("report-fraud") },
        { label: "Privacy Policy", action: () => goTo("privacy") }
      ];
      for (const a of actions) {
        const b = document.createElement("button");
        b.className = "ff-qbtn";
        b.type = "button";
        b.textContent = a.label;
        b.addEventListener("click", a.action);
        quickActions.appendChild(b);
      }
    }
  
    function goTo(id) {
      
      const selectors = [
        `#${id}`,
        `[data-section="${id}"]`,
        `a[href*="${id}"]`,
        `a[title*="${id}"]`,
        `a[aria-label*="${id}"]`
      ];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) {
          if (el.tagName.toLowerCase() === "a" && el.href) {
       
            window.location.href = el.href;
            return;
          } else {
            
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            addMessage("I scrolled to that section for you.", "bot");
            return;
          }
        }
      }
      addMessage("I couldn't find that page or section on this page. Try using the main menu.", "bot");
    }
  
    function handleSend() {
      const raw = inputEl.value.trim();
      if (!raw) return;
      addMessage(raw, "user");
      inputEl.value = "";
     
      const found = findBestAnswer(raw);
      if (found) {
        addMessage(found.entry.answer, "bot");
        
        if (found.entry.id) {
          const navTip = `Tip: open the "${found.entry.id.replace(/-/g, ' ')}" page from the menu or click a quick action below.`;
          addMessage(navTip, "bot");
        }
      } else {
        
        const low = norm(raw);
        if (low.includes("hello") || low.includes("hi")) {
          addMessage("Hi there! How can I help? Try one of the suggestions above.", "bot");
        } else if (low.includes("thanks") || low.includes("thank")) {
          addMessage("You're welcome! 😊", "bot");
        } else {
         
          addMessage(FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)], "bot");
        }
      }
    }

    btn.addEventListener("click", () => {
      const showing = container.style.display !== "none";
      if (showing) {
        container.style.display = "none";
        btn.setAttribute("aria-label", "Open chat");
      } else {
        container.style.display = "flex";
        inputEl.focus();
        btn.setAttribute("aria-label", "Close chat");
      }
    });
    closeBtn.addEventListener("click", () => {
      container.style.display = "none";
      btn.focus();
    });
    sendBtn.addEventListener("click", handleSend);
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    });
  

    function greet() {
      addMessage("Hi, I'm FoodFusion Helper — ask me about categories, orders, contact info, and more.", "bot");
    }
  
    renderSuggestions();
    renderQuickActions();
    greet();
  
    window.FFChatbot = {
      addKBEntry(entry) {
   
        KB.push(entry);
      },
      open() {
        container.style.display = "flex";
      },
      close() {
        container.style.display = "none";
      },
      ask(text) {
        inputEl.value = text;
        handleSend();
      }
    };
  })();
  