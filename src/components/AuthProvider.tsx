import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  username: string | null;
  avatar_url: string | null;
}

const AuthContext = createContext<AuthContextType>({
  session: null, 
  user: null,
  isAuthenticated: false,
  username: null,
  avatar_url: 'https://opwyvlqnfsnbehdilttq.supabase.co/storage/v1/object/sign/avatars/Default_Profile.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL0RlZmF1bHRfUHJvZmlsZS5qcGciLCJpYXQiOjE3MjI5NDI5ODQsImV4cCI6MTc1NDQ3ODk4NH0.y-F8bFclkNVOpRlFSBbIX0qQ_WpsEfbLBk3D-kPtq44&t=2024-08-06T11%3A16%3A22.901Z',
})

export default function AuthProvider({ children }: PropsWithChildren) {

    const [session, setSession] = useState<Session | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)

    useEffect(() => {
      const getUserProfile = async (userId: string) => {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          setUsername(null);
          setAvatarUrl('https://opwyvlqnfsnbehdilttq.supabase.co/storage/v1/object/sign/avatars/Default_Profile.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL0RlZmF1bHRfUHJvZmlsZS5qcGciLCJpYXQiOjE3MjI5NDI5ODQsImV4cCI6MTc1NDQ3ODk4NH0.y-F8bFclkNVOpRlFSBbIX0qQ_WpsEfbLBk3D-kPtq44&t=2024-08-06T11%3A16%3A22.901Z');
        } else {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url || 'https://opwyvlqnfsnbehdilttq.supabase.co/storage/v1/object/sign/avatars/Default_Profile.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL0RlZmF1bHRfUHJvZmlsZS5qcGciLCJpYXQiOjE3MjI5NDI5ODQsImV4cCI6MTc1NDQ3ODk4NH0.y-F8bFclkNVOpRlFSBbIX0qQ_WpsEfbLBk3D-kPtq44&t=2024-08-06T11%3A16%3A22.901Z');
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
    <AuthContext.Provider value={{ session, user: session?.user, isAuthenticated: !!session?.user, username, avatar_url }}>
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);