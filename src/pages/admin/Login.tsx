
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/providers/AuthProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Info } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [showDebugDialog, setShowDebugDialog] = useState(false);
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
    
    // Check if there's an error in the URL parameters (from Google redirect)
    const errorParam = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (errorParam) {
      console.error('Auth Error from URL:', errorParam, errorDescription);
      setError(errorDescription || `Authentication error: ${errorParam}`);
    }
  }, [user, navigate, searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      navigate('/admin');
    } catch (error: any) {
      console.error('Error signing in:', error);
      setError(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signUp(email, password, fullName);
      // Redirect is handled by the auth state change in AuthProvider
    } catch (error: any) {
      console.error('Error signing up:', error);
      setError(error.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setGoogleLoading(true);
      
      console.log('Starting Google sign in from Login page');
      await signInWithGoogle();
      // Redirection is handled by the OAuth flow
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-prometheus-navy">Prometheus CMS</h1>
          <p className="text-gray-600">Manage your website content</p>
        </div>
        
        <Card>
          {error && (
            <Alert variant="destructive" className="mx-6 mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Alert variant="default" className="mx-6 mt-6 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700 flex flex-col">
              <span>Make sure Redirect URLs are properly configured in Supabase Dashboard and Google Cloud Console.</span>
              <Button 
                variant="link" 
                className="p-0 h-auto text-blue-700 justify-start" 
                onClick={() => setShowDebugDialog(true)}
              >
                Show Configuration Debug
              </Button>
            </AlertDescription>
          </Alert>
        
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 186.69 190.5">
                    <g transform="translate(1184.583 765.171)">
                      <path fill="#4285f4" d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"/>
                      <path fill="#34a853" d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"/>
                      <path fill="#fbbc05" d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"/>
                      <path fill="#ea4335" d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.693 24.592c7.533-22.514 28.575-39.226 53.339-39.226z"/>
                    </g>
                  </svg>
                  {googleLoading ? "Connecting..." : "Sign in with Google"}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <form onSubmit={handleSignIn}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Register for admin access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 186.69 190.5">
                    <g transform="translate(1184.583 765.171)">
                      <path fill="#4285f4" d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"/>
                      <path fill="#34a853" d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"/>
                      <path fill="#fbbc05" d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"/>
                      <path fill="#ea4335" d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.693 24.592c7.533-22.514 28.575-39.226 53.339-39.226z"/>
                    </g>
                  </svg>
                  {googleLoading ? "Connecting..." : "Sign up with Google"}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <form onSubmit={handleSignUp}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        type="text" 
                        placeholder="John Doe" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <Input 
                        id="signupEmail" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <Input 
                        id="signupPassword" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
        
        <Dialog open={showDebugDialog} onOpenChange={setShowDebugDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Auth Configuration Debug</DialogTitle>
              <DialogDescription>Configuration settings being used for Google authentication</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-medium">Supabase Settings:</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Site URL: {window.location.origin}</li>
                  <li>Redirect URLs:</li>
                  <ul className="list-circle ml-6 space-y-1">
                    <li>{window.location.origin}/admin</li>
                    <li>{window.location.origin}/login</li>
                    <li>https://dxufdcvoupjqvxnwnost.supabase.co/auth/v1/callback</li>
                  </ul>
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Browser Information:</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Current URL: {window.location.href}</li>
                  <li>Origin: {window.location.origin}</li>
                  <li>Port: {window.location.port || "default"}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Troubleshooting Steps:</h3>
                <ol className="list-decimal ml-6 space-y-1">
                  <li>Verify client ID in Supabase dashboard</li>
                  <li>Check "Authorized JavaScript origins" in Google Console</li>
                  <li>Verify all redirect URLs are set in both Supabase and Google</li>
                  <li>Try clearing browser cookies and cache</li>
                </ol>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Login;
