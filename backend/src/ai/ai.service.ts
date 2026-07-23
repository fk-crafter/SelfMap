import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

interface ProfileData {
  insight: string;
  visualPrompt: string;
}

export interface CoachResponseData {
  reply: string;
  calibrationIncrement: number;
}

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
    currentScore: number = 0,
  ): Promise<CoachResponseData> {
    const systemPrompt = `You are the "Soul Coach", a caring and psychological guide for the SoulType application.
Your goal is to help the user in their introspection and personal development.
Here is the psychological summary you have on this user: ${userInsight || 'No profile defined yet.'}
Current Calibration: ${currentScore}%

ABSOLUTE RULES:
- Adopt a soothing, wise, and warm tone.
- Be very concise: your responses must never exceed 3 or 4 sentences.
- Never make long bulleted lists.
- Often end with a single open-ended question to make the user think.
- Address the user directly in a friendly, conversational manner.
- You MUST respond strictly in valid JSON format.
- The JSON must contain exactly two keys:
  1. "reply": Your conversational response.
  2. "calibrationIncrement": A number (1, 2, or 3) assessing how much the user's last message revealed about their deep personality, values, or feelings (1 = basic small talk, 3 = deep reflection).`;

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...chatHistory,
    ];

    try {
      const response = await this.aiClient.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: 0.7,
        max_tokens: 200,
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error('Empty response from AI');

      const parsed = JSON.parse(content) as Record<string, unknown>;

      const data: CoachResponseData = {
        reply:
          typeof parsed.reply === 'string'
            ? parsed.reply
            : 'The coach meditates in silence...',
        calibrationIncrement:
          typeof parsed.calibrationIncrement === 'number'
            ? parsed.calibrationIncrement
            : 1,
      };

      return data;
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

  async generateInitialProfile(
    mbtiType: string,
    gender: string,
  ): Promise<{ insight: string; avatarUrl: string }> {
    let genderInstruction = 'androgynous/neutral';
    if (gender === 'male') genderInstruction = 'male';
    if (gender === 'female') genderInstruction = 'female';

    const systemPrompt = `You are a psychological profiler. The user has an ${mbtiType} MBTI personality type.
Provide a valid JSON response with exactly these two keys:
- "insight": A short, 2-3 sentence personalized psychological welcome message addressing the user directly.
- "visualPrompt": A highly specific prompt to generate a 3D character avatar. 
STRICT STYLE RULES:
- Style: 3D render, claymorphism, soft rounded shapes, cute stylized character.
- Quality: High-end 3D, clean lighting, soft ambient occlusion, pastel color palette (lavender, mint, soft yellow), minimalist aesthetic.
- Content: The character must look like a friendly, wise soul coach holding a small book. The character must be ${genderInstruction}.
- Background: Very soft, clean, blurred background.
- NO manga, NO Picasso, NO 2D flat, NO complex painting styles.`;

    try {
      const response = await this.aiClient.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: systemPrompt }],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error('Empty response from AI');

      const parsed = JSON.parse(content) as Record<string, unknown>;
      const data: ProfileData = {
        insight:
          typeof parsed.insight === 'string'
            ? parsed.insight
            : 'Welcome to your introspection journey.',
        visualPrompt:
          typeof parsed.visualPrompt === 'string'
            ? parsed.visualPrompt
            : 'friendly soul coach 3d render',
      };

      const encodedPrompt = encodeURIComponent(data.visualPrompt);
      const avatarUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

      return {
        insight: data.insight,
        avatarUrl,
      };
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to generate profile');
    }
  }
}
