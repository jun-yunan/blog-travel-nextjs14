import { FunctionComponent } from 'react';
import FormAuth from '../_components/form-auth';

interface SignInPageProps {}

const SignInPage: FunctionComponent<SignInPageProps> = () => {
  return (
    <>
      <FormAuth variant="sign-in" />
    </>
  );
};

export default SignInPage;
