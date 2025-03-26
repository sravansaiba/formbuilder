// import { useState } from "react";
// import { Edit, Trash2, Save, X } from "lucide-react";

// interface Field {
//   id: string;
//   label: string;
//   type: string;
//   placeholder: string;
//   options?: { value: string; label: string }[];
// }

// interface FieldEditorProps {
//   field: Field;
//   setFields: React.Dispatch<React.SetStateAction<Field[]>>;
//   setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
// }

// export const FieldEditor = ({
//   field,
//   setFields,
//   setEditingFieldId,
// }: FieldEditorProps) => {
//   const [editedField, setEditedField] = useState(field);

//   const handleDelete = () => {
//     setFields((prev) => prev.filter((f) => f.id !== field.id));
//     setEditingFieldId(null);
//   };

//   const handleSave = () => {
//     setFields((prev) => prev.map((f) => (f.id === field.id ? editedField : f)));
//     setEditingFieldId(null);
//   };

//   return (
//     <div className="relative w-full max-w-md bg-white p-4 mt-5 rounded-lg  border">
//       {/* Input Fields */}
//       <div className="mb-3">
//         <label className="block text-sm font-medium text-gray-600 mb-1">
//           Label Name
//         </label>
//         <input
//           placeholder=".."
//           type="text"
//           value={editedField.label}
//           onChange={(e) =>
//             setEditedField({ ...editedField, label: e.target.value })
//           }
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
//         />
//       </div>

//       {field.type === "text" && (
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Placeholder
//           </label>
//           <input
//             placeholder=".."
//             type="text"
//             value={editedField.placeholder}
//             onChange={(e) =>
//               setEditedField({ ...editedField, placeholder: e.target.value })
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
//           />
//         </div>
//       )}

//       {field.type === "radio" && (
//         <div className="mb-2">
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Options
//           </label>
//           {editedField.options?.map((option, index) => (
//             <div key={index} className="flex items-center space-x-2 mb-2">
//               <input
//                 type="text"
//                 value={option.label}
//                 onChange={(e) => {
//                   const updatedOptions = editedField.options!.map((opt, i) =>
//                     i === index ? { ...opt, label: e.target.value } : opt
//                   );
//                   setEditedField({ ...editedField, options: updatedOptions });
//                 }}
//                 className="w-full px-3 py-2 border border-slate-300 rounded-md"
//                 placeholder="Enter option label"
//               />
//               <button
//                 onClick={() => {
//                   const updatedOptions = editedField.options!.filter(
//                     (_, i) => i !== index
//                   );
//                   setEditedField({ ...editedField, options: updatedOptions });
//                 }}
//                 className="text-red-500 hover:underline"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <div
//             onClick={() => {
//               const newOption = {
//                 value: `option${(editedField.options?.length || 0) + 1}`,
//                 label: "",
//               };
//               setEditedField({
//                 ...editedField,
//                 options: [...(editedField.options || []), newOption],
//               });
//             }}
//             className="text-blue-500 hover:underline cursor-pointer"
//           >
//             Add Option
//           </div>
//         </div>
//       )}

//       {/* Buttons */}
//       <div className="flex justify-end space-x-2">
//         <button
//           onClick={handleSave}
//           className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//         >
//           <Save size={16} className="mr-1" />
//           Save
//         </button>
//         <button
//           onClick={() => setEditingFieldId(null)}
//           className="flex items-center bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
//         >
//           <X size={16} className="mr-1" />
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };


//################################################################################

import { Save, X } from "lucide-react";

interface Field {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  options?: { value: string; label: string }[];
}

interface FieldEditorProps {
  field: Field;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const FieldEditor = ({
  field,
  setFields,
  setEditingFieldId,
}: FieldEditorProps) => {
  const handleFieldChange = (key: keyof Field, value: any) => {
    setFields((prev) =>
      prev.map((f) => (f.id === field.id ? { ...f, [key]: value } : f))
    );
  };

  const handleOptionChange = (index: number, value: string) => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === field.id
          ? {
              ...f,
              options: f.options?.map((opt, i) =>
                i === index ? { ...opt, label: value } : opt
              ),
            }
          : f
      )
    );
  };

  const handleAddOption = () => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === field.id
          ? {
              ...f,
              options: [
                ...(f.options || []),
                { value: `option${(f.options?.length || 0) + 1}`, label: "" },
              ],
            }
          : f
      )
    );
  };

  const handleRemoveOption = (index: number) => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === field.id
          ? { ...f, options: f.options?.filter((_, i) => i !== index) }
          : f
      )
    );
  };

  return (
    <div className="relative w-full max-w-md bg-white p-4 mt-5 rounded-lg border">
      {/* Input Fields */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Label Name
        </label>
         <input
          placeholder="Label Name"
          type="text"
          value={field.label}
          onChange={(e) => handleFieldChange("label", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        />
      </div>

      {field.type === "text" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Placeholder
          </label>
          <input
            placeholder="Placeholder"
            type="text"
            value={field.placeholder}
            onChange={(e) => handleFieldChange("placeholder", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
        </div>
      )}

      {field.type === "radio" && (
        <div className="mb-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Options
          </label>
          {field.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={option.label}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                placeholder="Enter option label"
              />
              <button
                onClick={() => handleRemoveOption(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div
            onClick={handleAddOption}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Add Option
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setEditingFieldId(null)}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          <Save size={16} className="mr-1" />
          Save
        </button>
        <button
          onClick={() => setEditingFieldId(null)}
          className="flex items-center bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
        >
          <X size={16} className="mr-1" />
          Cancel
        </button>
      </div>
    </div>
  );
};





