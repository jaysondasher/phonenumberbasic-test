'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is reverse phone lookup?",
    answer: "Reverse phone lookup is a service that allows you to search for information about a phone number's owner. By entering a phone number, you can find details such as the owner's name, location, and associated business information."
  },
  {
    question: "How accurate is your phone number data?",
    answer: "Our database is continuously updated from multiple reliable sources to ensure high accuracy. While we strive for 100% accuracy, information may occasionally be outdated or incomplete due to changes in ownership or recent number assignments."
  },
  {
    question: "Is my search history private?",
    answer: "Yes, absolutely. We take privacy seriously and do not store or share your search history. All searches are conducted securely and remain completely confidential."
  },
  {
    question: "Can I search for international phone numbers?",
    answer: "Currently, our service focuses on US phone numbers. We're working on expanding our database to include international numbers in the future."
  },
  {
    question: "What information is included in search results?",
    answer: "Search results typically include the owner's name, location (city and state), business affiliation if applicable, and whether the number is a landline or mobile. Registered users may access additional details."
  },
  {
    question: "How do I report incorrect information?",
    answer: "If you find incorrect information in our database, please contact our support team with the details. We review all reports and update our records accordingly."
  },
  {
    question: "Is there a limit to how many searches I can perform?",
    answer: "Free users can perform unlimited basic searches. However, accessing detailed information may require registration or have daily limits to prevent abuse of our service."
  },
  {
    question: "Can I remove my phone number from your database?",
    answer: "Yes, you can request removal of your personal information from our database. Please contact our privacy team with proof of ownership of the phone number."
  },
  {
    question: "How often is your database updated?",
    answer: "Our database is updated regularly, with new information added daily. Major updates occur monthly to ensure data accuracy and completeness."
  },
  {
    question: "Do you offer an API for developers?",
    answer: "We're currently developing an API service for developers and businesses. Please check back soon or contact us to be notified when it becomes available."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <span className="text-2xl text-purple-600">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-purple-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Still have questions?</h2>
          <p className="text-gray-700">
            If you couldn&apos;t find the answer you&apos;re looking for, please don&apos;t hesitate to contact our support team. 
            We&apos;re here to help!
          </p>
        </div>
      </div>
    </div>
  );
}