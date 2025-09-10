function JobDescriptionInput({ value, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Job Description
      </label>
      <textarea
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        rows={8}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here... Include key requirements, responsibilities, and qualifications."
      />
      <div className="mt-1 text-xs text-gray-500">
        Character count: {value.length}
      </div>
    </div>
  );
}

export default JobDescriptionInput;
