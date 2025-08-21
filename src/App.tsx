import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import * as htmlToImage from 'html-to-image'; // import html-to-image

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
    fromEmail: '',
    caseId: '',
    transactionAmount: '',
    disputedAmount: '',
    transactionDate: '',
    buyerName: '',
    transactionId: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Ref to the div containing submitted data
  const resultRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fromEmail: '',
      caseId: '',
      transactionAmount: '',
      disputedAmount: '',
      transactionDate: '',
      buyerName: '',
      transactionId: ''
    });
  };

  // Function to download the div as image
  const handleDownload = () => {
    if (resultRef.current === null) {
      return;
    }
    htmlToImage.toPng(resultRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'paypal-case-details.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Oops, something went wrong!', error);
      });
  };

  if (isSubmitted) {
    return (
      <div className="m-10 mr-[650px] ml-[650px]">
        <div className="min-h-screen bg-[#101014] flex flex-col items-center justify-center p-4 rounded-lg">
          <div
            ref={resultRef}
            className="relative shadow-[0px_1px_2px_rgba(0,0,0,0.4),0px_4px_8px_rgba(0,0,0,0.6)] p-6 bg-[#0B0B0F] w-full max-w-md overflow-hidden mb-6 border-l-[18px] border-l-white"
            style={{ fontFamily: "PayPal Sans, Helvetica Neue, Arial, sans-serif" }}

          >
            {/* Header */}
            <div
              className="fixed top-[45px] left-1/2 transform -translate-x-1/2 w-[448px] bg-black flex items-start justify-between p-6 pb-4 z-50 rounded-t-lg"
            >
              <button
                onClick={handleReset}
                className="text-white text-2xl font-light mt-1"
              >
                <X size={24} />
              </button>
              <div className="flex-1 ml-4">
                <div className="text-white text-lg font-medium">From</div>
                <div className="text-white text-lg font-medium">
                  {formData.fromEmail}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mt-[120px]">
              <div className="p-6 space-y-6 bg-[#000] rounded-lg">
                {/* Case ID */}
                <div>
                  <div className="text-white text-lg font-medium mb-1">Case ID</div>
                  <div className="text-white text-lg font-medium">
                    {formData.caseId}
                  </div>
                </div>

                {/* Transaction amount */}
                <div>
                  <div className="text-white text-lg font-medium mb-1">
                    Transaction amount
                  </div>
                  <div className="text-white text-lg font-medium">
                    {formData.transactionAmount}
                  </div>
                </div>

                {/* Disputed amount */}
                <div>
                  <div className="text-white text-lg font-medium mb-1">
                    Disputed amount
                  </div>
                  <div className="text-white text-lg font-medium">
                    {formData.disputedAmount}
                  </div>
                </div>

                {/* Transaction date */}
                <div>
                  <div className="text-white text-lg font-medium mb-1">
                    Transaction date
                  </div>
                  <div className="text-white text-lg font-medium">
                    {formData.transactionDate}
                  </div>
                </div>

                {/* Buyer name */}
                <div>
                  <div className="text-white text-lg font-medium mb-1">
                    Buyer name
                  </div>
                  <div className="text-white text-lg font-medium">
                    {formData.buyerName}
                  </div>
                </div>

                {/* Transaction ID */}
                <div>
                  <div className="text-white text-lg font-medium mb-1">
                    Transaction ID
                  </div>
                  <div className="text-white text-lg font-medium">
                    {formData.transactionId}
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="p-6 mt-8">
              <button className="w-full bg-white text-black text-lg font-bold py-4 rounded-full">
                View the case and respond
              </button>
            </div>

            {/* Bottom text */}
            <div className="px-6 pb-6">
              <div className="text-white text-lg font-medium mb-4">
                What should you do?
              </div>
              <div className="text-white text-base leading-relaxed">
                Log in to your PayPal account and go to the Resolution Center to
                provide any information you might have by August 22, 2025 to help us
              </div>
            </div>

            {/* Download Button */}
            <button className="flex justify-end w-full" onClick={handleDownload}>
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5"
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

  return (
    // (form UI remains the same as before)
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">PayPal Case Details Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... all inputs same as before ... */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Email
            </label>
            <input
              type="email"
              name="fromEmail"
              value={formData.fromEmail}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="finance@disigni.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Case ID
            </label>
            <input
              type="text"
              name="caseId"
              value={formData.caseId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="PP-R-TFB-588654155"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Amount
            </label>
            <input
              type="text"
              name="transactionAmount"
              value={formData.transactionAmount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="$40.00 USD"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disputed Amount
            </label>
            <input
              type="text"
              name="disputedAmount"
              value={formData.disputedAmount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="$40.00 USD"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Date
            </label>
            <input
              type="text"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="August 12, 2025"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buyer Name
            </label>
            <input
              type="text"
              name="buyerName"
              value={formData.buyerName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nileshkumar Khupase"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction ID
            </label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="94069349RH4775452"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium text-lg mt-6"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
