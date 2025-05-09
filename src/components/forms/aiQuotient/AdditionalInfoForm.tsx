
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

export interface AdditionalInfoFormData {
  jobTitle: string;
  phoneNumber: string;
  comments: string;
}

interface AdditionalInfoFormProps {
  userInfo: {
    firstname: string;
    lastname: string;
    email: string;
    company: string;
  };
  onSubmit: (data: AdditionalInfoFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  isSubmitted?: boolean;
}

const AdditionalInfoForm = ({
  userInfo,
  onSubmit,
  onCancel,
  isSubmitting = false,
  isSubmitted = false,
}: AdditionalInfoFormProps) => {
  const form = useForm<AdditionalInfoFormData>({
    defaultValues: {
      jobTitle: '',
      phoneNumber: '',
      comments: ''
    }
  });

  const handleSubmitForm = (data: AdditionalInfoFormData) => {
    onSubmit(data);
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h4 className="font-medium text-lg mb-4">Complete Your Report Request</h4>
      <p className="text-sm text-gray-600 mb-4">Please provide a few additional details to help us customize your report:</p>
      
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmitForm)} 
          className="space-y-4"
          data-additional-info-form="true"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <Input value={userInfo.firstname} disabled className="bg-gray-100" />
              </FormItem>
            </div>
            
            <div>
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <Input value={userInfo.lastname} disabled className="bg-gray-100" />
              </FormItem>
            </div>
            
            <div>
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input value={userInfo.email} disabled className="bg-gray-100" />
              </FormItem>
            </div>
            
            <div>
              <FormItem>
                <FormLabel>Company</FormLabel>
                <Input value={userInfo.company} disabled className="bg-gray-100" />
              </FormItem>
            </div>
            
            <div>
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Your role in the company" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Best number to reach you" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Comments (optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any specific areas of interest or questions you have about AI implementation" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="flex justify-end space-x-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Back
            </Button>
            <Button 
              type="submit" 
              className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white flex items-center gap-2"
              disabled={isSubmitting || isSubmitted}
            >
              Submit Report Request <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdditionalInfoForm;
