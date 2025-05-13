import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';


interface IProps {
  allowAnonymous: boolean;
  redirectPath: string;
  children: React.ReactNode;
}

function RequireAuth({ allowAnonymous, redirectPath, children }: IProps) {
  const { token } = useSelector((state: any) => state.authSlice);
  const navigate = useNavigate();

  const isAuthenticated = token !== null &&
    token !== undefined &&
    token !== '';


  useEffect(() => {
    if (!allowAnonymous !== isAuthenticated) {
      // User is not authenticated but anonymous access is allowed
      // Allow access to the route
      navigate(redirectPath);
    }
  }, [isAuthenticated, allowAnonymous, navigate, redirectPath]);

  return <>{children}</>;
}


export default RequireAuth;
