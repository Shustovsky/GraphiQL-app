import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface IProps {
  title: string;
  titleBtn: string;
  isSignIn: boolean;
  handlclick: (name: string, email: string, password: string) => Promise<void>;
}

function FormAuth({ title, titleBtn, isSignIn, handlclick }: IProps) {
  const {
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const { t } = useTranslation();

  const myForm = watch();
  const name = myForm.name;
  const email = myForm.email;
  const pass = myForm.password;

  const handleFormSubmit = () => {
    handlclick(name, email, pass);
    reset();
  };

  const nameError = t('name_error');
  const namePlaceholder = t('name_placeholder');
  const emailError = t('email_error');
  const emailPlaceholder = t('email_placeholder');
  const passwordError = t('password_error');
  const passwordPlaceholder = t('password_placeholder');

  return (
    <>
      <div className="flex min-h-full lex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9CFhABcBKmMNjv5jWhrDGjPvA8we-NMNRxG0u7kjy3UIwnMez0quadLg3m50VhW8smg&usqp=CAU"
            alt="GraphQL icon"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {title}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
            {!isSignIn && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  {t('name')}
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    type="text"
                    placeholder={namePlaceholder}
                    autoComplete="name"
                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register('name', {
                      required: nameError,
                      pattern: {
                        value: /^([A-Z/А-я]{1}[a-z/а-я]{1,30}\s[A-Z/А-я]{1}[a-z/а-я]{1,30})$/i,
                        message: t('name_error_message'),
                      },
                    })}
                  />
                  {errors?.name && (
                    <p className="text-rose-600 text-xs mt-1">
                      {errors?.name?.message?.toString() || 'Errors!'}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                {t('email')}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  placeholder={emailPlaceholder}
                  autoComplete="email"
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('email', {
                    required: emailError,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t('email_error_message'),
                    },
                  })}
                />
                {errors?.email && (
                  <p className="text-rose-600 text-xs mt-1">
                    {errors?.name?.message?.toString() || 'Errors!'}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t('password')}
                </label>
                {isSignIn && (
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {t('password_forgot')}
                    </a>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  placeholder={passwordPlaceholder}
                  autoComplete="current-password"
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('password', {
                    required: passwordError,
                    pattern: !isSignIn
                      ? {
                          value:
                            /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                          message: t('password_error_message'),
                        }
                      : undefined,
                  })}
                />
                {errors?.password && (
                  <p className="text-rose-600 text-xs mt-1">
                    {errors?.name?.message?.toString() || 'Errors!'}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {titleBtn}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormAuth;
