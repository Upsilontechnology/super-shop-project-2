import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useEmployee = () => {
  const axios = useAxiosPrivate();
  const { user, loading: authLoading } = useAuth();
  const [isEmployee, setIsEmployee] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: null });

  useEffect(() => {
    if (!user?.email || authLoading) return;

    const fetchEmployeeStatus = async () => {
      setStatus({ loading: true, error: null });

      try {
        const { data } = await axios.get(`/users/employee/${user.email}`);
        setIsEmployee(data.isEmployee);
      } catch (error) {
        const errorMessage = error.response?.data || "Network error";
        console.error("Error fetching employee status:", errorMessage);
        setStatus({ loading: false, error: errorMessage });
      } finally {
        setStatus((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchEmployeeStatus();
  }, [axios, user?.email, authLoading]);

  return [isEmployee, status.loading, status.error];
};

export default useEmployee;
