import React, { useState } from 'react';
import {IoIosArrowDropupCircle} from 'react-icons/io'

const faqData = [
  {
    question: "What is this platform for?",
    answer: "This platform is an online classroom where you can access courses, lectures, quizzes, and other educational content.",
  },
  {
    question: "How do I enroll in a course?",
    answer: "To enroll in a course, you can browse the available courses, select the one you're interested in, and click the 'Enroll' button. If the course is free, you'll be enrolled immediately. If it's a paid course, you'll be prompted to complete the payment process.",
  },
  {
    question: "How can I access my enrolled courses?",
    answer: "Once you've enrolled in a course, you can access it by going to your 'My Courses' page. There, you'll find a list of all the courses you're enrolled in.",
  },
  {
    question: "How do I reset my password?",
    answer: "If you've forgotten your password, you can click on the 'Forgot Password' link on the login page. You'll receive an email with instructions on how to reset your password.",
  },
  {
    question: "Can I ask questions to the instructors?",
    answer: "Yes, you can ask questions or seek clarification from the instructors through the course's discussion forum or by sending them a message through the platform.",
  },
  {
    question: "What types of courses are available?",
    answer: "We offer a wide range of courses, including programming, design, business, and more. You can explore our course catalog to find courses that match your interests and goals.",
  },
  {
    question: "How do I complete a course?",
    answer: "To complete a course, you need to go through all the course materials, lectures, and assignments. Once you've completed all the requirements, you'll receive a certificate of completion.",
  },
  {
    question: "How do I report a technical issue or bug?",
    answer: "If you encounter technical issues or bugs on the platform, you can reach out to our support team through the 'Contact Us' page. Please provide as much detail as possible about the issue you're facing.",
  },
];


const FaqPage = () => {
  const [expandedQuestions, setExpandedQuestions] = useState([]);

  const toggleQuestion = (index) => {
    if (expandedQuestions.includes(index)) {
      setExpandedQuestions(expandedQuestions.filter((i) => i !== index));
    } else {
      setExpandedQuestions([...expandedQuestions, index]);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white w-2/3 p-10 rounded-lg shadow-lg mb-5 mt-3 ">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h1>
        <ul>
          {faqData.map((faq, index) => (
            <li key={index} className="mb-4 shadow-md p-2">
              <div className="flex justify-between items-center ">
                <h2 className="text-lg font-semibold">{faq.question}</h2>
                <div className="" onClick={() => toggleQuestion(index)}>
                  {(expandedQuestions.includes(index)) ? (<IoIosArrowDropupCircle size={24}/> ): (<IoIosArrowDropupCircle size={24} className='transform rotate-180'/>) }
                </div>
              </div>
              {expandedQuestions.includes(index) && (
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FaqPage;
