import { FunctionComponent } from 'react';
import FormAuth from '../_components/form-auth';

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  return (
    <>
      <FormAuth variant="sign-up" />
    </>
  );
};

export default SignUp;
