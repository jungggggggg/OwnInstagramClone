import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  username: string | null;
}

const AuthContext = createContext<AuthContextType>({
  session: null, 
  user: null,
  isAuthenticated: false,
  username: null,
})

export default function AuthProvider({ children }: PropsWithChildren) {

    const [session, setSession] = useState<Session | null>(null)
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
      const getUserProfile = async (userId: string) => {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          setUsername(null);
        } else {
          setUsername(data.username);
        }
      }

      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        if (session?.user?.id) {
          getUserProfile(session.user.id);
        }
      })

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        if (session?.user?.id) {
          getUserProfile(session.user.id);
        }
      })
    }, [])

  
    return (
    <AuthContext.Provider value={{ session, user: session?.user, isAuthenticated: !!session?.user, username }}>
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);