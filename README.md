<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1sYRBF0E3NSneylxnZTNP-ln0KpZMSd3c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
# SignAssist – Learn ASL with AI Feedback

An interactive app built with **Gemini 3 Pro** in Google AI Studio that teaches American Sign Language through real-time AI feedback.

🔗 **Live App**: [Open in AI Studio](https://aistudio.google.com/app/run/...)  


> Built for the Google DeepMind Vibe Code Hackathon (Dec 5–12, 2025)

## 🖼️ Screenshots
![App UI](screenshots/ui.png)

## 💡 Key Features
- Type or speak a word → See ASL instructions
- Practice with webcam → Get AI feedback
- Privacy-first: No video stored

## 🧩 How It Was Built
Using only natural language prompts in AI Studio — no manual coding.
See [`ai-studio-prompt.md`](ai-studio-prompt.md) for full prompt.
