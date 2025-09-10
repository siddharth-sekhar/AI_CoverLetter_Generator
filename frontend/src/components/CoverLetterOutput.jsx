function CoverLetterOutput({ coverLetter }) {
  if (!coverLetter) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Generated Cover Letter</h2>
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans">
              {coverLetter}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 rounded-b-lg">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Character count: {coverLetter.length}</span>
            <button
              onClick={() => navigator.clipboard.writeText(coverLetter)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverLetterOutput;
