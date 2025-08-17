import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testDescriptions = [
    "When I receive a webhook POST request, log the data and send a success response",
    "When someone submits a contact form, save to database and send confirmation email",
    "When a payment is received via Stripe, send Slack notification with details"
  ];

  const generateWorkflow = async () => {
    if (!description.trim()) {
      setError('Please enter a workflow description');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/generate-workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.workflow);
      } else {
        setError(data.error || 'Failed to generate workflow');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadWorkflow = () => {
    if (!result) return;
    
    const dataStr = JSON.stringify(result, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `n8n-workflow-test-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <>
      
        
        
        
      

      

        

          

            

              🤖 AI Workflow Test
            

            

              Test the AI n8n workflow generator
            


          


          

            

              
                Describe your workflow:
              
              
 setDescription(e.target.value)}
                placeholder="Example: When I receive a webhook, send me an email..."
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            <div className="flex gap-3 mb-4">
              <button
                onClick={generateWorkflow}
                disabled={loading || !description.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                {loading ? 'Generating...' : 'Generate Test Workflow'}
              </button>
              
              {result && (
                <button
                  onClick={downloadWorkflow}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Download JSON
                </button>
              )}
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">Quick test examples:</p>
              <div className="space-y-2">
                {testDescriptions.map((desc, index) => (
                  <button
                    key={index}
                    onClick={() => setDescription(desc)}
                    className="text-left w-full p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border transition-colors"
                    disabled={loading}
                  >
                    {desc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="text-red-800">
                <strong>Error:</strong> {error}
              </div>
            </div>
          )}

          {result && (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Generated Workflow
                </h3>
                <span className="text-sm text-green-600 font-medium">
                  ✅ Ready for n8n
                </span>
              </div>
              
              <pre className="bg-gray-50 p-4 rounded border overflow-x-auto text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-800">
                  <strong>Next Steps:</strong> Download the JSON file and import it into your n8n instance to test!
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-gray-500">
            {loading ? (
              <div>🔄 Testing AI workflow generation...</div>
            ) : result ? (
              <div>✅ Test successful! Workflow generated and ready for n8n</div>
            ) : (
              <div>🧪 Ready to test your AI workflow generator</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}</pre>
                </div>
            </div>

            <!-- File 4: pages/_app.js -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="bg-gray-100 px-6 py-3 border-b flex justify-between items-center">
                    <h3 class="font-semibold text-gray-900">
                        <i class="fas fa-file-code text-purple-600 mr-2"></i>
                        pages/_app.js
                    </h3>
                    <button onclick="copyToClipboard('file4')" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                        <i class="fas fa-copy mr-1"></i> Copy
                    </button>
                </div>
                <div class="p-6">
                    <pre id="file4" class="bg-gray-50 p-4 rounded text-sm overflow-x-auto">import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}</pre>
                </div>
            </div>

            <!-- File 5: pages/api/generate-workflow.js -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="bg-gray-100 px-6 py-3 border-b flex justify-between items-center">
                    <h3 class="font-semibold text-gray-900">
                        <i class="fas fa-file-code text-red-600 mr-2"></i>
                        pages/api/generate-workflow.js
                    </h3>
                    <button onclick="copyToClipboard('file5')" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                        <i class="fas fa-copy mr-1"></i> Copy
                    </button>
                </div>
                <div class="p-6">
                    <pre id="file5" class="bg-gray-50 p-4 rounded text-sm overflow-x-auto max-h-96">import OpenAI from 'openai';

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
}</pre>
                </div>
            </div>

            <!-- File 6: styles/globals.css -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="bg-gray-100 px-6 py-3 border-b flex justify-between items-center">
                    <h3 class="font-semibold text-gray-900">
                        <i class="fas fa-file-code text-pink-600 mr-2"></i>
                        styles/globals.css
                    </h3>
                    <button onclick="copyToClipboard('file6')" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                        <i class="fas fa-copy mr-1"></i> Copy
                    </button>
                </div>
                <div class="p-6">
                    <pre id="file6" class="bg-gray-50 p-4 rounded text-sm overflow-x-auto">@tailwind base;
@tailwind components;
@tailwind utilities;</pre>
                </div>
            </div>
        </div>

        <!-- Instructions -->
        <div class="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
            <h2 class="text-xl font-semibold text-green-900 mb-4">
                <i class="fas fa-rocket mr-2"></i>
                Next Steps: Upload to GitHub
            </h2>
            <ol class="list-decimal list-inside space-y-2 text-green-800">
                <li><strong>Go to your GitHub repository:</strong> ai-workflow-test</li>
                <li><strong>Click "Add file" → "Create new file"</strong></li>
                <li><strong>For each file above:</strong>
                    <ul class="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li>Type the exact filename (like <code>package.json</code>)</li>
                        <li>Click the "Copy" button and paste the content</li>
                        <li>Click "Commit new file"</li>
                    </ul>
                </li>
                <li><strong>Create folders when needed:</strong> Type <code>pages/index.js</code> and GitHub will create the folder automatically</li>
                <li><strong>After all files are uploaded:</strong> Deploy to Vercel!</li>
            </ol>
        </div>

        <!-- Copy All Button -->
        <div class="text-center mt-8">
            <button onclick="showAllFiles()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold">
                <i class="fas fa-eye mr-2"></i>
                Show All Files in One View
            </button>
        </div>
    </div>

    <!-- Modal for all files -->
    <div id="allFilesModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 hidden overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
            <div class="mt-3">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium text-gray-900">All Files - Copy & Paste Ready</h3>
                    <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div id="allFilesContent" class="max-h-96 overflow-y-auto">
                    <!-- Content will be populated by JavaScript -->
                </div>
            </div>
        </div>
    </div>

    <script>
        function copyToClipboard(elementId) {
            const element = document.getElementById(elementId);
            const text = element.textContent;
            
            navigator.clipboard.writeText(text).then(function() {
                // Show success message
                const button = document.querySelector(`button[onclick="copyToClipboard('${elementId}')"]`);
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check mr-1"></i> Copied!';
                button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                button.classList.add('bg-green-600');
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.classList.remove('bg-green-600');
                    button.classList.add('bg-blue-600', 'hover:bg-blue-700');
                }, 2000);
            });
        }

        function showAllFiles() {
            document.getElementById('allFilesModal').classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('allFilesModal').classList.add('hidden');
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('allFilesModal');
            if (event.target == modal) {
                modal.classList.add('hidden');
            }
        }
    </script>
</body>
</html>
    <script id="html_badge_script1">
        window.__genspark_remove_badge_link = "https://www.genspark.ai/api/html_badge/" +
            "remove_badge?token=To%2FBnjzloZ3UfQdcSaYfDqcqHCvX3n3Wkcn3Lo3qkKsa%2FmazxzXJ4NJ%2FeHTmItQxSg60rorscmg6fUTKbToVOUggq8hzkVaJDKs%2BdB0amsSn%2B1E8XpR1R6iex29ZgHQ8QlGHSJHxzemccte71nPeU72S8R2begHn4DOke5pzrsc6ZykCs0fmdFcQ7VcmNXwzH0tIRJrTn1l8cK8zGK4ns8GOFOc69TIqnApfbJYcKXRbHXygE0rY%2BTUUZbMlirF42IG%2FdnRsGG9nAzhJyVIgXsW1YpbIFInlhJ748uxmm8KByKsxUVcUDAmkoMLiLf7Qo4VZQZ7wr5WOGj7x%2BGsVXrsqLJ%2BBxxtPRQ%2Fi8RPUXs3wIfWhWwe%2BR%2BL%2Bfub6l9sQ3Q7lJQPaBjiNwwcZJqW8SvA8SuEwT%2BtgSnD5AgMUHRqYnijFf4466dGpD8ZDwVt7e1rLrQLQR7p59v636KlCOYwNWZ439Du9WfeCJv0C4%2BaYiJT0HXw20hPEZaRBr3XOUlKyGWpd87BhIyRcnkNTlimgLNTKYyqqjiPsNNVtE4U%3D";
        window.__genspark_locale = "en-US";
        window.__genspark_token = "To/BnjzloZ3UfQdcSaYfDqcqHCvX3n3Wkcn3Lo3qkKsa/mazxzXJ4NJ/eHTmItQxSg60rorscmg6fUTKbToVOUggq8hzkVaJDKs+dB0amsSn+1E8XpR1R6iex29ZgHQ8QlGHSJHxzemccte71nPeU72S8R2begHn4DOke5pzrsc6ZykCs0fmdFcQ7VcmNXwzH0tIRJrTn1l8cK8zGK4ns8GOFOc69TIqnApfbJYcKXRbHXygE0rY+TUUZbMlirF42IG/dnRsGG9nAzhJyVIgXsW1YpbIFInlhJ748uxmm8KByKsxUVcUDAmkoMLiLf7Qo4VZQZ7wr5WOGj7x+GsVXrsqLJ+BxxtPRQ/i8RPUXs3wIfWhWwe+R+L+fub6l9sQ3Q7lJQPaBjiNwwcZJqW8SvA8SuEwT+tgSnD5AgMUHRqYnijFf4466dGpD8ZDwVt7e1rLrQLQR7p59v636KlCOYwNWZ439Du9WfeCJv0C4+aYiJT0HXw20hPEZaRBr3XOUlKyGWpd87BhIyRcnkNTlimgLNTKYyqqjiPsNNVtE4U=";
    </script>
    
    <script id="html_notice_dialog_script" src="https://www.genspark.ai/notice_dialog.js"></script>
    <script defer src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015" integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==" data-cf-beacon='{"rayId":"97050a4d7be1f505","serverTiming":{"name":{"cfExtPri":true,"cfEdge":true,"cfOrigin":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"version":"2025.8.0","token":"4edd5f8ec12a48cfa682ab8261b80a79"}' crossorigin="anonymous"></script>

