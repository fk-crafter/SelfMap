import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private aiClient: OpenAI;

  constructor() {
    this.aiClient = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    });
  }

  async getCoachResponse(
    userInsight: string,
    chatHistory: OpenAI.Chat.ChatCompletionMessageParam[],
  ) {
    const systemPrompt = `You are the "Soul Coach", a caring and psychological guide for the SoulType application.
Your goal is to help the user in their introspection and personal development (self-actualization).
Here is the psychological summary you have on this user (their 'Insight'): ${userInsight || 'The user has just started their introspective journey. Get to know them.'}

ABSOLUTE RULES:
- Adopt a soothing, wise, and warm tone (without being a mystical cliché).
- Be very concise: your responses must never exceed 3 or 4 sentences.
- Never make long bulleted lists.
- Often end with a single open-ended question to make the user think.
- Address the user directly in a friendly, conversational manner.`;

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...chatHistory,
    ];

    try {
      const response = await this.aiClient.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: 0.7,
        max_tokens: 150,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Groq API Error:', error);
      throw new Error(
        'The coach is deep in meditation and cannot answer right now.',
      );
    }
  }

  async updatePsychologicalInsight(
    currentInsight: string | null,
    newJournalEntry: string,
  ) {
    const systemPrompt = `You are an expert in clinical psychology and a profiler. Your job is to keep the psychological summary of a SoulType app user up to date.
    
Here is their current profile: 
${currentInsight || 'The user has just started their introspection. No profile defined yet.'}

Here is the new thought/journal entry they just wrote: 
"${newJournalEntry}"

MISSION: 
Update their psychological profile by integrating the relevant new information from this entry (character traits, fears, goals, thought patterns, significant events). 

ABSOLUTE RULES:
- Be ultra-concise and analytical (maximum 100 words).
- Write in the 3rd person ("The user feels...", "They tend to...").
- Keep ONLY the deep psychological essence, ignore trivial details.
- Do not use introductory sentences, return ONLY the updated profile.`;

    try {
      const response = await this.aiClient.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: systemPrompt }],
        temperature: 0.3,
        max_tokens: 200,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error updating insight:', error);
      return currentInsight;
    }
  }
}
