
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowRight, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';

export interface UserInfo {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
}

interface UserInfoFormProps {
  initialData: UserInfo;
  onSubmit: (data: UserInfo) => void;
}

const UserInfoForm = ({ initialData, onSubmit }: UserInfoFormProps) => {
  const userInfoForm = useForm<UserInfo>({
    defaultValues: initialData
  });

  return (
    <Card className="p-6 shadow-md">
      <div className="flex items-start gap-3 mb-6">
        <User className="h-6 w-6 text-prometheus-orange mt-1" />
        <h2 className="text-xl font-semibold">Let's start with your information</h2>
      </div>
      
      <Form {...userInfoForm}>
        <form onSubmit={userInfoForm.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={userInfoForm.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your first name" required {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={userInfoForm.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your last name" required {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={userInfoForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" required {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={userInfoForm.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your company name" required {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white flex gap-2"
            >
              Start Assessment <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default UserInfoForm;
