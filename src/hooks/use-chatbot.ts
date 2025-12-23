import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Sample Q&A database for the chatbot
const knowledgeBase: { [key: string]: string } = {
  "what is react":
    "React is a JavaScript library for building user interfaces with reusable components. It uses a virtual DOM for efficient updates.",
  "how to use hooks":
    "React Hooks are functions that let you use state and other React features in functional components. Common hooks are useState, useEffect, and useContext.",
  "what is typescript":
    "TypeScript is a superset of JavaScript that adds static typing. It helps catch errors during development and improves code quality.",
  "how to study effectively":
    "Study tips: 1) Create a schedule, 2) Take breaks, 3) Use active recall, 4) Teach others, 5) Practice problems, 6) Review regularly.",
  "what is html":
    "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides structure and content to websites.",
  "what is css":
    "CSS (Cascading Style Sheets) is used to style and layout web pages. It controls colors, fonts, spacing, and responsive design.",
  "how to debug code":
    "Debugging tips: 1) Read error messages, 2) Use console.log(), 3) Use browser DevTools, 4) Check variable values, 5) Test in parts.",
  "what is database":
    "A database is an organized collection of structured data stored electronically. Common types include relational (SQL) and NoSQL databases.",
  "study tips":
    "Effective study strategies: Break content into chunks, use spaced repetition, take notes, create flashcards, discuss with peers, and practice problems.",
  "how to improve focus":
    "Focus improvement: Find a quiet place, eliminate distractions, use the Pomodoro technique, stay hydrated, exercise, and get enough sleep.",
};

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI Study Assistant. I can help you with study topics, answer questions about courses, and provide learning tips. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const { toast } = useToast();

  const findAnswer = useCallback((question: string): string => {
    const lowerQuestion = question.toLowerCase().trim();

    // Exact or close match
    for (const [key, answer] of Object.entries(knowledgeBase)) {
      if (lowerQuestion.includes(key) || key.includes(lowerQuestion)) {
        return answer;
      }
    }

    // Check for keywords
    if (
      lowerQuestion.includes("help") ||
      lowerQuestion.includes("hi") ||
      lowerQuestion.includes("hello")
    ) {
      return "I can help you with study materials, answer questions about programming, web development, databases, and provide study tips. Feel free to ask me anything!";
    }

    if (lowerQuestion.includes("course")) {
      return "I can assist with course content, help you understand concepts, suggest study resources, and answer subject-related questions. What course are you studying?";
    }

    if (
      lowerQuestion.includes("assignment") ||
      lowerQuestion.includes("project")
    ) {
      return "For assignments and projects, I can help you understand requirements, suggest approaches, and debug code. What's your assignment about?";
    }

    return "That's an interesting question! I don't have a specific answer in my knowledge base yet. Try asking about: React, TypeScript, HTML, CSS, Databases, Study Tips, Debugging, or how to improve your focus. You can also connect with alumni mentors on the platform!";
  }, []);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim()) {
        toast({
          title: "Empty message",
          description: "Please type a message",
          variant: "destructive",
        });
        return;
      }

      // Add user message
      const userMsg: Message = {
        id: Date.now().toString(),
        text: userMessage,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);

      // Simulate bot thinking delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Get bot response
      const answer = findAnswer(userMessage);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: answer,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    },
    [findAnswer, toast]
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: "1",
        text: "Hello! I'm your AI Study Assistant. I can help you with study topics, answer questions about courses, and provide learning tips. What would you like to know?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, []);

  return {
    messages,
    sendMessage,
    clearChat,
  };
};
