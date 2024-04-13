const {VertexAI} = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({project: 'nth-aggregator-419009', location: 'us-central1'});
const model = 'gemini-1.0-pro-001';

// Instantiate the models
// @ts-ignore
const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: model,
    generationConfig: {
        'maxOutputTokens': 768,
        'temperature': 0.2,
        'topP': 0.8,
        'topK': 40,
    },
    safetySettings: [
        {
            'category': 'HARM_CATEGORY_HATE_SPEECH',
            'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
            'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
            'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
            'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
            'category': 'HARM_CATEGORY_HARASSMENT',
            'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
        }
    ],
});


export async function summarizerGoogleAPI(text: string): Promise<any> {
    const finalText = {
        text: `Provide a brief summary for the following article: 

` + text};
    const req = {
        contents: [
            {role: 'user', parts: [finalText]}
        ],
    };

    const streamingResp = await generativeModel.generateContentStream(req);

    // for await (const item of streamingResp.stream) {
    //     process.stdout.write('stream chunk: ' + JSON.stringify(item) + '\n');
    //     // return item;
    //     // return item.candidates[0].content.parts[0];
    // }
    //
    // process.stdout.write('aggregated response: ' + JSON.stringify(await streamingResp.response));
    if (streamingResp.response) {
        const res: any = JSON.stringify(await streamingResp.response)
        return JSON.parse(res);
    }
}

// summarizerGoogleAPI();
