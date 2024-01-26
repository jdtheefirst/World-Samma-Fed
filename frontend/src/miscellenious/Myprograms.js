import { Box, Flex, Text, Button, Link } from '@chakra-ui/react';

const MyPrograms = ({courses}) => {

  return (
    <Box display={"flex"} flexDir={"column"} alignItems="center" justifyContent="space-between" width="100%" p={4} backgroundColor={"background"}>
      <Text fontSize="20px" fontWeight="medium">
        My Programs
      </Text>
      {courses.map((course) => (
        <Flex key={course.id} display={"flex"} alignItems="center" justifyContent="space-between" m={4} p={{ base: '1', md: '4' }} width={{ base: '90%', md: '70%' }} border={"1px"} borderRadius={5}>
            <Box><Text fontSize={"larger"} fontWeight={"medium"} m={5}>{course.title}</Text>
          <Link href={`/courses/${course.id}`} style={{ textDecoration: 'none', color: 'inherit' }} p={0} m={0}> 
            Continue
          </Link></Box>
            
          <Button>Enroll</Button>
        </Flex>
      ))}
    </Box>
  );
};


export default MyPrograms;
