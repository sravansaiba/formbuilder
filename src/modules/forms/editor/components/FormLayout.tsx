// import { useState } from "react";
// import { FieldEditor } from "./FieldEditor";
// import { Field } from "./types";
// import { cn } from "@/modules/ui/lib/utils";
// import { Trash2, SquarePen } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragOverlay,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
//   arrayMove,
//   useSortable,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// interface FormLayoutProps {
//   fields: Field[];
//   editingFieldId: string | null;
//   setFields: React.Dispatch<React.SetStateAction<Field[]>>;
//   setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
// }

// export const FormLayout = ({
//   fields,
//   editingFieldId,
//   setFields,
//   setEditingFieldId,
// }: FormLayoutProps) => {
//   const [activeId, setActiveId] = useState<string | null>(null);
//   const [isDragging, setIsDragging] = useState(false);

//   // Define sensors for drag-and-drop (Pointer and Keyboard)
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   // Handle drag end event
//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (over && active.id !== over.id) {
//       setFields((prev) => {
//         const oldIndex = prev.findIndex((field) => field.id === active.id);
//         const newIndex = prev.findIndex((field) => field.id === over.id);
//         return arrayMove(prev, oldIndex, newIndex);
//       });
//     }

//     setActiveId(null);
//   };

//   // Handle drop event
//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);

//     const fieldType = e.dataTransfer.getData("text/plain");
//     const newField: Field = {
//       id: `field-${Date.now()}`,
//       type: fieldType,
//       label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
//       placeholder: "",
//       options:
//         fieldType === "radio" ? [{ value: "option1", label: "Option 1" }] : [],
//     };

//     setFields((prev) => [...prev, newField]);
//     setEditingFieldId(newField.id);
//   };

//   return (
//     <div
//       className={cn(
//         "ml-64 p-4 pb-36 min-h-screen w-auto transition-all duration-300 overflow-y-auto",
//         isDragging
//           ? "bg-slate-200 border-2 border-dashed border-blue-500"
//           : "bg-white"
//       )}
//       onDrop={handleDrop}
//       onDragOver={(e) => {
//         setIsDragging(true);
//         e.preventDefault();
//       }}
//       onDragLeave={() => setIsDragging(false)}
//     >
//       <h3 className="mb-4 font-semibold text-slate-800">Form Layout</h3>
//       {fields.length === 0 ? (
//         <p className="text-slate-500">
//           Drag and drop fields here to build your form.
//         </p>
//       ) : (
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//           onDragStart={(event) => setActiveId(event.active.id as string)}
//         >
//           <SortableContext
//             items={fields.map((field) => field.id)}
//             strategy={verticalListSortingStrategy}
//           >
//             <div className="space-y-4">
//               <AnimatePresence>
//                 {fields.map((field) => (
//                   <SortableField
//                     key={field.id}
//                     field={field}
//                     isEditing={editingFieldId === field.id}
//                     setFields={setFields}
//                     setEditingFieldId={setEditingFieldId}
//                   />
//                 ))}
//               </AnimatePresence>
//             </div>
//           </SortableContext>

//           {/* Drag Overlay */}
//           <DragOverlay>
//             {activeId && (
//               <div className="bg-slate-100 p-4 rounded-md cursor-grab active:cursor-grabbing hover:bg-slate-200">
//                 {fields.find((field) => field.id === activeId)?.label ||
//                   "Unknown Field"}
//               </div>
//             )}
//           </DragOverlay>
//         </DndContext>
//       )}
//     </div>
//   );
// };

// const SortableField = ({
//   field,
//   isEditing,
//   setFields,
//   setEditingFieldId,
// }: {
//   field: Field;
//   isEditing: boolean;
//   setFields: React.Dispatch<React.SetStateAction<Field[]>>;
//   setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: field.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const handleDelete = () => {
//     setFields((prev) => prev.filter((f) => f.id !== field.id));
//   };

//   return (
//     <motion.div
//       ref={setNodeRef}
//       style={style}
//       className="relative bg-white p-4 rounded-md  border border-gray-300 flex flex-col hover:bg-gray-100 transition-all"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* Top Row: Drag Handle, Field Text, Actions */}
//       <div className="flex items-center justify-between">
//         {/* Drag Handle (Left) */}
//         <div
//           {...attributes}
//           {...listeners}
//           className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-700 px-2"
//         >
//           ⠿
//         </div>

//         {/* Field Text (Center) */}
//         <div className="flex-1 text-left ml-3 font-medium text-gray-700">
//           {field.label}
//         </div>

//         {/* Actions (Right: Edit & Delete) */}
//         <div className="flex items-center gap-4 pr-4">
//           {/* Edit Button */}
//           <div
//             className="  text-white rounded-md text-sm "
//             onClick={() => setEditingFieldId(field.id)}
//           >

//             <div className="group relative inline-block">
//               <SquarePen color="blue" />
//               <span className="absolute hidden group-hover:block top-full mt-2 px-2 py-1 bg-gray-700 text-white text-xs rounded whitespace-nowrap">
//                 Edit
//               </span>
//             </div>
//           </div>

//           {/* Delete Button */}
//           <div
//             className=" text-white rounded-md text-sm "
//             onClick={handleDelete}
//           >
//             <div className="group relative inline-block">
//               <Trash2 color="red" />
//               <span className="absolute hidden group-hover:block top-full mt-2 px-2 py-1 bg-gray-700 text-white text-xs rounded whitespace-nowrap">
//                 Delete
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Field Editor (Expands Below with Animation) */}
//       <AnimatePresence>
//         {isEditing && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="mt-3"
//           >
//             <FieldEditor
//               field={field}
//               setFields={setFields}
//               setEditingFieldId={setEditingFieldId}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };


import { useState } from "react";
import { FieldEditor } from "./FieldEditor";
import { Field } from "./types";
import { cn } from "@/modules/ui/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragOverlay,
  DragEndEvent,
  DragStartEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Rows, SquarePen, Trash2 } from "lucide-react";

interface FormLayoutProps {
  fields: Field[];
  editingFieldId: string | null;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const FormLayout = ({
  fields,
  editingFieldId,
  setFields,
  setEditingFieldId,
}: FormLayoutProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Define sensors for drag-and-drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag start event
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFields((prev) => {
        const oldIndex = prev.findIndex((field) => field.id === active.id);
        const newIndex = prev.findIndex((field) => field.id === over.id);
        
        return arrayMove(prev, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  // Handle drop event for adding new fields
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const fieldType = e.dataTransfer.getData("text/plain");
    const newField: Field = {
      id: `field-${Date.now()}`,
      type: fieldType,
      label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
      placeholder: "",
      options: fieldType === "radio" ? [{ value: "option1", label: "Option 1" }] : [],
    };

    setFields((prev) => [...prev, newField]);
    setEditingFieldId(newField.id);
  };

  return (
    <div
      className={cn(
        "ml-64 p-4 min-h-[90vh] pb-20 w-auto transition-all duration-300 overflow-y-auto",
        isDragging ? "bg-slate-200 border-2 border-dashed border-blue-500" : "bg-white"
      )}
      onDrop={handleDrop}
      onDragOver={(e) => {
        setIsDragging(true);
        e.preventDefault();
      }}
      onDragLeave={() => setIsDragging(false)}
    >
      <h3 className="mb-4 font-semibold text-slate-800 text-xl">Form Layout</h3>
      {fields.length === 0 ? (
        <p className="text-slate-500">Drag and drop fields here to build your form.</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={fields.map((field) => field.id)} 
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              <AnimatePresence>
                {fields.map((field) => (
                  <SortableField
                    key={field.id}
                    field={field}
                    isEditing={editingFieldId === field.id}
                    setFields={setFields}
                    setEditingFieldId={setEditingFieldId}
                    fields={fields}
                  />
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeId && (
              <div className="bg-slate-100 p-4 rounded-md cursor-grab active:cursor-grabbing hover:bg-slate-200">
                {fields.find((field) => field.id === activeId)?.label || "Unknown Field"}
              </div>
            )}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
};

const SortableField = ({
  field,
  isEditing,
  setFields,
  setEditingFieldId,
  fields,
}: {
  field: Field;
  isEditing: boolean;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
  fields: Field[];
}) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition 
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    setFields((prev) => prev.filter((f) => f.id !== field.id));
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="relative bg-white p-4 rounded-md border border-gray-300 flex flex-col hover:bg-gray-100 transition-all"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-700 px-2"
        >
          <Rows/>
        </div>

        <div className="flex-1 text-left ml-3 font-medium text-gray-700">
          {field.label}
        </div>

        <div className="flex items-center gap-4 pr-4">
          <div
            className="text-white rounded-md text-sm"
            onClick={() => setEditingFieldId(field.id)}
          >
            <div className="group relative inline-block">
              <SquarePen color="blue" />
              <span className="absolute hidden group-hover:block top-full mt-2 px-2 py-1 bg-gray-700 text-white text-xs rounded whitespace-nowrap">
                Edit
              </span>
            </div>
          </div>

          <div
            className="text-white rounded-md text-sm"
            onClick={handleDelete}
          >
            <div className="group relative inline-block">
              <Trash2 color="red" />
              <span className="absolute hidden group-hover:block top-full mt-2 px-2 py-1 bg-gray-700 text-white text-xs rounded whitespace-nowrap">
                Delete
              </span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3"
          >
            <FieldEditor
              field={field}
              isEditing={isEditing}
              setFields={setFields}
              setEditingFieldId={setEditingFieldId}
              fields={fields}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};