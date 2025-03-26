// import { renderFieldComponent } from "./fieldRenderer";

// interface PreviewProps {
//     fields: any[];
//   }
  
//   export const Preview = ({ fields }: PreviewProps) => {
//     return (
//       <aside className="group hidden flex-1 min-h-screen flex-shrink-0 items-center justify-center overflow-hidden border-l border-slate-200 bg-slate-100 shadow-inner md:flex md:flex-col">
//         <h3 className="font-semibold mb-4 px-4">Preview</h3>
//         <form className="w-full max-w-sm px-4">
//           {fields.map((field) => renderFieldComponent(field))}
//           <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
//             Submit
//           </button>
//         </form>
//       </aside>
//     );
//   };


import { renderFieldComponent } from "./fieldRenderer";

interface PreviewProps {
  fields: any[];
}

export const Preview = ({ fields }: PreviewProps) => {
  // Group fields by rows
  const groupedFields = fields.reduce((acc, field) => {
    if (field.rowId) {
      if (!acc[field.rowId]) {
        acc[field.rowId] = [];
      }
      acc[field.rowId].push(field);
    } else {
      const uniqueRowId = `no-row-${field.id}`;
      acc[uniqueRowId] = [field];
    }
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <aside className="flex-1 h-screen py-10 overflow-y-auto flex-shrink-0 border-l border-slate-200 bg-slate-100 shadow-inner flex flex-col items-center">
      <h3 className="text-5xl text-center mb-6 px-4 bg-clip-text text-transparent bg-gradient-to-t from-blue-800 to-black/80 font-bold">Preview</h3>
      <form className=" max-w-sm px-8 mb-10 shadow-md p-5 rounded-3xl w-full bg-white">
      <h3 className="font-semibold text-3xl text-center my-6 ">Form Title</h3>
        <div>
        {Object.entries(groupedFields).map(([rowId, rowFields]) => (
          <div 
            key={rowId} 
            className="flex space-x-4 mb-4"
          >
            
            {rowFields.map((field) => (
              <div 
                key={field.id} 
                className={`flex-1 w-1/${rowFields.length}`}
              >
                {renderFieldComponent(field)}
              </div>
            ))}
          </div>
        ))}
        </div>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
    </aside>
  );
};