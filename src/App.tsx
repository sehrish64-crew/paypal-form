import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import * as htmlToImage from "html-to-image";

interface FormData {
  fromEmail: string;
  caseId: string;
  transactionAmount: string;
  disputedAmount: string;
  transactionDate: string;
  buyerName: string;
  transactionId: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    fromEmail: "",
    caseId: "",
    transactionAmount: "",
    disputedAmount: "",
    transactionDate: "",
    buyerName: "",
    transactionId: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fromEmail: "",
      caseId: "",
      transactionAmount: "",
      disputedAmount: "",
      transactionDate: "",
      buyerName: "",
      transactionId: "",
    });
  };

  const handleDownload = () => {
    if (resultRef.current === null) return;

    htmlToImage
      .toPng(resultRef.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "paypal-case-details.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Error generating image:", error);
      });
  };

  if (isSubmitted) {
    return (
      
      <div className="min-h-screen bg-[#101014] flex items-center justify-center p-6">
        <div
          ref={resultRef}
          className="p-6 relative shadow-lg bg-[#0B0B0F] w-full max-w-md overflow-hidden border-l-[14px] border-l-white rounded-lg"
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 bg-black flex items-start justify-between p-5 pb-3 rounded-t-lg border-b border-gray-800">
            <button
              onClick={handleReset}
              className="text-white hover:text-gray-400 transition"
            >
              <X size={24} />
            </button>
            <div className="flex-1 ml-4">
              <div className="text-gray-400 text-sm">From</div>
              <div className="text-white text-base font-medium">
                {formData.fromEmail}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mt-[90px] p-6 space-y-5 bg-black rounded-lg">
            {[
              ["Case ID", formData.caseId],
              ["Transaction amount", formData.transactionAmount],
              ["Disputed amount", formData.disputedAmount],
              ["Transaction date", formData.transactionDate],
              ["Buyer name", formData.buyerName],
              ["Transaction ID", formData.transactionId],
            ].map(([label, value], idx) => (
              <div key={idx}>
                <div className="text-gray-300 text-sm mb-1">{label}</div>
                <div className="text-white text-base font-medium">
                  {value || "--"}
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="p-6">
            <button className="w-full bg-white text-black text-base font-semibold py-3 rounded-full shadow hover:bg-gray-200 transition">
              View the case and respond
            </button>
          </div>

          {/* Bottom text */}
          <div className="px-6 pb-8">
            <div className="text-white text-base font-medium mb-3">
              What should you do?
            </div>
            <div className="text-gray-300 text-sm leading-relaxed">
              Log in to your PayPal account and go to the Resolution Center to
              provide any information you might have by August 22, 2025 to help us.
            </div>
          </div>

          {/* Download Button (floating bottom-right) */}
          <div className="absolute bottom-4 right-4">
            <button
              onClick={handleDownload}
              className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 22H16C18.8 22 20.2 22 21.1 21.1C22 20.2 22 18.8 22 16V15C22 12.2 22 10.8 21.1 9.9C20.3 9.1 19.2 9 17 9M7 9C4.8 9 3.6 9.1 2.9 9.9C2 10.8 2 12.2 2 15V16C2 18.8 2 20.2 2.9 21.1C3.2 21.4 3.5 21.6 4 21.7"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 2V15M12 15L9 11.5M12 15L15 11.5"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // FORM UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          PayPal Case Details Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            ["fromEmail", "From Email", "email", "finance@paypal.com"],
            ["caseId", "Case ID", "text", "PP-R-TFB-588654155"],
            ["transactionAmount", "Transaction Amount", "text", "$40.00 USD"],
            ["disputedAmount", "Disputed Amount", "text", "$40.00 USD"],
            ["transactionDate", "Transaction Date", "text", "August 12, 2025"],
            ["buyerName", "Buyer Name", "text", "John Doe"],
            ["transactionId", "Transaction ID", "text", "94069349RH4775452"],
          ].map(([name, label, type, placeholder]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={(formData as any)[name]}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={placeholder}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-6"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
