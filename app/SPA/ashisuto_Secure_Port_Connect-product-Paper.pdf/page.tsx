import React from 'react';
import Link from 'next/link';


export default function DownloadPdfPage() {
  return (
    <div className="min-h-150 flex items-center justify-center bg-gray-100">
      <div className="p-8 rounded shadow bg-white text-center">
        <h1 className="text-2xl font-semibold mb-4"> File Name: ashisuto_Secure_Port_Connect-product-Paper.pdf</h1>
        <Link
          href="/documents/ashisuto_Secure_Port_Connect-product-Paper.pdf"
          download
          className="inline-block px-6 py-3 bg-orange-500 text-white rounded hover:bg-slate-700 transition"
        >
          Download
        </Link>
      </div>
    </div>
  );
}