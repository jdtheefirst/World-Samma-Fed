import React from 'react';
import { Grid, GridItem, Box, Text, Link } from '@chakra-ui/react';

const FooterAchieves = () => {
  const data = [
    {
      title: "National Coach Role:",
      items: [
        {
          subtitle: "Qualification Requirements:",
          description: "To become a national coach, one must first be a provincial coach or lead a registered club in a country without provinces. They must also manage national funds and organize tournaments, seminars, and events.",
        },
        {
          subtitle: "Interim Appointment:",
          description: "The interim role lasts for a maximum of one year, during which the coach is responsible for managing national-level activities and ensuring smooth operations.",
        }
      ]
    },
    {
      title: "Provincial Coach Role:",
      items: [
        {
          subtitle: "Qualification Criteria:",
          description: "A provincial coach must be approved by 20 other coaches and lead a registered club at the provincial level. Responsibilities include organizing local tournaments, seminars, and club activities.",
        },
        {
          subtitle: "Local Leadership:",
          description: "Provincial coaches play a crucial role in fostering martial arts development within their respective provinces, ensuring adherence to national guidelines and standards.",
        }
      ]
    },
    {
      title: "Club Creation and Student Training Role:",
      items: [
        {
          subtitle: "Club Establishment:",
          description: "Coaches can create clubs upon completing the Orange belt. A club can be registered (badged) once it has 20 students.",
        },
        {
          subtitle: "Student Registration and Training:",
          description: "Coaches can register students and earn income per registered student. They can train students up to the belt levels they have achieved, with the requirement that they must have achieved a Black 3 belt to grade students.",
        }
      ]
    }
  ];  
  return (
    <Grid 
      templateColumns={{ base: '1fr', md: 'repeat(6, 1fr)' }} 
      gap={2} 
      m={2} 
      mt={0}
      userSelect="none"
    >
      {data.map((section, index) => (
        <GridItem 
          key={index} 
          colSpan={{ base: 6, md: 2 }} 
          h='auto' 
          bg='tomato' 
          p={4} 
          borderRadius={4}
        >
          <Box fontSize="small">
            <Text fontSize="xl" fontWeight="bold" mb={2}>{section.title}</Text>
            {section.items.map((item, idx) => (
              <Text mb={3} key={idx}>
                <strong style={{ padding: 2 }}>{item.subtitle}</strong>
                {item.description} 
                {item.link && (
                  <Link p={1} color="blue.500" href={item.link} target="_blank" rel="noopener noreferrer">
                    here
                  </Link>
                )}
              </Text>
            ))}
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default FooterAchieves;