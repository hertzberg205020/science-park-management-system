import { useAppSelector } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';


interface IProps {
  allowAnonymous: boolean;
  redirectPath: string;
  children: React.ReactNode;
}

function RequireAuth({ allowAnonymous, redirectPath, children }: IProps) {
  const { token } = useAppSelector(state => state.authSlice);
  const navigate = useNavigate();

  const isAuthenticated = token !== null &&
    token !== undefined &&
    token !== '';


  useEffect(() => {
    if (!allowAnonymous !== isAuthenticated) {
      // User is not authenticated but anonymous access is allowed
      // Allow access to the route
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, allowAnonymous, navigate, redirectPath]);

  return <>{children}</>;
}


export default RequireAuth;
