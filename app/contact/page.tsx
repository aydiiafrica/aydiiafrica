

'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Container } from '../components/common/Container';
import { FormInput } from '../components/common/FormInput';
import { useState } from 'react';
import News from '../components/News';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: async (data) => {
      try {
        await contactSchema.parseAsync(data);
        return {
          values: data,
          errors: {},
        };
      } catch (error) {
        return {
          values: {},
          errors: (error as z.ZodError).formErrors?.fieldErrors || {},
        };
      }
    },
  });

  const onSubmit: SubmitHandler<ContactForm> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      // Send form data to Formspree
      const response = await fetch(
        `https://formspree.io/f/${process.env.NEXT_PUBLIC_FOMR_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.fullName,
            email: data.email,
            message: data.message,
            _subject: `Contact form submission from ${data.fullName}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-10 md:pt-20">
      <Container>
        <div className="pb-20">
          <h1 className="text-4xl md:text-5xl font-heading mb-6">Contact Us</h1>
          <p className="text-gray-500 mb-8 font-light max-w-[60ch]">
            Have any questions or suggestions? We&apos;d love to hear from you. Fill
            out the form below and we&apos;ll get back to you as soon as possible.
          </p>

          {submitSuccess ? (
            <div className="bg-green-50 p-4 rounded-lg mb-8">
              <p className="text-green-800">
                Thank you for your message! We will get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <FormInput
                  label="Full Name"
                  name="fullName"
                  register={register}
                  error={errors.fullName?.message}
                  placeholder="eg. John Doe"
                />

                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  register={register}
                  error={errors.email?.message}
                  placeholder="john.doe@somewhere.com"
                />
              </div>

              <FormInput
                label="Message"
                name="message"
                register={register}
                error={errors.message?.message}
                isTextArea={true}
                placeholder="Message (1000 characters max)"
              />

              {submitError && (
                <div className="text-red-500 text-sm mb-4">{submitError}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-max bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}

          
        </div>
      </Container>

      <News />
    </div>
  );
}
