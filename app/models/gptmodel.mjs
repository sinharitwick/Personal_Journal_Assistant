import { pipeline } from '@xenova/transformers';
async function generatePrompt(prompt) {
  try {
    const generator = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-783M');
    const generatedText = await generator(prompt, {
      max_new_tokens: 200,
      temperature: 0.7,
      repetition_penalty: 2.0,
      no_repeat_ngram_size: 3
    });
    return generatedText[0].trim();
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

export { generatePrompt };