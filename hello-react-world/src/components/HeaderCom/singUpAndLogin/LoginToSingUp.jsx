import { useState } from "react";
import SignUp from "./singUp";
import Login from "./Login";

//קומפוננטה זו מציגה את דף ההתחברות וההרשמה
// היא מאפשרת למשתמש לעבור בין שני הטפסים
export default function LoginSingUp() {
  const [showSignUp, setShowSignUp] = useState(true);

  const switchToLogin = () => setShowSignUp(false);
  const switchToSignUp = () => setShowSignUp(true);

  return (
    <>
      {showSignUp ? (
        <SignUp SwitchToLogin={switchToLogin} />
      ) : (
        <Login SwitchToSignUp={switchToSignUp} />
      )}
    </>
  );
}
