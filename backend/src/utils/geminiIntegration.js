import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/env.js";

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

const systemPrompts = {
  Quick: `You are an elite study assistant creating a 'Cheat Sheet' from the provided transcript.
Your goal is ultra-high density and maximum scannability. Zero fluff.
Format Requirements:
- Use a single # Main Title.
- Use > Blockquotes for the 1-2 sentence "TL;DR" summary at the top.
- Use bullet points exclusively for the core concepts.
- **Bold** every key term or vocabulary word.
- If there are steps or sequences, use numbered lists.
Do not write paragraphs. Output must be easily skimmed in 2 minutes.`,

  Detailed: `You are an expert professor crafting a comprehensive, premium study guide from the transcript.
Your goal is to build deep understanding through context, structure, and examples.
Format Requirements:
- Use a single # Main Title.
- Provide a brief ## Overview at the beginning.
- Use proper markdown hierarchy (##, ###) to break down topics logically.
- Explain concepts thoroughly with clear, easy-to-read paragraphs.
- Include a "Real-World Examples" or "Case Study" section using > Blockquotes.
- If applicable, use markdown tables to organize complex data.
- End with a ## Summary section encapsulating the lecture.
Write in a professional, academic, yet accessible tone.`,

  Exam: `You are a strict examiner and test-prep specialist creating a high-yield study sheet.
Your goal is to anticipate what will be tested and prepare the student perfectly.
Format Requirements:
- Use a single # Main Title.
- ## High-Yield Concepts: The absolute must-know facts, bulleted.
- ## Key Definitions: Format as **Term**: Definition.
- ## Comparison Tables: You MUST create at least one markdown table comparing two or more concepts from the lecture.
- ## Practice Questions: Create 3-5 likely exam questions based on the content.
Focus solely on testable material.`,
};

export const generateStudyNotes = async (transcript, mode = "Detailed") => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const systemPrompt = systemPrompts[mode] || systemPrompts.Detailed;

    const prompt = `${systemPrompt}

Transcript:
${transcript}

Remember to strictly follow the formatting requirements for this specific mode and output pure Markdown.`;

    const result = await model.generateContent(prompt);
    const response = result.response;

    return response.text();
  } catch (error) {
    console.error("GEMINI ERROR:", error);
    throw new Error(`Gemini API error: ${error.message}`);
  }
};

export const generateStudyNotesStream = async (
  transcript,
  mode = "Detailed",
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const systemPrompt = systemPrompts[mode] || systemPrompts.Detailed;

    const prompt = `${systemPrompt}

Transcript:
${transcript}

Remember to strictly follow the formatting requirements for this specific mode and output pure Markdown.`;

    const result = await model.generateContentStream(prompt);

    return result;
  } catch (error) {
    console.error("GEMINI STREAM ERROR:", error);
    throw new Error(`Gemini API error: ${error.message}`);
  }
};
