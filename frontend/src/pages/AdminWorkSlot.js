import React, { useState } from "react";
import { Box, Button, Heading, Image, VStack, Video } from "@chakra-ui/react";

const AdminWorkSlot = ({ user }) => {
  const [submissions, setSubmissions] = useState([]);

  const handleApprove = (submissionId) => {
    console.log(`Approved submission with ID: ${submissionId}`);
  };

  const handleReject = (submissionId) => {
    console.log(`Rejected submission with ID: ${submissionId}`);
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Admin Work Slot</Heading>
      {submissions.map((submission) => (
        <VStack key={submission.id} mb={6} spacing={4}>
          <Heading size="md">Submission from {submission.senderName}</Heading>
          <Box>
            <video controls width="300" height="200">
              <source src={submission.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>

          <Image
            src={submission.passportUrl}
            alt="Passport"
            width="100"
            height="100"
          />

          <Button
            onClick={() => handleApprove(submission.id)}
            colorScheme="green"
          >
            Approve
          </Button>
          <Button onClick={() => handleReject(submission.id)} colorScheme="red">
            Reject
          </Button>
        </VStack>
      ))}
    </Box>
  );
};

export default AdminWorkSlot;
