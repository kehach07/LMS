import React, { createContext, useContext } from "react";
import { UserRole } from "@/types/lms";
import { useAuth } from "@/contexts/AuthContext";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUserId: string;
}

const RoleContext = createContext<RoleContextType>({
  role: "student",
  setRole: () => {},
  currentUserId: "stu-1",
});

export const useRole = () => useContext(RoleContext);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const role: UserRole = user?.role || "student";
  const currentUserId = user?.id || "stu-1";

  return (
    <RoleContext.Provider value={{ role, setRole: () => {}, currentUserId }}>
      {children}
    </RoleContext.Provider>
  );
};
