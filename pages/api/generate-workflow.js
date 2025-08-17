import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "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",
});

const WORKFLOW_PROMPT = `You are an expert n8n workflow builder. Convert the user's natural language description into a complete n8n workflow JSON.

Requirements:
1. Generate a valid n8n workflow JSON structure
2. Include proper node connections and IDs
3. Use realistic configurations for common services
4. Include error handling where appropriate
5. Make it production-ready for testing

Available node types include:
- Webhook (for triggers)
- HTTP Request (for API calls)
- Code (for JavaScript logic)
- IF (for conditions)
- Set (for data transformation)
- Email Send (for notifications)
- Manual Trigger (for testing)

Return ONLY valid JSON with no additional text or formatting.

User request: {USER_REQUEST}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    console.log('Generating workflow for:', description);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: WORKFLOW_PROMPT.replace('{USER_REQUEST}', description)
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const workflowContent = completion.choices[0].message.content;
    
    // Try to parse JSON to validate
    let parsedWorkflow;
    try {
      parsedWorkflow = JSON.parse(workflowContent);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw content:', workflowContent);
      return res.status(500).json({ 
        error: 'Failed to generate valid workflow JSON',
        details: parseError.message,
        rawContent: workflowContent.substring(0, 500) + '...'
      });
    }

    // Add metadata for testing
    parsedWorkflow.meta = {
      generatedAt: new Date().toISOString(),
      description: description,
      version: "1.0.0-test"
    };

    console.log('Successfully generated workflow');

    return res.status(200).json({
      success: true,
      workflow: parsedWorkflow,
      description: description
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate workflow',
      details: error.message 
    });
  }
}
