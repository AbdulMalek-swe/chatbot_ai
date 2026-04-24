import React from 'react';
import type { FormBlock } from '../../../types/chat';

interface FormRendererProps {
  block: FormBlock;
}

export const FormRenderer: React.FC<FormRendererProps> = ({ block }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200/50 mb-10">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 uppercase tracking-wide">
        {block.formType.replace('-', ' ')}
      </h3>
      <div className="flex flex-col gap-4">
        {/* Placeholder for actual form fields based on formType */}
        <p className="text-sm text-slate-500">Please provide the necessary details for {block.formType}.</p>
        <button className="self-end px-6 py-2 bg-primary-600 text-white rounded-xl font-medium shadow-md shadow-primary-500/20 hover:shadow-lg transition-all">
          Submit
        </button>
      </div>
    </div>
  );
};
