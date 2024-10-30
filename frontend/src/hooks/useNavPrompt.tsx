import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useNavPrompt = (message: string, when: boolean) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [nextLocation, setNextLocation] = useState(null);
  const [confirmNavigation, setConfirmNavigation] = useState(false);

  const handleWindowClose = (e: BeforeUnloadEvent) => {
    if (!when) return;
    e.preventDefault();
    e.returnValue = message;
    return message;
  };

  const handleBrowserNavigation = (newLocation: any) => {
    if (!when) return;
    setNextLocation(newLocation);
    if (!confirmNavigation) {
      const shouldLeave = window.confirm(message);
      if (shouldLeave) {
        setConfirmNavigation(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleWindowClose);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, [when]);

  useEffect(() => {
    if (confirmNavigation && nextLocation) {
      navigate(nextLocation?.pathname);
    }
  }, [confirmNavigation, nextLocation, navigate]);

  useEffect(() => {
    return () => {
      if (confirmNavigation) return;
      handleBrowserNavigation(location);
    };
  }, [location]);
};

export default useNavPrompt;
