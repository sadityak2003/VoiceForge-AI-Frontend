import { useState } from "react";

import { generateVoice } from "../services/voiceService";

const voices = [
    {
        id: "CwhRBWXzGAHq8TQ4Fs17",
        name: "Rachel",
        description: "Warm • Expressive • American English",
    },
];

const VoicePage = () => {
    const [text, setText] = useState("");

    const [voiceId, setVoiceId] = useState(
        "CwhRBWXzGAHq8TQ4Fs17"
    );

    const [modelId, setModelId] = useState(
        "eleven_multilingual_v2"
    );

    const [stability, setStability] = useState(0.5);
    const [similarityBoost, setSimilarityBoost] = useState(0.75);
    const [style, setStyle] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [useSpeakerBoost, setUseSpeakerBoost] = useState(true);

    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!text.trim()) {
            setError("Please enter some text.");
            return;
        }

        if (!voiceId.trim()) {
            setError("Please select a voice.");
            return;
        }

        setError(null);
        setAudioUrl(null);
        setIsGenerating(true);

        try {
            const response = await generateVoice({
                text,
                voiceId,
                modelId,
                outputFormat: "mp3_44100_128",

                voiceSettings: {
                    stability,
                    similarityBoost,
                    style,
                    useSpeakerBoost,
                    speed,
                },

                applyTextNormalization: "auto",
                applyLanguageTextNormalization: false,
            });

            setAudioUrl(response.audioUrl);
        } catch (error) {
            console.error("Voice generation failed:", error);

            setError(
                "Failed to generate voice. Please try again."
            );
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Generate Voice
                </h1>

                <p className="mt-2 text-gray-600">
                    Convert your text into a natural AI-generated voice.
                </p>
            </div>

            {/* Main Card */}
            <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                {/* Text */}
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label
                            htmlFor="text"
                            className="font-medium text-gray-900"
                        >
                            Text
                        </label>

                        <span className="text-sm text-gray-400">
                            {text.length} characters
                        </span>
                    </div>

                    <textarea
                        id="text"
                        value={text}
                        onChange={(event) =>
                            setText(event.target.value)
                        }
                        placeholder="Enter the text you want to convert into speech..."
                        rows={8}
                        className="w-full resize-none rounded-xl border border-gray-300 p-4 text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                    />
                </div>

                {/* Voice */}
                <div>
                    <label
                        htmlFor="voice"
                        className="mb-2 block font-medium text-gray-900"
                    >
                        Voice
                    </label>

                    <div className="relative">
                        <select
                            id="voice"
                            value={voiceId}
                            onChange={(event) =>
                                setVoiceId(event.target.value)
                            }
                            className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                        >
                            {voices.map((voice) => (
                                <option
                                    key={voice.id}
                                    value={voice.id}
                                >
                                    {voice.name} — {voice.description}
                                </option>
                            ))}
                        </select>

                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                            ▼
                        </div>
                    </div>
                </div>

                {/* Model */}
                <div>
                    <label
                        htmlFor="model"
                        className="mb-2 block font-medium text-gray-900"
                    >
                        Model
                    </label>

                    <select
                        id="model"
                        value={modelId}
                        onChange={(event) =>
                            setModelId(event.target.value)
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                    >
                        <option value="eleven_multilingual_v2">
                            Eleven Multilingual v2
                        </option>

                        <option value="eleven_flash_v2_5">
                            Eleven Flash v2.5
                        </option>
                    </select>
                </div>

                {/* Voice Settings */}
                <div className="rounded-xl bg-gray-50 p-5">
                    <div className="mb-5">
                        <h2 className="font-semibold text-gray-900">
                            Voice Settings
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Fine-tune how your generated voice sounds.
                        </p>
                    </div>

                    <div className="space-y-6">

                        {/* Stability */}
                        <div>
                            <div className="mb-2 flex justify-between">
                                <label className="text-sm font-medium text-gray-700">
                                    Stability
                                </label>

                                <span className="text-sm font-medium text-gray-900">
                                    {stability.toFixed(2)}
                                </span>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={stability}
                                onChange={(event) =>
                                    setStability(
                                        Number(event.target.value)
                                    )
                                }
                                className="w-full accent-black"
                            />

                            <div className="mt-1 flex justify-between text-xs text-gray-400">
                                <span>More expressive</span>
                                <span>More stable</span>
                            </div>
                        </div>

                        {/* Similarity */}
                        <div>
                            <div className="mb-2 flex justify-between">
                                <label className="text-sm font-medium text-gray-700">
                                    Similarity Boost
                                </label>

                                <span className="text-sm font-medium text-gray-900">
                                    {similarityBoost.toFixed(2)}
                                </span>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={similarityBoost}
                                onChange={(event) =>
                                    setSimilarityBoost(
                                        Number(event.target.value)
                                    )
                                }
                                className="w-full accent-black"
                            />

                            <div className="mt-1 flex justify-between text-xs text-gray-400">
                                <span>Natural</span>
                                <span>Voice identity</span>
                            </div>
                        </div>

                        {/* Style */}
                        <div>
                            <div className="mb-2 flex justify-between">
                                <label className="text-sm font-medium text-gray-700">
                                    Style
                                </label>

                                <span className="text-sm font-medium text-gray-900">
                                    {style.toFixed(2)}
                                </span>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={style}
                                onChange={(event) =>
                                    setStyle(
                                        Number(event.target.value)
                                    )
                                }
                                className="w-full accent-black"
                            />
                        </div>

                        {/* Speed */}
                        <div>
                            <div className="mb-2 flex justify-between">
                                <label className="text-sm font-medium text-gray-700">
                                    Speed
                                </label>

                                <span className="text-sm font-medium text-gray-900">
                                    {speed.toFixed(2)}x
                                </span>
                            </div>

                            <input
                                type="range"
                                min="0.7"
                                max="1.2"
                                step="0.01"
                                value={speed}
                                onChange={(event) =>
                                    setSpeed(
                                        Number(event.target.value)
                                    )
                                }
                                className="w-full accent-black"
                            />

                            <div className="mt-1 flex justify-between text-xs text-gray-400">
                                <span>Slower</span>
                                <span>Faster</span>
                            </div>
                        </div>

                        {/* Speaker Boost */}
                        <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
                            <div>
                                <p className="font-medium text-gray-900">
                                    Speaker Boost
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Enhance similarity to the selected voice.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={useSpeakerBoost}
                                onChange={(event) =>
                                    setUseSpeakerBoost(
                                        event.target.checked
                                    )
                                }
                                className="h-5 w-5 accent-black"
                            />
                        </label>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Generate */}
                <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full rounded-xl bg-black px-6 py-3.5 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isGenerating
                        ? "Generating Voice..."
                        : "Generate Voice"}
                </button>
            </div>

            {/* Generated Audio */}
            {audioUrl && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Generated Audio
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Your AI-generated audio is ready.
                        </p>
                    </div>

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