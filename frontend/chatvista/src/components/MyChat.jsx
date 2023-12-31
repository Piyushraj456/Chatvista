import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import "../App.css"
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";

const MyChat = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chats", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  
  }, [fetchAgain]);

  return (
    <Box
    display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
    flexDir="column"
    alignItems="center"
    p={3}
   
    w={{ base: "100%", md: "31%" }}
    borderRadius="lg"
    borderWidth="1px"
  className="chat-container"
    
  >
    <Box
      pb={3}
      px={3}
      fontSize={{ base: "28px", md: "30px" }}
      fontFamily="Work sans"
      display="flex"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontFamily={"poppins"} fontWeight={"600"} color={"indigo"}>My Chats</Text>
      <GroupChatModal>
        <Button
          d="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
          className="new-group-chat"
          style={{border:"0.3px solid grey"}}
        >
          New Group Chat
        </Button>
      </GroupChatModal>
     
    </Box>
    <Box
      display="flex"
      flexDir="column"
      p={3}
      bg="#DDF2FD"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden"
      className="chat-box"
    >
      {chats ? (
        <Stack overflowY="scroll">
          {chats.map((chat) => (
            <Box
              onClick={() => setSelectedChat(chat)}
              cursor="pointer"
              bg={selectedChat === chat ? "#D0A2F7" : "#D0BFFF"}
              color={selectedChat === chat ? "white" : "black"}
              className="chats-list"
              px={3}
              py={2}
              borderRadius="lg"
              key={chat._id}
            >
              <Text style={{fontFamily:"poppins", fontSize:"18px"}}>
                <Avatar size={"sm"} cursor={"pointer"}  src={chat.users.pic} />
               
                {!chat.isGroupChat
                  ? getSender(loggedUser, chat.users)
                  : chat.chatName}
              </Text>
              {chat.latestMessage && (
                <Text fontSize="xs" fontFamily={"poppins"} color={"purple"}>
                  <b>{chat.latestMessage.sender.name} : </b>
                  {chat.latestMessage.content.length > 50
                    ? chat.latestMessage.content.substring(0, 51) + "..."
                    : chat.latestMessage.content}
                </Text>
              )}
            </Box>
          ))}
        </Stack>
      ) : (
        <ChatLoading />
      )}
    </Box>
  </Box>
  )
};

export default MyChat;
