import {json, redirect} from '@shopify/remix-oxygen';
import {Form, Link, useActionData} from '@remix-run/react';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Login'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  if (await context.session.get('customerAccessToken')) {
    return redirect('/account');
  }
  return json({});
}

/**
 * @param {ActionFunctionArgs}
 */
export async function action({request, context}) {
  const {session, storefront} = context;

  if (request.method !== 'POST') {
    return json({error: 'Method not allowed'}, {status: 405});
  }

  try {
    const form = await request.formData();
    const email = String(form.has('email') ? form.get('email') : '');
    const password = String(form.has('password') ? form.get('password') : '');
    const validInputs = Boolean(email && password);

    if (!validInputs) {
      throw new Error('Please provide both an email and a password.');
    }

    const {customerAccessTokenCreate} = await storefront.mutate(
      LOGIN_MUTATION,
      {
        variables: {
          input: {email, password},
        },
      },
    );

    if (!customerAccessTokenCreate?.customerAccessToken?.accessToken) {
      throw new Error(customerAccessTokenCreate?.customerUserErrors[0].message);
    }

    const {customerAccessToken} = customerAccessTokenCreate;
    session.set('customerAccessToken', customerAccessToken);

    return redirect('/account', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return json({error: error.message}, {status: 400});
    }
    return json({error}, {status: 400});
  }
}

export default function Login() {
  /** @type {ActionReturnData} */
  const data = useActionData();
  const error = data?.error || null;

  return (
    <div className="relative grid mt-[6em] min-h-[60vh] justify-items-center bg-black px-12 w-fit mx-auto rounded-lg items-center text-white">
      <div
        style={{clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 0% 100%)'}}
        className="bg-brandRed h-[100%] w-[100%] absolute z-10 top-0 right-0"
      ></div>
      <Form method="POST" className="z-[100]">
        <h1 className="text-3xl font-[PoppinsBold] text-center mb-2">
          Sign in.
        </h1>
        <fieldset>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email address"
            aria-label="Email address"
            className="rounded-full py-2 px-4 focus:outline-none bg-[inherit] text-white placeholder:text-white hover:scale-105"
          />

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            aria-label="Password"
            className="rounded-full py-2 px-4 outline-none focus:outline-none bg-[inherit] text-white placeholder:text-white mt-4 hover:scale-105"
            minLength={8}
            required
          />
        </fieldset>
        {error ? (
          <p>
            <mark>
              <small>{error}</small>
            </mark>
          </p>
        ) : (
          <br />
        )}
        <button
          type="submit"
          className="bg-white w-full py-2 text-center text-brandRed rounded-full font-black border-[2px] hover:border-white hover:bg-black hover:scale-105 shadow-xl
          "
        >
          Sign in
        </button>
        <div className="mt-2 flex justify-between ">
          <p>
            <Link to="/account/recover" className="text-white">
              Forgot password →
            </Link>
          </p>
          <p>
            <Link to="/account/register" className="text-white">
              Register →
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/mutations/customeraccesstokencreate
const LOGIN_MUTATION = `#graphql
  mutation login($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

/**
 * @typedef {{
 *   error: string | null;
 * }} ActionResponse
 */

/** @typedef {import('@shopify/remix-oxygen').ActionFunctionArgs} ActionFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
