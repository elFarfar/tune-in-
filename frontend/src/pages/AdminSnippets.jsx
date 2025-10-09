import React from "react";

export default function AdminSnippets() {
  const snippets = [
    { id: 1, title: "To the moon", uploader: "DrJoke" },
    { id: 2, title: "Now we die", uploader: "Mando" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Snippets</h2>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="p3 text-left">Title</th>
            <th className="p3 text-left">Uploader</th>
            <th className="p3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {snippets.map((snip) => (
            <tr key={snip.id} className="border-b hover:bg-gray-100">
              <td className="p3">{snip.title}</td>
              <td className="p3">{snip.uploader}</td>
              <td className="p3">
                <button className="text-red-500 hover:text-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
