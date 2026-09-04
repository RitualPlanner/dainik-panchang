"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";

interface DynamicFieldsProps {
  fields: string[];
  onChange: (fields: string[]) => void;
}

export default function DynamicFields({
  fields,
  onChange,
}: DynamicFieldsProps) {
  const addField = () => {
    onChange([...fields, ""]);
  };

  const removeField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    onChange(newFields);
  };

  const updateField = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index] = value;
    onChange(newFields);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">આજ નો દિન મહિમા</h3>
        <Button onClick={addField} variant="outline" size="sm">
          <Plus className="h-4 w-4" />
          Add Field
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={field}
            onChange={(e) => updateField(index, e.target.value)}
            placeholder={`દિન મહિમા ${index + 1}`}
          />
          <Button
            onClick={() => removeField(index)}
            variant="destructive"
            size="icon"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
