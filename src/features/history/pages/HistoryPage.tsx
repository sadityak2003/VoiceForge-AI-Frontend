import { useEffect, useState } from "react";

import {
  deleteHistory,
  getHistory,
} from "../services/historyService";

import type { Generation } from "../types/history";

const HistoryPage = () => {
  const [history, setHistory] = useState<Generation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getHistory();

      setHistory(data);
    } catch (error) {
      console.error("Failed to load history:", error);

      setError("Failed to load history.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteHistory(id);

      setHistory((currentHistory) =>
        currentHistory.filter(
          (generation) => generation.id !== id
        )
      );
    } catch (error) {
      console.error("Failed to delete history:", error);

      setError("Failed to delete history.");
    }
  };

  if (isLoading) {
    return <p>Loading history...</p>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">{error}</p>

        <button
          type="button"
          onClick={loadHistory}
          className="rounded-lg bg-black px-5 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Generation History
        </h1>

        <p className="mt-2 text-gray-600">
          View your previously generated voices.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-gray-600">
            You haven't generated any voices yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((generation) => (
            <div
              key={generation.id}
              className="rounded-lg border p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="font-medium">
                    {generation.text}
                  </p>

                  <div className="text-sm text-gray-500">
                    <p>Voice: {generation.voiceId}</p>

                    <p>
                      Credits used:{" "}
                      {generation.creditsUsed}
                    </p>

                    <p>
                      {new Date(
                        generation.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <audio
                    controls
                    src={generation.audioUrl}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(generation.id)
                    }
                    className="rounded-lg border border-red-300 px-4 py-2 text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;