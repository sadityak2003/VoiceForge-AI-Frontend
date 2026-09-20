import { useState } from "react";

import { generateVoice } from "../services/voiceService";

const VoicePage = () => {
    const [text, setText] = useState("");
    const [voiceId, setVoiceId] = useState("");

    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!text.trim()) {
            setError("Please enter some text.");
            return;
        }

        if (!voiceId.trim()) {
            setError("Please enter a voice ID.");
            return;
        }

        setError(null);
        setAudioUrl(null);
        setIsGenerating(true);

        try {
            const response = await generateVoice({
                text,
                voiceId,
            });

            setAudioUrl(response.audioUrl);
        } catch (error) {
            console.error("Voice generation failed:", error);

            setError("Failed to generate voice. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-3xl space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Generate Voice
                </h1>

                <p className="mt-2 text-gray-600">
                    Convert your text into an AI-generated voice.
                </p>
            </div>

            <div className="space-y-4 rounded-lg border p-6">
                <div>
                    <label 
                      htmlFor="text"
                      className="mb-2 block font-medium"
                    >
                        Text
                    </label>

                    <textarea 
                      id="text"
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                      placeholder="Enter the text you want to convert..."
                      rows={8}
                      className="w-full rounded-lg border p-3 outline-none focus:ring-2"
                    />
                </div>

                <div>
                    <label 
                      htmlFor="voiceId"
                      className="mb-2 block font-medium"
                    >
                        Voice ID
                    </label>

                    <input
                      id="voiceId"
                      typeof="text"
                      value={voiceId}
                      onChange={(event) => setVoiceId(event.target.value)}
                      placeholder="Enter voice Id"
                      className="w-full rounded-lg border p-3 outline-none focus:ring-2"
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="rounded-lg bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isGenerating ? "Generating..." : "Generate Voice"}
                </button>
            </div>

            {audioUrl && (
                <div className="rounded-lg border p-6">
                    <h2 className="mb-4 text-xl font-semibold">
                        Generated Audio
                    </h2>

                    <audio 
                      controls
                      src={audioUrl}
                      className="w-full"
                    />
                </div>
            )}
        </div>
    );
};

export default VoicePage;