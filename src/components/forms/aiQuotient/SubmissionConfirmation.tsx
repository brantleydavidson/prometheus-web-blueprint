
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SubmissionConfirmationProps {
  email: string;
}

const SubmissionConfirmation = ({ email }: SubmissionConfirmationProps) => {
  return (
    <div className="text-center p-4 space-y-3">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-2">
        <CheckCircle className="h-6 w-6" />
      </div>
      <h4 className="text-lg font-medium text-green-600">Report Request Confirmed!</h4>
      <p className="text-gray-600">We'll be sending your detailed AI readiness report to {email} within one business day.</p>
      <p className="text-sm text-gray-500 mt-4">A member of our team may reach out to discuss strategic recommendations for your organization.</p>
    </div>
  );
};

export default SubmissionConfirmation;
