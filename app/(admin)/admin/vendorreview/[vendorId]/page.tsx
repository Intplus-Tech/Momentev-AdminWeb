"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface VendorReviewPageProps {
  params: {
    vendorId: string;
  };
}

export default function VendorReviewPage({ params }: VendorReviewPageProps) {
  const router = useRouter();
  const { vendorId } = params;

  const [notes, setNotes] = useState("");

  /* ===== ACTION HANDLERS (READY FOR API) ===== */

  const approveVendor = async () => {
    console.log("Approved:", vendorId, notes);
  };

  const requestMoreInfo = async () => {
    console.log("Requested more info:", vendorId, notes);
  };

  const rejectVendor = async () => {
    console.log("Rejected:", vendorId, notes);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 py-6 sm:px-6 lg:px-10">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← BACK
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold">
            VENDOR APPLICATION REVIEW
          </h1>
          <p className="text-sm text-gray-400">#{vendorId}</p>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl p-6 lg:p-10 space-y-10">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-8">
          {/* LEFT THUMBNAILS */}
          <div className="space-y-4">
            <div className="border  p-2">
              <Image
                src="/image-one.png"
                alt="Vendor Logo"
                width={120}
                height={120}
                className="mx-auto"
              />
            </div>

            <div className="space-y-3">
              {["doc1", "doc2"].map((doc) => (
                <div key={doc} className="border p-2 flex justify-center">
                  <Image
                    src="/image-two.png"
                    alt="Document"
                    width={100}
                    height={120}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {["doc3"].map((doc) => (
                <div key={doc} className="border p-2 flex justify-center">
                  <div className="relative h-[120px] w-[250px]">
                    <Image
                      src="/image-four.png"
                      alt="Document"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 120px, 250px"
                      priority
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT INFO */}
          <div className="space-y-6">
            <div className="space-y-1 text-[20px] text-[#191919]">
              <p className="text-[#191919] text-[18px]">
                <strong>Applicant:</strong> Michael Chen • Elegant Weddings
                Photography
              </p>
              <p className="text-[#191919] text-[18px]">
                <strong>Applied:</strong> Oct 25, 2024 • 14:30 GMT
              </p>
              <p className="text-[#191919] text-[18px]">
                <strong>Category:</strong> Photography • Wedding Photography
              </p>
            </div>

            <hr />

            {/* APPLICATION DETAILS */}
            <div>
              <h2 className="font-semibold text-[40px] mb-3">
                Application Details
              </h2>
              <ul className="space-y-2 text-[20px] list-disc pl-5 text-gray-700">
                <li>
                  <strong>Business: </strong>3 years experience • Sole
                  proprietor
                </li>
                <li>
                  <strong>Registration Type: </strong>Public liability
                </li>
                <li>
                  <strong>Portfolio: </strong>15 images uploaded • Strong
                  wedding focus
                </li>
                <li>
                  <strong>Location: </strong>London
                </li>
                <li>
                  <strong>Service area: </strong>50-mile radius
                </li>
                <li>
                  <strong>Pricing: </strong>£150/hour • Minimum 4 hours
                </li>
              </ul>
            </div>

            {/* FILES */}
            <div>
              <div className="flex flex-wrap gap-8 text-[12px] items-center">
                <span className=" flex items-center border justify-center py-2  text-blue-600 w-[94px] h-[40px]">
                  Logo
                </span>
                <span className="text-gray-400">Registration_Cert.pdf</span>
                <span className="text-gray-400">Business_License.pdf</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs text-gray-400">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i}>image_142352.jpeg</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWER NOTES */}
        <div className="space-y-6">
          <h2 className="font-semibold text-lg">Reviewer Notes</h2>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              Previous Reviewer Notes
            </p>
            <div className="border rounded-lg p-4 text-sm text-gray-600 bg-gray-50">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">New Notes</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full min-h-[120px] border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter notes here..."
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
          <button
            onClick={approveVendor}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Approve & Activate
          </button>

          <button
            onClick={requestMoreInfo}
            className="px-6 py-3 rounded-lg border border-blue-500 text-blue-600 text-sm hover:bg-blue-50"
          >
            Request More Info
          </button>

          <button
            onClick={rejectVendor}
            className="px-6 py-3 rounded-lg border border-red-500 text-red-500 text-sm hover:bg-red-50"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
