import React from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import { Box } from '@chakra-ui/react'
import UpperNav from '../miscellenious/upperNav'
import Progress from '../miscellenious/Progress'
import MyPrograms from '../miscellenious/Myprograms'

export const Dashboard = ({courses}) => {
  return (
    <Box width="100%" height={"100%"} background={"Background"}>
      <ErrorBoundary fallback={<p>Something went wrong</p>} userSelect={"none"}>
        <Box position={"fixed"} width="100%"><UpperNav/></Box>
        <Box mt={20}><Progress userBelt={"Member"}/></Box>
         <MyPrograms courses={courses} />
      </ErrorBoundary>
    </Box>
  )
}
