import React from 'react';
import { Container } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <Container className='my-10 shadow-lg p-4'>
      <h2 className='mb-4'>About Blackboard</h2>
      <p>
        Welcome to Blackboard, your all-in-one classroom management system designed to streamline the educational process and enhance the teaching and learning experience.
      </p>
      <p>
        <strong>Our Mission:</strong>
      </p>
      <p>
        At Blackboard, we are committed to revolutionizing education. Our mission is to make learning accessible, engaging, and efficient for both students and teachers. We provide a comprehensive set of tools and features to facilitate the management of classrooms, students, and teachers.
      </p>
      <p>
        <strong>Key Features:</strong>
      </p>
      <ul>
        <li>Efficient student and teacher management: Easily manage student profiles, teacher accounts, and course assignments.</li>
        <li>Course scheduling and enrollment: Seamlessly create and enroll students in courses, ensuring a smooth educational experience.</li>
        <li>Attendance tracking: Keep track of student attendance and monitor class participation.</li>
        <li>Grading and assessment tools: Simplify grading and assessment processes, allowing teachers to provide valuable feedback.</li>
        <li>Contact and support options: Connect with teachers, administrators, and fellow students through the platform and access our support resources.</li>
      </ul>
      <p>
        <strong>Who We Serve:</strong>
      </p>
      <p>
        Whether you're an administrator, teacher, or student, Blackboard is here to serve your educational needs. Our system caters to a diverse range of users, ensuring a customized experience for each role. We understand the unique challenges of education, and we're here to provide solutions.
      </p>
      <p>
        <strong>Join Us:</strong>
      </p>
      <p>
        Join our educational community and embark on a journey of learning and growth. Blackboard is more than just a platform; it's a hub of knowledge, collaboration, and innovation.
      </p>
    </Container>
  );
}

export default AboutPage;
