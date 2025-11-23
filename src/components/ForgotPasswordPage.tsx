import { Header } from './Header';
import { Footer } from './Footer';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Leaf, Mail, ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';

export function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#BCF181] rounded-full mb-4">
              <Leaf className="w-8 h-8 text-green-800" />
            </div>
            <h1 className="font-['Lora'] mb-2">
              {emailSent ? 'Check Your Email' : 'Forgot Password?'}
            </h1>
            <p className="text-gray-600">
              {emailSent 
                ? "We've sent password reset instructions to your email"
                : "Enter your email address and we'll send you instructions to reset your password"
              }
            </p>
          </div>

          {!emailSent ? (
            <>
              {/* Reset Form */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEmailSent(true);
                  }}
                  className="space-y-6"
                >
                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#ca6946] hover:bg-[#b55835] text-white py-3 rounded-full transition-all font-medium"
                  >
                    Send Reset Link
                  </button>
                </form>
              </div>

              {/* Back to Login */}
              <a
                href="#login"
                className="flex items-center justify-center gap-2 mt-6 text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to login</span>
              </a>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="bg-white border-2 border-green-600 rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-['Lato'] uppercase tracking-wider mb-2">Email Sent!</h3>
                  <p className="text-gray-600 mb-4">
                    We've sent password reset instructions to:
                  </p>
                  <p className="font-medium text-[#ca6946] mb-6">
                    customer@sustainique.com
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Didn't receive the email?</strong>
                  </p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Check your spam/junk folder</li>
                    <li>• Make sure you entered the correct email</li>
                    <li>• The link expires in 1 hour</li>
                  </ul>
                </div>

                <button
                  onClick={() => setEmailSent(false)}
                  className="w-full border-2 border-[#ca6946] text-[#ca6946] hover:bg-[#ca6946] hover:text-white py-3 rounded-full transition-all font-medium mb-3"
                >
                  Resend Email
                </button>

                <a
                  href="#login"
                  className="block w-full text-center border-2 border-gray-300 hover:bg-gray-50 py-3 rounded-full transition-all"
                >
                  Back to Login
                </a>
              </div>
            </>
          )}

          {/* Help Section */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Need more help?</h4>
            <p className="text-sm text-gray-600 mb-3">
              If you're having trouble resetting your password, please contact our support team.
            </p>
            <a
              href="#contact"
              className="text-sm text-[#ca6946] hover:underline font-medium"
            >
              Contact Support →
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
