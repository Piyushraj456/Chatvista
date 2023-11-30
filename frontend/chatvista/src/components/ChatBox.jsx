import React from 'react'
import { Box } from "@chakra-ui/layout";
import "../App.css"
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat} = ChatState();
  return (
    <Box
    display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
    alignItems="center"
    flexDir="column"
    p={3}
    bg={selectedChat ? "#B4BDFF" : "white"}
    w={{ base: "100%", md: "68%" }}
    borderRadius="lg"
    borderWidth="1px"
    className='chats-box'
    
  >
    <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
  </Box>
  )
}

export default ChatBox
