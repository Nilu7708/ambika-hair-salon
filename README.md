# Ambika Hair Salon — Free Website

## 1. Customize
Open `config.js` and change:
- `phone`
- `displayPhone`
- `address`
- `mapUrl`

You can also edit service names/prices directly in `index.html`.

## 2. Test
Open `index.html` in a browser. The booking form creates a WhatsApp message.

## 3. Host for free
### GitHub Pages
1. Create a GitHub account.
2. Create a new public repository, e.g. `ambika-hair-salon`.
3. Upload `index.html`, `style.css`, `config.js`, `script.js`, and `README.md`.
4. Repository → Settings → Pages → Deploy from branch → `main` → `/root`.
5. Save. GitHub will give you a free website address.

### Netlify
You can also drag the entire project folder into Netlify's site deployment area for a free static site.

## Important
This is a static website, so there is no monthly hosting/server cost. The booking form uses WhatsApp and does not need a database.

Do NOT put an OpenAI API key in `index.html`, `script.js`, or any other browser file. If you later want an AI chatbot, use a server-side/backend function so the API key stays private.
