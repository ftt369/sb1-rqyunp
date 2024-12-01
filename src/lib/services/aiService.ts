import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const aiService = {
  async analyzeNote(content: string) {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a legal assistant. Analyze the following case note and provide key insights and action items.',
          },
          {
            role: 'user',
            content,
          },
        ],
        model: 'gpt-3.5-turbo',
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('AI analysis failed:', error);
      return null;
    }
  },

  async suggestTags(content: string) {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a legal assistant. Suggest up to 3 relevant tags for the following case note. Respond with comma-separated tags only.',
          },
          {
            role: 'user',
            content,
          },
        ],
        model: 'gpt-3.5-turbo',
      });

      return completion.choices[0].message.content?.split(',').map(tag => tag.trim()) || [];
    } catch (error) {
      console.error('Tag suggestion failed:', error);
      return [];
    }
  }
};