// import { Save, X } from "lucide-react";

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
//   const handleFieldChange = (key: keyof Field, value: any) => {
//     setFields((prev) =>
//       prev.map((f) => (f.id === field.id ? { ...f, [key]: value } : f))
//     );
//   };

//   const handleOptionChange = (index: number, value: string) => {
//     setFields((prev) =>
//       prev.map((f) =>
//         f.id === field.id
//           ? {
//               ...f,
//               options: f.options?.map((opt, i) =>
//                 i === index ? { ...opt, label: value } : opt
//               ),
//             }
//           : f
//       )
//     );
//   };

//   const handleAddOption = () => {
//     setFields((prev) =>
//       prev.map((f) =>
//         f.id === field.id
//           ? {
//               ...f,
//               options: [
//                 ...(f.options || []),
//                 { value: `option${(f.options?.length || 0) + 1}`, label: "" },
//               ],
//             }
//           : f
//       )
//     );
//   };

//   const handleRemoveOption = (index: number) => {
//     setFields((prev) =>
//       prev.map((f) =>
//         f.id === field.id
//           ? { ...f, options: f.options?.filter((_, i) => i !== index) }
//           : f
//       )
//     );
//   };

//   return (
//     <div className="relative w-full max-w-md bg-white p-4 mt-5 rounded-lg border">
//       {/* Input Fields */}
//       <div className="mb-3">
//         <label className="block text-sm font-medium text-gray-600 mb-1">
//           Label Name
//         </label>
//          <input
//           placeholder="Label Name"
//           type="text"
//           value={field.label}
//           onChange={(e) => handleFieldChange("label", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
//         />
//       </div>

//       {field.type === "text" && (
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Placeholder
//           </label>
//           <input
//             placeholder="Placeholder"
//             type="text"
//             value={field.placeholder}
//             onChange={(e) => handleFieldChange("placeholder", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
//           />
//         </div>
//       )}

//       {field.type === "radio" && (
//         <div className="mb-2">
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Options
//           </label>
//           {field.options?.map((option, index) => (
//             <div key={index} className="flex items-center space-x-2 mb-2">
//               <input
//                 type="text"
//                 value={option.label}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//                 className="w-full px-3 py-2 border border-slate-300 rounded-md"
//                 placeholder="Enter option label"
//               />
//               <button
//                 onClick={() => handleRemoveOption(index)}
//                 className="text-red-500 hover:underline"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <div
//             onClick={handleAddOption}
//             className="text-blue-500 hover:underline cursor-pointer"
//           >
//             Add Option
//           </div>
//         </div>
//       )}

//       {/* Buttons */}
//       <div className="flex justify-end space-x-2">
//         <button
//           onClick={() => setEditingFieldId(null)}
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


// import { renderFieldComponent } from "./fieldRenderer";
import { useState } from "react";
import { Field } from "./types";
import { Columns, Save, X } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

interface FieldEditorProps {
  field: Field;
  isEditing: boolean;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
  fields: Field[];
}

export const FieldEditor = ({ field, isEditing, setFields, setEditingFieldId, fields }: FieldEditorProps) => {
  const [showRowOptions, setShowRowOptions] = useState(false);

  const existingRowIds = Array.from(new Set(fields.map(f => f.rowId).filter(Boolean)));

  const handleRowConfiguration = (action: 'newRow' | 'existingRow', rowId?: string) => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === field.id
          ? {
            ...f,
            rowId: action === 'newRow' ? uuidv4() : rowId
          }
          : f
      )
    );
    setShowRowOptions(false);
  }

  const handleRemoveFromRow = () => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === field.id
          ? { ...f, rowId: undefined }
          : f
      )
    );
  };

  if (!isEditing) {
    return (
      <div className="bg-slate-100 p-4 rounded-md shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-800">{field.label}</span>
          <button
            onClick={() => setEditingFieldId(field.id)}
            className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
            aria-label={`Edit ${field.label}`}
          >
            Edit
          </button>
        </div>
        {/* Render the field preview here */}
        {/* {renderFieldComponent(field)} */}
      </div>
    );
  }
  const [originalField, setOriginalField] = useState<Field>(field);

  return (
    <div className="bg-slate-200 p-4 rounded-md shadow-sm">
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-800 mb-1">Label</label>
        <input
          type="text"
          value={field.label}
          onChange={(e) =>
            setFields((prev: Field[]) =>
              prev.map((f: Field) => (f.id === field.id ? { ...f, label: e.target.value } : f))
            )
          }
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-brand-dark focus:outline-none transition-colors"
          placeholder="Enter field label"
        />
      </div>

      {/* Placeholder Input (Only for Text Fields) */}
      {(field.type === "text" || field.type === "number") && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Placeholder</label>
          <input
            type="text"
            value={field.placeholder || ""}
            onChange={(e) =>
              setFields((prev) =>
                prev.map((f) =>
                  f.id === field.id ? { ...f, placeholder: e.target.value } : f
                )
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            placeholder="Enter placeholder text"
          />
        </div>
      )}


      {/* Radio Button Options */}
      {field.type === "radio" && (
        <div className="mb-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Options</label>
          {/* Safely map over options */}
          {(field.options ?? []).map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={option.label}
                onChange={(e) => {
                  // Safely update options
                  const updatedOptions = (field.options ?? []).map((opt, i) =>
                    i === index ? { ...opt, label: e.target.value } : opt
                  );
                  setFields((prev) =>
                    prev.map((f) =>
                      f.id === field.id ? { ...f, options: updatedOptions } : f
                    )
                  );
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                placeholder="Enter option label"
              />
              <button
                onClick={() => {
                  // Safely filter options
                  const updatedOptions = (field.options ?? []).filter((_, i) => i !== index);
                  setFields((prev) =>
                    prev.map((f) =>
                      f.id === field.id ? { ...f, options: updatedOptions } : f
                    )
                  );
                }}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          {/* Add a new option */}
          <button
            onClick={() => {
              const newOption = {
                value: `option${(field.options ?? []).length + 1}`,
                label: "",
              };
              setFields((prev) =>
                prev.map((f) =>
                  f.id === field.id ? { ...f, options: [...(f.options ?? []), newOption] } : f
                )
              );
            }}
            className="text-blue-500 hover:underline"
          >
            Add Option
          </button>
        </div>
      )}


      {/* Add more configuration options based on field type */}

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setEditingFieldId(null)}
          className=" flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          aria-label="Save changes"
        >
          <Save size={16} className="mr-1" />
          Done
        </button>
        <button
          onClick={() => {
            setFields((prev: Field[]) =>
              prev.map((f: Field) => (f.id === field.id ? originalField : f))
            );
            setEditingFieldId(null);
          }}
          className=" flex items-center bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          aria-label="Cancel editing"
        >
          <X size={16} className="mr-1" />
          Cancel
        </button>
      </div>

      {/* Row Configuration Section */}
      <div className="mt-4 border-t pt-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">
            Row Configuration
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowRowOptions(!showRowOptions)}
              className="text-blue-500 hover:text-blue-700 flex items-center"
            >
              <Columns size={16} className="mr-2" />
              Configure Row
            </button>
          </div>
        </div>

        {showRowOptions && (
          <div className="mt-2 space-y-2">
            <button
              onClick={() => handleRowConfiguration('newRow')}
              className="w-full bg-blue-100 text-blue-600 py-2 rounded-md hover:bg-blue-200"
            >
              Create New Row
            </button>

            {existingRowIds.length > 0 && (
              <div>
                <p className="text-sm text-slate-600 mb-2">Add to Existing Row:</p>
                {existingRowIds.map((rowId) => (
                  <button
                    key={rowId}
                    onClick={() => handleRowConfiguration('existingRow', rowId)}
                    className="w-full bg-green-100 text-green-600 py-2 rounded-md hover:bg-green-200 mb-2"
                  >
                    Row {existingRowIds.indexOf(rowId) + 1}
                  </button>
                ))}
              </div>
            )}

            {field.rowId && (
              <button
                onClick={handleRemoveFromRow}
                className="w-full bg-red-100 text-red-600 py-2 rounded-md hover:bg-red-200 mt-2"
              >
                Remove from Row
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};





