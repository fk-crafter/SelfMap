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
    const systemPrompt = `Tu es le "Soul Coach", un guide psychologique et bienveillant de l'application SoulType.
Ton but est d'aider l'utilisateur dans son introspection et son développement personnel (self-actualization).
Voici le résumé psychologique que tu as sur cet utilisateur (son 'Insight') : ${userInsight || "L'utilisateur vient de commencer son voyage introspectif. Apprends à le connaître."}

RÈGLES ABSOLUES :
- Adopte un ton apaisant, sage, et chaleureux (sans être un cliché mystique).
- Sois très concis : tes réponses ne doivent jamais dépasser 3 ou 4 phrases.
- Ne fais jamais de longues listes à puces.
- Termine souvent par une seule question ouverte pour faire réfléchir l'utilisateur.
- Tu tutoyes l'utilisateur.`;

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
      console.error('Erreur API Groq:', error);
      throw new Error(
        'Le coach est en pleine méditation et ne peut pas répondre pour le moment.',
      );
    }
  }

  async updatePsychologicalInsight(
    currentInsight: string | null,
    newJournalEntry: string,
  ) {
    const systemPrompt = `Tu es un expert en psychologie clinique et un profileur. Ton travail est de tenir à jour le résumé psychologique d'un utilisateur de l'application SoulType.
    
Voici son profil actuel : 
${currentInsight || "L'utilisateur vient de commencer son introspection. Aucun profil défini."}

Voici la nouvelle pensée/note de journal qu'il vient d'écrire : 
"${newJournalEntry}"

MISSION : 
Mets à jour son profil psychologique en intégrant les nouvelles informations pertinentes de cette note (traits de caractère, peurs, objectifs, schémas de pensée, événements marquants). 

RÈGLES ABSOLUES :
- Sois ultra concis et analytique (maximum 100 mots).
- Rédige à la 3ème personne ("L'utilisateur se sent...", "Il a tendance à...").
- Ne garde QUE l'essence psychologique profonde, ignore les détails banals.
- Ne fais pas de phrases d'introduction, renvoie uniquement le profil mis à jour.`;

    try {
      const response = await this.aiClient.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: systemPrompt }],
        temperature: 0.3,
        max_tokens: 200,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l’insight:', error);
      return currentInsight;
    }
  }
}
