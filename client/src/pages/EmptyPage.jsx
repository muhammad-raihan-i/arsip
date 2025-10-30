import { useNavigate } from "react-router";
import { useEffect } from "react";
export default function emptyPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, []);
}
