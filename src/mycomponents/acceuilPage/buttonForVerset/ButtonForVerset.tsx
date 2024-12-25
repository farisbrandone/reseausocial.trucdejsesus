import { useEffect } from "react";

const ButtonForVerset = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");
    script.src = "https://example.com/your-script.js"; // Replace with your script URL
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="script-target">This div will be associated with the script.</div>
    </div>
  );
};

export default ButtonForVerset;
