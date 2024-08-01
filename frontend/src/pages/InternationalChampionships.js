import { useToast } from '@chakra-ui/toast';
import React from 'react';
import UpperNav from '../miscellenious/upperNav';

const InternationalChampionshipsPage = ({user}) => {
    const toast = useToast();
    const showToast = () => {
        toast({
          title: "Request Sent",
          description: "Thank you for showing your interest.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      };
  return (
    <>
    <UpperNav/>
    <div style={styles?.container} >
      <main style={styles?.main}>
        <section style={styles?.eventInfo}>
          <h2 style={styles?.eventTitle}>Proposed International Championships</h2>
          <p style={styles?.description}>Get ready for an exciting showcase of martial arts excellence as athletes from around the globe compete in the World Samma Federation's International Championships. Experience the thrill of top-level competition, skill, and sportsmanship.</p>
          <p style={styles?.details}><strong>Date:</strong> September 15-17, 2024</p>
          <p style={styles?.details}><strong>Location:</strong> Dubai Sports City Stadium, Dubai, UAE</p>
          <p style={styles?.details}><strong>Registration Deadline:</strong> August 31, 2024</p>
          <a onClick={() => {showToast();}} href="#" style={styles?.button}>Register Now</a>
        </section>
        
        <section style={styles?.futureVision}>
          <h2 style={styles?.futureTitle}>The Future of International Championships</h2>
          <p style={styles?.description}>Join us in shaping the future of martial arts competitions. Our vision for the International Championships includes state-of-the-art venues, advanced training facilities, and a commitment to fostering global sportsmanship and cultural exchange.</p>
        </section>
      </main>
      
      <footer style={styles?.footer}>
        <p>&copy; {new Date().getFullYear()} World Samma Federation. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    color: '#333',
    marginTop: 20,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    minHeight: '100vh',
    userSelect: 'none',
  },
  header: {
    backgroundColor: '#003366',
    color: '#fff',
    textAlign: 'center',
    padding: '20px 0',
  },
  main: {
    flex: 1,
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    width: "100%",
  },
  eventInfo: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    textAlign: 'center'
  },
  eventTitle: {
    fontSize: '2.5rem',
    margin: '0 0 20px',
    color: '#e74c3c'
  },
  description: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    margin: '10px 0'
  },
  details: {
    fontSize: '1.1rem',
    margin: '10px 0'
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#e74c3c',
    color: '#fff',
    textDecoration: 'none',
    padding: '15px 30px',
    borderRadius: '5px',
    marginTop: '20px',
    fontSize: '1.2rem',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#c0392b'
  },
  futureVision: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  futureTitle: {
    fontSize: '2.5rem',
    margin: '0 0 20px',
    color: '#3498db'
  },
  footer: {
    backgroundColor: '#003366',
    color: '#fff',
    textAlign: 'center',
    position: 'relative',
    width: '100%',
    margin: 0,
    padding: 4,
  }
};

export default InternationalChampionshipsPage;
