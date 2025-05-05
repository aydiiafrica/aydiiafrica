'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Container } from '../components/common/Container';
import { FormInput } from '../components/common/FormInput';
import { useState } from 'react';
import { client } from '../lib/sanity';
import Image from 'next/image';
import Metrics from '../components/Metrics';

const volunteerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say']),
  photo: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'Photo is required'),
});

type VolunteerForm = z.infer<typeof volunteerSchema>;

export default function JoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VolunteerForm>({
    resolver: async (data) => {
      try {
        await volunteerSchema.parseAsync(data);
        return {
          values: data,
          errors: {},
        };
      } catch (error) {
        return {
          values: {},
          errors:
            error instanceof z.ZodError
              ? error.formErrors?.fieldErrors || {}
              : {},
        };
      }
    },
  });

  const onSubmit: SubmitHandler<VolunteerForm> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      // // Create a FormData to handle the file upload
      // const formData = new FormData();
      // formData.append('file', data.photo[0]);

      // Upload the image to Sanity
      const imageResponse = await client.assets.upload('image', data.photo[0]);

      // Create the volunteer document
      await client.create({
        _type: 'volunteer',
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        photo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageResponse._id,
          },
        },
        submittedAt: new Date().toISOString(),
      });

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
    <div className="py-10 md:py-20">
      <Container>
        <div className="">
          <h1 className="text-4xl md:text-5xl font-heading mb-6 font-light">
            Become a Volunteer
          </h1>
          <figure className="relative w-full h-[20rem] md:h-[30rem] rounded-md overflow-hidden mb-6">
            <Image
              // src="https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHzwF9A53V0ELAITsBhF1Jqe7YgcXP46HlrndW"
              src="https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHHqYf2Nh7wvqx31Gze2uIbLX0RYkBNcDQhTEj"
              fill
              className="absolute top-0 left-0 w-full h-full object-cover"
              alt=""
            />
          </figure>
          <p className="mb-10 text-gray-500 max-w-[60ch] font-light">
            Join us in making a difference in the lives of youth, women, and
            girls across Africa. Fill out the form below to start your journey
            as a volunteer.
          </p>

          {submitSuccess ? (
            <div className="bg-green-50 p-4 rounded-lg mb-8">
              <p className="text-green-800">
                Thank you for your interest in volunteering! We will review your
                application and get back to you soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-6"
            >
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
                placeholder="eg. john.doe@somewhere.com"
              />

              <FormInput
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                register={register}
                error={errors.phoneNumber?.message}
                placeholder="eg. 090000000"
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  {...register('gender')}
                  className={`w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div className="mb-4 col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register('photo')}
                  className={`w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.photo ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.photo && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.photo.message}
                  </p>
                )}
              </div>

              {submitError && (
                <div className="text-red-500 text-sm mb-4">{submitError}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-max bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </Container>
      <Metrics />
    </div>
  );
}
