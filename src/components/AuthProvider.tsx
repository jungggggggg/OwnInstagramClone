import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  username: string | null;
  avatar_url: string | null;
  full_name: string | null;
  userId: string | null;
  self_introduce: string | null;
}

const AuthContext = createContext<AuthContextType>({
  session: null, 
  user: null,
  isAuthenticated: false,
  username: null,
  avatar_url: null,
  full_name: null,
  userId: null,
  self_introduce: null,
})

export default function AuthProvider({ children }: PropsWithChildren) {

    const [session, setSession] = useState<Session | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)
    const [full_name, setFullName] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [self_introduce, setSelfIntroduce] = useState<string | null>(null);

    useEffect(() => {
      const getUserProfile = async (userId: string) => {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url, full_name, self_introduce')
          .eq('id', userId)
          .single();


        if (error) {
          console.error('Error fetching user profile:', error);
          setUsername(null);
          setFullName(null);
          setAvatarUrl(null);
          setSelfIntroduce(null);
        } else {
          setUsername(data.username);
          setFullName(data.full_name);
          setAvatarUrl(data.avatar_url);
          setSelfIntroduce(data.self_introduce)
        }
      }

      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        if (session?.user?.id) {
          getUserProfile(session.user.id);
          setUserId(session.user.id);
        }
      })

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        if (session?.user?.id) {
          getUserProfile(session.user.id);
          setUserId(session.user.id);
        }
      })

      
    }, [])

  
    return (
    <AuthContext.Provider value={{ session, user: session?.user, isAuthenticated: !!session?.user, username, avatar_url, full_name, userId, self_introduce, }}>
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);